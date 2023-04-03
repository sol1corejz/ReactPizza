import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [order, setOrder] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const category = categoryId ? `category=${categoryId}` : '';
  const orderQuery = order ? 'asc' : 'desc';
  const searchQuery = searchValue ? `search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://64258b189e0a30d92b350f76.mockapi.io/items?limit=4&page=${currentPage}&${category}&${searchQuery}&sortBy=${sortType.sortProperty}&order=${orderQuery}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category, sortType, orderQuery, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletons = [...new Array(4)].map((_, idx) => <PizzaBlockSkeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={setCategoryId} />
        <Sort value={sortType} setValue={setSortType} order={order} setOrder={setOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

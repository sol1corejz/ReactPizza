import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [order, setOrder] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://64258b189e0a30d92b350f76.mockapi.io/items?${
          categoryId ? `category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty}&order=${order ? 'asc' : 'desc'}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    window.scrollTo(0, 0);
  }, [categoryId, sortType, order]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={setCategoryId} />
        <Sort value={sortType} setValue={setSortType} order={order} setOrder={setOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <PizzaBlockSkeleton key={idx} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
};

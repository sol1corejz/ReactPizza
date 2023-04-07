import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import PizzaBlockSkeleton from '../components/PizzaBlock/PizzaBlockSkeleton';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

export const Home = () => {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState(false);

  const { searchValue } = React.useContext(SearchContext);

  const category = categoryId ? `category=${categoryId}` : '';
  const orderQuery = order ? 'asc' : 'desc';
  const searchQuery = searchValue ? `search=${searchValue}` : '';

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://64258b189e0a30d92b350f76.mockapi.io/items?limit=4&page=${currentPage}&${category}&${searchQuery}&sortBy=${sort.sortProperty}&order=${orderQuery}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [category, sort, orderQuery, searchQuery, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletons = [...new Array(4)].map((_, idx) => <PizzaBlockSkeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={onClickCategory} />
        <Sort order={order} setOrder={setOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  );
};

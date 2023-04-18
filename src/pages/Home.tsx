import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { PizzaBlockSkeleton, Categories, Sort, PizzaBlock, Pagination } from '../components';

import { sortList } from '../components/Sort';
import { PizzaBlockType } from '../components/PizzaBlock/PizzaBlock';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { Pizza, SearchPizzaParams, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);
  const onChangePage = React.useCallback((number: number) => {
    dispatch(setCurrentPage(number));
  }, []);
  const [order, setOrder] = useState(false);

  const category = categoryId ? `category=${categoryId}` : '';
  const orderQuery = order ? 'asc' : 'desc';
  const searchQuery = searchValue ? `search=${searchValue}` : '';

  const getPizzas = async () => {
    try {
      dispatch(
        fetchPizzas({
          currentPage,
          category,
          orderQuery,
          searchQuery,
          sortProperty: sort.sortProperty,
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((el) => el.sortProperty === params.sortProperty);

      if (sort) {
        dispatch(
          setFilters({
            searchValue,
            categoryId: categoryId,
            sort,
            currentPage,
          }),
        );
      }

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [category, sort, orderQuery, searchQuery, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId: category,
          currentPage,
        },
        { addQueryPrefix: true },
      );

      navigate(queryString);
    }
    isMounted.current = true;
  }, [category, sort.sortProperty, currentPage]);

  const pizzas = items.map((pizza: Pizza) => (
    <Link key={pizza.id} to={`pizza/${pizza.id}`}>
      {' '}
      <PizzaBlock {...pizza} />{' '}
    </Link>
  ));
  const skeletons = [...new Array(4)].map((_, idx) => <PizzaBlockSkeleton key={idx} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={onClickCategory} />
        <Sort order={order} setOrder={setOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  );
};

export default Home;

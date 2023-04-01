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

  useEffect(() => {
    axios
      .get('https://64258b189e0a30d92b350f76.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, idx) => <PizzaBlockSkeleton key={idx} />)
          : items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </>
  );
};

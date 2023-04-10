import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get(`https://64258b189e0a30d92b350f76.mockapi.io/items/${id}`);
        setPizza(res.data);
      } catch (err) {
        alert('Нет такой пиццы');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (pizza)
    return (
      <div>
        <img src={pizza.imageUrl} alt="pizza" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} ₽</h4>
      </div>
    );
};

export default FullPizza;

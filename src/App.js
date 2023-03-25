import Header from './components/Header';
import Categories from './components/Categories';
import './scss/app.scss';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            <PizzaBlock title={'Чизбургер-пицца'} price={395} />
            <PizzaBlock title={'Чизбургер-пицца'} price={419} />
            <PizzaBlock title={'Чизбургер-пицца'} price={349} />
            <PizzaBlock title={'Чизбургер-пицца'} price={449} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

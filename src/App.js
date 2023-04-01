import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import './scss/app.scss';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" default Component={Home} />
            <Route path="/cart" Component={Cart} />
            <Route path="*" Component={NotFound} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Corporate from './pages/Corporate/Corporate'
import Manager from './pages/Manager/Manager';
import Customer from './pages/Customer/Customer';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/corporate' element={<Corporate />} />
          <Route path='/manager' element={<Manager />} />
          <Route path='/customer' element={<Customer />} />
        </Routes>
    </Router>
  );
}


export default App;

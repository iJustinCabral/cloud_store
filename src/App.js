import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Corporate from './pages/Corporate/Corporate'
import Manager from './pages/Manager/Manager';
import Customer from './pages/Customer/Customer';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateItemPage from './pages/Corporate/CreateItemPage';
import ListStoresPage from './pages/Corporate/ListStoresPage'
import ItemLocationPage from './pages/Corporate/ItemLocationPage'
import CreateStorePage from './pages/Corporate/CreateStorePage'
import RemoveStorePage from './pages/Corporate/RemoveStorePage'
import CorpGTIRPage from './pages/Corporate/CorpGTIRPage'
import CorpGIRPage from './pages/Corporate/CorpGIRPage'
import ProcessShipmentPage from './pages/Manager/ProcessShipmentPage';
import ManGIRPage from './pages/Manager/ManGIRPage';
import ManGORPage from './pages/Manager/ManGORPage';
import FillShelvesPage from './pages/Manager/FillShelvesPage';
import ShowMissingItemsPage from './pages/Manager/ShowMissingItemsPage';
import CustItemsOnASPage from './pages/Customer/CustItemsOnASPage';
import CustListStoresPage from './pages/Customer/CustListStoresPage';
import FindItemsPage from './pages/Customer/FindItemsPage';



function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/corporate' element={<Corporate />} />
          <Route path='/manager' element={<Manager />} />
          <Route path='/customer' element={<Customer />} />
          <Route path='/login' element={<LoginPage />} />

          
          <Route path='/corporate/create_item' element={<CreateItemPage />} />
          <Route path='/corporate/list_stores' element={<ListStoresPage />} />
          <Route path='/corporate/assign_item_location' element={<ItemLocationPage />} />
          <Route path='/corporate/create_store' element={<CreateStorePage />} />
          <Route path='/corporate/remove_store' element={<RemoveStorePage />} />
          <Route path='/corporate/gtir' element={<CorpGTIRPage />} />
          <Route path='/corporate/gir' element={<CorpGIRPage />} />

          <Route path='/manager/Process_shipment' element={<ProcessShipmentPage />} />
          <Route path='/manager/mgir' element={<ManGIRPage />} />
          <Route path='/manager/mgor' element={<ManGORPage />} />
          <Route path='/manager/fill_shelves' element={<FillShelvesPage />} />
          <Route path='/manager/show_missing_items' element={<ShowMissingItemsPage />} />

          <Route path='/customer/items_on_shelves' element={<CustItemsOnASPage />} />
          <Route path='/customer/cust_list_stores' element={<CustListStoresPage />} />
          <Route path='/customer/find_items' element={<FindItemsPage />} />

        </Routes>
    </Router>
  );
}


export default App;

import React from 'react';
import{Route,Routes}from'react-router-dom'


import Product from './component/product';
import Summary from './component/summary';
import Create from './component/create';
import SideBar from './stylincomponent/SideBar';
import ProductListe from './liste/productListe';
import Users from './liste/listeusers';
import OrdersListe from './liste/orderslist';
import ProductFindOne from './details/product';
import OrderView from './details/order';
import View from './component/info';
import ViewOrdercustomer from './component/viewOrdercustomer';

export default function Homeadmin() {
  return (
    <div >
    
      <SideBar/>
      <Content/>
    </div>
  );
}


function Content() {
  return(
    <div className='content'>
      <Routes>
    

    
    
    <Route  index  element={<Summary/>}/>
    <Route path="user/viewCommande/:id" element={<ViewOrdercustomer/>}/>
    <Route  path='order'  element={<OrdersListe/>}/>
    <Route  path='user/profile/:id' element={<View/>} />
    <Route  path='user'  element={<Users/>}/>
    <Route  path='create/pro/findone/:id' element={<ProductFindOne/>} />
    <Route path='order/detailOrder/:id' element={<OrderView/>}></Route>
  
    <Route  path='create'  element={<Create/>}>
    <Route index element={<ProductListe/>}/>
      <Route path='product' element={<Product/>}/>
     </Route>
    <Route/>
     


      
    </Routes>
    </div>
  )
}

import React from 'react';
import Register from './componenthome/register';
import{Route,Routes}from 'react-router-dom'
import Nav from './componenthome/nav';
import Card from './componenthome/card';
import Home from './componenthome/home';
import Login from './componenthome/login';
import NotFound from './componenthome/notFound';
import VerrificationCorrecte from './componenthome/verrificationCorrecte';
export default function Homepublic() {
  return (
    <div className="App">
 
     <Nav/>
     <Routes>
       <Route path='card' element={<Card/>}/>
      <Route exact path='/'  element={<Home/>}/>
      <Route path='/regester' element={<Register/>}/>
      <Route path='login' element={<Login/>}   />
      <Route path='verification' element={<VerrificationCorrecte/>}/>
      <Route path='*' element={<NotFound/>}/>
     
     </Routes>
  
    </div>
  );
}

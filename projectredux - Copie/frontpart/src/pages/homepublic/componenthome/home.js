import React from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import  { postPro} from'../../../redux/operationbooks'
import { ToastContainer } from 'react-toastify';
import {postcard,total}from'../../../redux/features/storecard'
import { useNavigate } from 'react-router';

import { useEffect } from 'react';
import '../../../public/apphome.css'
export default function Home() {
    //  add product to card
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{cardItem,totalAmount}=useSelector((state)=>state.card)
    const handlerAddToCard=(product)=>{
     dispatch(postcard(product))
     
     setTimeout(() => {
        navigate('card') 
     }, 2000);
   
    }
    const {productData,statusPro, errorPro}=useSelector((state)=>state.product)
  

   useEffect(() => {
   
    dispatch(postPro())
  

}, [dispatch]);

  return (
    <div>
        <ToastContainer></ToastContainer>
      <div className='homeContainer'>
       {statusPro==="loading"?(<p>loading..</p>):statusPro==="fieled"?(<p>{ errorPro}</p>):
      ( <div>
          <h2 className='title'>notre produits</h2>

           <div  className='products'>
             {productData.map((item)=>(

                <div key={item._id} className="item">
                   <h3>{item.name}</h3>
                   <img src={item.image} alt={item.name}/>
                   <div className='details'>
                    <span><span className='des'>description:</span> {item.description}</span>
                    <span className='price'> {item.price}$</span>
                   </div>
                   
                   <div className='made'>
                    <p>fabriqué en</p>
                    <p className='contry'>{item.contry}</p>
                   </div>
                   <div className='date'>
                    <p> date de creation in</p>
                    <p className='creationdate'>{item.created.substring(0,10)}</p>
                   </div>
                   
                  
              
                <button onClick={()=>handlerAddToCard(item)}>add to cart</button>
                </div>
             ))
             
             
             }

           </div>
       </div>
       )

       }
      </div>
    </div>
  );
}

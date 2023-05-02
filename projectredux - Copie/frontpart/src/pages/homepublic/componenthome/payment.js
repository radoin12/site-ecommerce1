import React from 'react';
import { useSelector } from 'react-redux';
import axios from'axios'
import {toast,ToastContainer} from'react-toastify'
export default function Payment({card}) {
  console.log(card)
    const auth=useSelector((state)=>state.regestration)
   
   
    const handlerPayement=async()=>{
        try {
        
          const cardo=card.map((card)=>{
            return{
              name:card.name,
              price:card.price,
              quantity:card.quantity,
              type:card.type,
              id:card._id,
           
            }
            
          })
          const img=card.map((card)=>{
            return{
              image:card.image,
           
           
            }
            
          })
            const res= await axios.post("http://localhost:3000/create-checkout-session",{
                card:cardo,
                user:auth.id,
                img:img
             })
             if (res) {
                
                   
                  window.location.assign(res.data) 
                 
                
                
              
                
               
          
            
             }
             
        } catch (error) {
           console.log(error) 
         
        }
   
    }
   return (
    <div>
   <ToastContainer></ToastContainer>
      
      <button type='submit' onClick={()=>handlerPayement()}>check out</button>
    </div>
  );
}

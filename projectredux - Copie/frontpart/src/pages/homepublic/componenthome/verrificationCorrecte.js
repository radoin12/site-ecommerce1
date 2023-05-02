import React from 'react';
import{OrderView} from '../../../redux/features/auth/recievestorepayment'
import { useSelector,useDispatch } from 'react-redux';
import '../../../public/userstyle.css'
import { useEffect } from 'react';
import {clearallCard,total}from'../../../redux/features/storecard'
export default function VerrificationCorrecte() {
  const {id}=useSelector((state)=>state.regestration)
  const {view, etat}=useSelector((state)=>state.command)
 const {cardItem}=useSelector((state)=>state.card)


  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(OrderView(id))
    dispatch(clearallCard())
    dispatch(total())
  }, []);
  console.log(view)
  return (
    <div>
      <h2 className='verifytitle'>verfication payment avec succeé</h2>
      <div>
       {
            etat==="loading"?(
              <p> loading...</p>
            ):(
             <div className='allcomande'>
         
             {
            view?.length>0&&
            
                 <div className='section'>
                    <h2 className='listproduct'>liste des commandes de vos achats</h2>
                    <div className='titles'>
                      <h2>nom du client</h2>
                      <h2>date du payement commande</h2>
                      <h2>produits</h2>
                      <h2>somme totale</h2>
                    </div>
                   <div className='product'>
                  
                   <p style={{padding:'0px 20px'}}>{view&&view[view.length-1].shipping.name}</p>
                   <p>{view[view.length-1].updatedAt.substring(0,10)}</p>
                   <div className='mixte'>

                   <div className='image'>
                   {cardItem?.map((item)=>
                        <div >
                       <img src={item.image}/>
                          
                        </div>
                      
                        )}
                   </div>
                  
                    <div>{view[view.length-1].product?.map((item)=>
                    <div className='info-pro'>
                      
                      <p>{item.name}</p>
                      <p>{item.type}</p>
                     
                      <p>quantite:{item.quantity}</p>
                      <p>prix unitaire:{item.price}</p>
                      <p>prix total:{item.quantity*item.price}</p>

                    </div>
                     
                    )}</div>

                   </div>
             
                     
              
                    <p style={{paddingRight:' 60px ',fontSize:'25px'}}>{view[view.length-1].amount_subtotal/100}$</p>
                  
                   
                    

                  </div>
                  <div className='summary'>
                    {view[view.length-1].total===view[view.length-1].amount_subtotal?<p>Livraison gratuite (5-7 jours)</p>
                    :<p>livraison:15$</p>
                  
                  }
                    <p><span>total:</span> {view[view.length-1].total/100}$</p>
                  </div>
                 </div>


              

              }

             </div>
             
            )



       }

      </div>
    </div>
  );
}

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Payment from './payment';
import{removeCard, decreaseCard,postcard,clearallCard, total}from '../../../redux/features/storecard'
export default function Card() {
  const {cardItem,totalAmount}=useSelector((state)=>state.card)
  const card=useSelector((state)=>state.card)
  const auth=useSelector((state)=>state.regestration)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const removeProduct=(id)=>{
    dispatch(removeCard(id))


 
  }
  useEffect(() => {
   dispatch(total())
  }, [dispatch,cardItem]);


  const increase=(id)=>{
    dispatch(postcard(id))

  }
  const decreaseitem=(mydata)=>{
  dispatch(decreaseCard(mydata))
  }
  const clearCard=()=>{
    dispatch(clearallCard())
  }
  console.log(cardItem)
  return (
    <div className='card-item'>
      <ToastContainer></ToastContainer>
         <h2>shopping card</h2>
         <div className='span'></div>
      {
        
      cardItem.length===0?(
        <div className='notfoundCard'>

          <p>vous n'avez pas actuellement une liste de commande</p>
          <div className='start-shop'>
          <FontAwesomeIcon icon={faArrowLeft} />
            <Link to="/"> <span>commencez vos achats</span></Link>
           
          </div>
        </div>
      ):(
        <div>
          <div className='title'>
           <h3 className='product'>produit</h3>
           <h3 className='quantite'>quantite</h3>
           <h3 className='prix'>prix</h3>
           <h3 className='total'>totale</h3>
          </div>
         <div className='command-item'>
           {
            cardItem?.map((data)=>
         
            <div className='info-product' key={data._id}>
              <div  className='product-item'>
             
              <img  src={data.image} />
              <div>
              <p className=''>{data.name}</p>
              <p>{data.type}</p> 
              <button onClick={()=>removeProduct(data._id)}>remove</button>
              </div>
             
              </div>
            
                 <div className='quantity-item'> 
                 <button onClick={()=>decreaseitem(data)}>-</button>
                 <p className='count'>{data.quantity}</p>
                 <button onClick={()=>increase(data)}>+</button>
                 
                 </div>
                 <div className='prix-item'> <p>{data.price}</p></div>
                 <div className='total-item'> <p>{data.quantity*data.price}</p></div>
               
               
                
             
           
            </div>
           
            
            
            )
           }
         </div>
         <div className='summary'>
           <button className='clear-cart'>effacez la  carte <FontAwesomeIcon icon={faTrashCan} className="delete" onClick={()=>clearCard()}/></button>
           <div className='checkout'>
             <div className='sub-total'>
              <span >montant total</span>
              <span className='total'>{totalAmount}</span>
             </div>
             <p>taxe et livraison au moment du départ</p>
           { auth.id?<Payment card={cardItem}/>:<button className='verify'onClick={()=>navigate('/login')}>verfication avec login</button>
           
           
           }
             <div className='continueshop'>
             <FontAwesomeIcon icon={faArrowLeft} className='icon'/> 
             <Link to="/"> 
                 <p>Continuer vos achats</p></Link>
             
           
             </div>
           </div>
         
         </div>
        </div>
      )


      }
    </div>
  );
}

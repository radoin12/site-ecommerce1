import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faShoppingCart ,faBars,faXmark,faCaretDown} from '@fortawesome/free-solid-svg-icons'
 import decode from'jwt-decode'
  import { useSelector,useDispatch } from 'react-redux';
   import{ logout}from'../../../redux/features/auth/authSlice'
import "../../../public/style.css"
import { toast, ToastContainer } from 'react-toastify';

export default function Nav() {
  const{quantite}=useSelector((state)=>state.card)

  const {id,image,name,isAdmin}=useSelector((state)=>state.regestration)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[show,setShow]=useState(false)
 const showNav=()=>{
  setShow(!show)
  console.log('rr')
 }

  return (
    
    <div className={show?'header expanded':'header'}>
    <div className='sectionnav'>
      <ToastContainer></ToastContainer>

      {id&&
      
        
         <div>
        
        
       

        <div className='style-info'>
            <div className='name'>
           
           
           <div className='stylename'>{name}</div>
           <img src={image}/>
        
         </div>
         {isAdmin&&<div className='admin'>Admin</div>}
      </div>
   

   
         
          
        

         </div>
        
       
      }
         <div className='shopping'>
        online shopping products
      </div>
   
   {  !isAdmin&& <div className={show?'additionundeline expanded':'additionundeline'}>
        <Link to='/' className='home'>homepage</Link>
        <div className='underline'></div>
      </div>}
      {  isAdmin&& <div className={show?'additionundeline expanded':'additionundeline'}>
      <Link to="/admin"  className='home'>homePage</Link>
        <div className='underline'></div>
      </div>}
     
    
    
     </div>

     
     
      <div className={show?'shop expanded':'shop'}>
        <Link to="card"><FontAwesomeIcon icon={faShoppingCart} className='icon'/>
       
        </Link>
        <div className='number'>
            <div>{quantite}</div>
        </div>
       
      </div>
      {id&&
      
      <div className='homeuser'>
      
        
      
      <div className={show?'additionundeline expanded':'additionundeline'}>
      <Link  to='profile' >profile</Link>
        <div className='underline'></div>
      </div>
        
        
        
        <div className={show?'additionundeline expanded':'additionundeline'} onClick={()=>{
        dispatch(logout())
       
        toast.warning('vous etes decconecté!!',{
          position:'top-right'
        })
      }}>  
         
       
         <Link to='login'>logout</Link>
        <div className='underline'></div>
     
      
      </div>
        

       </div>
      
      
      
      
      }
     {!id&&
     
     
     <div className='homeuser'>
     <div className= {show?'additionundeline expanded':'additionundeline'}>
   <Link to='regester'>sign up</Link>
   <div className='underline'></div>
 </div>
 <div className= {show?'additionundeline expanded':'additionundeline'}>
   <Link to='login' >login</Link>
   <div className='underline'></div>
 </div>
   </div>
     
     }

       <div className="toggle-button" onClick={showNav}>
        
        {!show?
        <FontAwesomeIcon  icon={faBars}/>:
        <FontAwesomeIcon  icon={faXmark}/>
        }
        
        </div>
   
      
    </div>
  
  );
}








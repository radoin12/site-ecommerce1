import React, { useState,useEffect } from 'react';
import '../../../public/userstyle.css'
import {Mystyle} from'../componenthome/stylecomponents/stylecomponent'
import{loginUser} from '../../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router';
import decode from 'jwt-decode'
import { useSelector,useDispatch } from 'react-redux';
export default function Login() {
 const navigate=useNavigate()
  const {id,loginError,loginStatus,isAdmin,token}=useSelector((state)=>state.regestration)

  console.log(isAdmin)

  
  const dispatch=useDispatch()
  useEffect(() => {
    if (isAdmin&&id) {
      navigate('/admin')
    
    }
    else if(id&&!isAdmin){
      navigate('/')
    }
    else{
      return;
    }
  }, [id,dispatch,token,isAdmin])
   const[checkInfo,setCheckInfo]=useState({
    password:"",
    email:""
   });
   const data={
    password:checkInfo.password,
    email:checkInfo.email
   }
  const handlerlogin=(e)=>{
    e.preventDefault()
   dispatch(loginUser(data))

  }


 
  // handler error
  

  const [validateform,setValidateform]=useState({
    error:'',
 
  })
 useEffect(()=>{
 if (loginStatus==="field") {
   setValidateform({...validateform,error:loginError.data})
 }
 },[loginError])

  return (
    <div>
      <div className='container  login-sec '>
        <div className='row  '>

       
        <Mystyle className=''>

        <label>email</label>
         <input type='email'  value={checkInfo.email} onChange={(e)=>{
          e.preventDefault()
          setCheckInfo({...checkInfo,email:e.target.value})
         }}></input>

         <label>mot de passe</label>
         <input type='password' value={checkInfo.password} onChange={(e)=>{
          e.preventDefault()
          setCheckInfo({...checkInfo,password:e.target.value})
         }}></input>
       
        
      
      
         <button type='submit' onClick={handlerlogin} >{
         loginStatus==="loading"?"...loading":"connexion"}
         </button>
         {validateform.error!==""&&<p style={{textAlign:"center",color:"red",letterSpacing:'1.17px' }}>{validateform.error}</p>} 
        </Mystyle>
        </div>
      </div>
    </div>
  );
}

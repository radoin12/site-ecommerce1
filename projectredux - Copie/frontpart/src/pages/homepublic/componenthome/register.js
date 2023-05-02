import React from 'react';
import imgUser from'../img/imguser.png'
import { useState } from 'react';
import  convertTo64Bit from'../../../convertto64.js/convert64'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {postRegester}from'../../../redux/features/auth/authSlice'
import'../../../public/apphome.css'
export default function Register() {

 const dispatch=useDispatch()
 const navigate=useNavigate()
 const auth=useSelector((state)=>state.regestration)
 const {id,token,isAdmin}=useSelector((state)=>state.regestration)
console.log(auth.id,"id")

let    errrorhandler= auth.regesterError.split(' ')[0].substring(1,auth.regesterError.split(' ')[0].length-1) 

   



//  handler error
const[usererror,setUsererror]=useState({
    name:'',
    password:'',
    comfirmPassword:'',
    email:'',
    image:'',
    age:'',
    addresse:'',
    checkemail:''
})

useEffect(() => {

    if (auth.regesterStatus==="field") {
        
        if (errrorhandler==="name"&&auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" is not allowed to be empty") {
            setUsererror({...usererror,name:"le nom n'est pas autorisé à être vide"})  
          }
          else if(auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" length must be at least 4 characters long"){
            setUsererror({...usererror,name:"le nom doit contenir au moins 4 caractères"})  
          }
         
         
        
       
      if (errrorhandler==="password"&&auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" is not allowed to be empty") {
        setUsererror({...usererror,password:"le mot de passe  n'est pas autorisé à être vide"})  
      }
      else if(auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" should be at least 8 characters long"){
        setUsererror({...usererror,password:"doit comporter au moins 8 caractères"})  
      }
      else if(auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" should contain at least 1 upper-cased letter"){
        setUsererror({...usererror,password:" le mot de passe doit contenir au moins 1 majuscule"})  
      }
      else if (auth.regesterError.substring(auth.regesterError.split(' ')[0].length)=== " should contain at least 1 number") {
        setUsererror({...usererror,password: " le mot de passe doit contenir au moins 1 chiffre"})   
      }
      else if ( auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===  " should contain at least 1 symbol") {
        setUsererror({...usererror,password: " le mot de passe doit contenir au moins 1 symbole"})  
      }
     
     
      if (errrorhandler==="confirmPassword") {
        setUsererror({...usererror, comfirmPassword:"la confirmation du mot de passe n'est pas valide"})  
      }
     
      if (errrorhandler==="email"&&auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" is not allowed to be empty") {
        setUsererror({...usererror,email:"email  n'est pas autorisé à être vide"})  
      }
      else if (auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" length must be at least 8 characters long") {
         setUsererror({...usererror,email:"doit être d'au moins 8 caractères"})
      }
      else if (auth.regesterError.substring(auth.regesterError.split(' ')[0].length)===" must be a valid email") {
        setUsererror({...usererror,email:"il faut saisir  un email est valide"})
      }
      if(auth.regesterError===" cet email est deja utulisé"){
        setUsererror({...usererror, checkemail:auth.regesterError})  
        console.log(auth.regesterError)
      }
     
      
   
      if (errrorhandler==="image") {
        setUsererror({...usererror, image:"il faut choisir une photo "})  
      }
      if (errrorhandler==="age") {
        setUsererror({...usererror, age:"age doit etre un nombre"})  
      }
      if (errrorhandler==="addresse") {
        setUsererror({...usererror, addresse:"il faut mettre votre addresse "})  
      }
   
  
  
     
    
    }
   
    
  

   
}, [errrorhandler,auth.regesterStatus]);
   



// ****************
const[user,setUser]=useState({
    name:'',
    password:'',
    comfirmPassword:'',
    email:'',
    image:'',
    age:'',
    addresse:''
})
 const uploadFile=async(e)=>{
e.preventDefault()
  const file=e.target.files[0]
  const convetto64=await convertTo64Bit(file)
  console.log(convetto64)
  setUser({...user,image:convetto64})
 }
 const data={
    name:user.name,
    password:user.password,
    confirmPassword:user.comfirmPassword,
    email:user.email,
    image:user.image,
    age:user.age,
    addresse:user.addresse
 }
 useEffect(() => {
  if (isAdmin&&id) {
    navigate('/admin')
  
  }
  else if(id&&!isAdmin){
    navigate('/card')
  }
  else{
    return;
  }
}, [id,dispatch,token,isAdmin])
//  post user
 const handlerRegester=(e)=>{
  e.preventDefault()
  dispatch(postRegester(data))

 
 



   
 }


    


  return (
    <div>
      <div className='container'>
        <div className='row'>

       
        <form className='form-group col-md-6 p-2 card shadow mt-3 mx-4 errorform' onSubmit={handlerRegester}>
         <label className='form-label' htmlFor='filephoto' style={{margin:"50px auto"}}><img src={user.image||imgUser}style={{width:"200px",height:"200px",margin:"10px 100px"}} 
       
         /></label>
         { usererror.image!==""&&errrorhandler==="image"&&errrorhandler!==""&&<p>{usererror.image}</p>}
        < input  type="file" label='Image' name="user" className="form-control d-none" id="filephoto" accept='.jpeg,.png,.jpg'   onChange={uploadFile}/>
         <label className='form-label' >name</label>
        
         <input className='form-control' value={user.name} onChange={(e)=>{{ setUser({...user,name:e.target.value})}e.preventDefault()} }></input>
         { usererror.name!==""&&errrorhandler==="name"&&errrorhandler!==""&&<p>{usererror.name}</p>}
         <label className='form-label'>mot de passe</label>
         <input className='form-control' value={user.password} onChange={(e)=>{{ setUser({...user,password:e.target.value})}e.preventDefault()} }></input>
           { usererror.password!==""&&errrorhandler==="password"&&errrorhandler!==""&&<p>{usererror.password}</p>}
         <label className='form-label'>comfirmation de mot passe</label>
         <input className='form-control'value={user.comfirmPassword} onChange={(e)=>{{ setUser({...user,comfirmPassword:e.target.value})}e.preventDefault()} }></input>
           { usererror.comfirmPassword!==""&&errrorhandler==="confirmPassword"&&errrorhandler!==""&&<p>{usererror.comfirmPassword}</p>}
          <label className='form-label'>email</label>
         <input className='form-control' value={user.email} onChange={(e)=>{{ setUser({...user,email:e.target.value})}e.preventDefault()} }></input>
           { usererror.email!==""&&errrorhandler==="email"&&<p>{usererror.email}</p>}
           { usererror.checkemail!==""&&<p>{usererror.checkemail}</p>}
         <label className='form-label'>age</label>
         <input className='form-control' value={user.age} onChange={(e)=>{{ setUser({...user,age:e.target.value})}e.preventDefault()} }></input>
         { usererror.age!==""&&errrorhandler==="age"&&<p>{usererror.age}</p>}
         <label className='form-label'>addresse</label>
         <input className='form-control'value={user.addresse} onChange={(e)=>{{ setUser({...user,addresse:e.target.value})}e.preventDefault()} }></input>
         { usererror. addresse!==""&&errrorhandler==="addresse"&&<p>{usererror. addresse}</p>}
         <button  type='submit' className='btn btn-primary mt-3'> {
          auth.regesterStatus==="loading"?"loading":"inscription" }</button>
        </form>
        </div>
      </div>
    </div>
  );
}

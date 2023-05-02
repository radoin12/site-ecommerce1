import * as React from 'react';
import Button from '@mui/material/Button';
import {getAllInfoUsers}from'../../../redux/userslice'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import styled from'styled-components'
import { useState } from 'react';
import  convertTo64Bit from"../../../convertto64.js/convert64"
import {editUsers}from'../../../redux/userslice'
import{ToastContainer,toast}from'react-toastify'
import { useNavigate } from 'react-router';



export default function UpdateOurUsers({propsId}) {
   const { allusers, statusUpdateuser,errorfordataUpdating}=useSelector((state)=>state.user)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [current,setCurrent]=useState({})
   
     const[image,setImage]=useState('')
     const [dataUser,setDataUser]=useState({
      name:'',
   
      email:'',
      image:'',
      age:'',
      addresse:''
    
      
     })
  
     const changeimage=async(e)=>{
   
         e.preventDefault()
   
         const file=e.target.files[0]
         const r=await  convertTo64Bit(file)
         setImage(r)
     
     }


  const [open, setOpen] = React.useState(false);
  const errorfield=errorfordataUpdating?.data
  const getfield=errorfield?.split(' ')[0]
  const testfield=errorfordataUpdating?.data?getfield?.substring(1,getfield.length-1):""
  const TestEmailExist= errorfordataUpdating?.data ? errorfordataUpdating?.status :null    
 console.log(getfield)
  const handleClickOpen = () => {
    setOpen(true);
    const selectedusers= allusers?.find((item)=>item?._id===propsId)
 
     setCurrent(selectedusers)
     setImage(selectedusers?.image)
     setDataUser({...dataUser, name:selectedusers?.name,
      
     email:selectedusers?.email,
     age:selectedusers?.age,
     addresse:selectedusers?.addresse
    
     })
  
  }
      //  error handler form
      const[info,setInfo]=useState({nameError:"",

      imageError:"",
      nameError:"",
      ageError:"",
      emailError:'',
      addressError:"",
      existemail:'',

     
    
    })
       
  const errorfields=errorfordataUpdating?.data
  const getfields=errorfields?.split(' ')[0]
  const getExactefield=getfields?.substring(1,getfields.length-1)
  const test=React.useCallback(()=>{
  
   

  
    const result=errorfields?.substring(errorfields.split(' ')[0].length)
  
     if (errorfordataUpdating) {
       if (getExactefield==="name"&& result===" is not allowed to be empty") {
         setInfo({...info,nameError:"il faut saisir votre nom"})
        }
        else if (getExactefield==="name"&&   result===" length must be at least 4 characters long") {
         setInfo({...info,nameError:"le nom doit contenir 4 caractre minimum"})
        }
   

        if (getExactefield==="email"&& result===" is not allowed to be empty") {
         setInfo({...info,emailError:"il faut saisir votre email"})
        }
        else if (getExactefield==="email"&& result===" length must be at least 8 characters long") {
         setInfo({...info,emailError:"l'email  doit contenir 8 caractre minimum"})
        }
        else if (getExactefield==="email"&& result===" must be a valid email") {
         setInfo({...info,emailError:"email n'est pas valid"})
        }
        if ( result===" cet email est deja utulisé") {
         setInfo({...info,existemail:result})
        }
        if (getExactefield==="image"&& result===" is not allowed to be empty") {
         setInfo({...info,imageError:"il faut saisir votre photo"})
        }
        if (getExactefield==="age" &&result===" must be a number") {
         setInfo({...info,ageError:"if faut mettre un nombre valid"})
        }
        if (getExactefield==="addresse" &&result===" is not allowed to be empty") {
         setInfo({...info,addressError:"il faut saisir votr addresse"})
        }
     } 
     

    


},[errorfordataUpdating.data])
React.useEffect(()=>{
 test()


},[errorfordataUpdating,testfield,dispatch])



  const radoin={
   ...current,
    
    name:dataUser.name,
   
    email:dataUser.email,
    image:image,
    age:dataUser.age,
    addresse:dataUser.addresse
    
    
   }
   delete radoin["__v"]
   delete radoin.updatedAt
   




  const handleSubmit=(e)=>{
    e.preventDefault()

  
    dispatch(editUsers(radoin))
    
    .unwrap()
    .then((originalPromiseResult) => {
      setInfo({...info,nameError:"",

      imageError:"",
      nameError:"",
      ageError:"",
      emailError:'',
      addressError:"",
      existemail:''})
   

      setOpen(false)
    
      
      
      }

    )
   
   
   
    
    
 
  }

    
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        
      <Edit variant="outlined" onClick={handleClickOpen}>
        modifier
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
        <DialogTitle>modifier l'utilisateur</DialogTitle>
        <DialogContent>
          
        <StyledProduct >
     
     <StyledForm className='card shadow'>
    
      <StyledImage>
      <label className='form-label' htmlFor='filephoto'><img src={image}/></label>
      <ErrorPara>{ info.imageError!=="" &&testfield==="image"&& info?.imageError}</ErrorPara>
      < input  type="file" label='Image' name="user" className="form-control d-none" id="filephoto" accept='.jpeg,.png,.jpg'
       onChange={(e)=>
        changeimage(e)}
      />
      </StyledImage>
    
        <StyledInput>
        <label>nom</label>
         <input type="text" value={dataUser.name} onChange={(e)=>{
          e.preventDefault()
          setDataUser({...dataUser,name:e.target.value})
         }} required/>

        </StyledInput>
        <ErrorPara>{ testfield==="name" &&info?.nameError}</ErrorPara>
          
           <StyledInput>
        <label>email</label>
         <input type="email"  value={dataUser.email} onChange={(e)=>{
          e.preventDefault()
          setDataUser({...dataUser,email:e.target.value})
         }} required/>
          
        </StyledInput>
        <ErrorPara>{info.emailError!==""&& testfield==="email"&& info?.emailError}</ErrorPara>
        <ErrorPara> { info.existemail!==""&&TestEmailExist===406&& info?.existemail}</ErrorPara>
        <StyledInput>
        <label>age</label>
        <input value={dataUser.age} 
        type='number'
        onChange={(e)=>{
          e.preventDefault()
          setDataUser({...dataUser,age:e.target.value})
         }} />
   
            
        </StyledInput>
      
        <ErrorPara>{ info.ageError!==""&&testfield==="age"&& info?.ageError}</ErrorPara>
        <StyledInput>
        <label>addresse</label>
         <input type="text"  value={dataUser.addresse} onChange={(e)=>{
          e.preventDefault()
          setDataUser({...dataUser,addresse:e.target.value})
         }}/>
        </StyledInput>

      
         <ErrorPara>{ info.addressError!==""&&testfield==="addresse"&& info?.addressError}</ErrorPara>
       
        


        <StyleButton type='submit' onClick={handleSubmit} > {statusUpdateuser==="loading" ?"...loading":"modifier l'utlisateur"}</StyleButton>
        
     </StyledForm>


   </StyledProduct>
   <ToastContainer></ToastContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
const Edit=styled.button`
background-color: rgb(65, 128, 10);
box-shadow:3px 3px 5px rgb(8, 133, 45,0.2),-3px -3px 6px rgb(8, 133, 45,0.2);
width:80px;
margin:5px;
outline:none;
padding:5px 10px;
 text-align :center;
 color:white;
 border-radius:5px;

`

// style edit

const StyleButton=styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 5px;
    background-color: rgb(8, 133, 45);
    text-align: center;
    padding: 5px 10px;
   
    color: azure;
    box-shadow: 2px 2px 5px rgb(14, 40, 0.2);
    &:hover{
      background-color: rgb(22, 108, 5);
    }
`
const StyledForm=styled.form`
 border:2px solid;
 max-width:600px;
 width:100%;
 display:flex;
 flex-direction:column;
 padding:20px 30px;
  background-color:rgb(153, 82, 181,0.1);
 height:auto;

`
const StyledProduct=styled.div`

 display:flex;
 justify-content:center;

 margin-top:50px
 
`
const StyledInput=styled.div`
  margin:15px 10px;
  display:flex;
  align-items:center;
   label{
    font-size:20px;
    width:150px;
   
   };
   textarea{
    margin-left:20px;
    
    flex:1;
   }
   input{
    margin-left:20px;
    height:40px;
    flex:1;
   
   }

`

const StyledImage=styled.div`
  
    height:auto;
  
 flex:2;
 img{
  border:2px solid;
  width:250px;
  margin:10px auto
  
 }

`

const ErrorPara=styled.div`
 color:red;
 text-align:center;



`
const Modification=styled.button`
background-color:rgb(11, 126, 11,0.8);
transition:1s;
box-shadow:2px 2px 4px rgb(11, 126, 11,0.2),-3px -3px 5px rgb(11, 126, 11,0.3);
&:hover{
background-color:rgb(11, 126, 11);
}
width:100px;
margin:5px;
outline:none;
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
`

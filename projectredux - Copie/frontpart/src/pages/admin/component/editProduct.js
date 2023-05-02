import * as React from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import styled from'styled-components'
import { useState } from 'react';
import  convertTo64Bit from"../../../convertto64.js/convert64"
import {updateProducts}from'../../../redux/operationbooks'
import{ToastContainer,toast}from'react-toastify'
import { useNavigate } from 'react-router';


export default function EditPro({propsId}) {
   const { productData,statusEdit}=useSelector((state)=>state.product)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [current,setCurrent]=useState({})
   
     const[image,setImage]=useState('')
     const [dataBook,setDataBook]=useState({
        name:"",
        type:'',
        decription:'',
        price:'',
        autherName:''
      
     })
     const changeimage=async(e)=>{
   
         e.preventDefault()
   
         const file=e.target.files[0]
         const r=await  convertTo64Bit(file)
         setImage(r)
     
     }
 

  const [open, setOpen] = React.useState(false);
 

  const handleClickOpen = () => {
    setOpen(true);
    const selectedPrduct= productData.find((item)=>item?._id===propsId)
     setCurrent(selectedPrduct)
     setImage(selectedPrduct?.image)
     setDataBook({...dataBook, name:selectedPrduct?.name,
      
     type:selectedPrduct?.type,
     decription:selectedPrduct?.description,
     price:selectedPrduct?.price,
     autherName:selectedPrduct?.contry
     })
  };
  const product={
   ...current,
    image:image,
    name:dataBook.name,
    type:dataBook.type,
    description:dataBook.decription,
    price:dataBook.price,
    contry:dataBook.autherName,
    
    
   }

   
  const handleSubmit=(e)=>{
    e.preventDefault()
   console.log(product,"eeeeeeeeeeeee")
   if (product.name!==''&&product.image!==''&&product.type!=""&&product.description!=""
    &&product.price!=""&&product.contry!=""
   
   ) {
    dispatch(updateProducts(product))
    setOpen(false)
   }
   else{
    toast.error('echec validation form')
   }
    
 
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
        <DialogTitle>modifier le produit</DialogTitle>
        <DialogContent>
          
        <StyledProduct >
     
     <StyledForm className='card shadow'>
     <ToastContainer></ToastContainer>
      <StyledImage>
      <label className='form-label' htmlFor='filephoto'><img src={image}/></label>
     
      < input  type="file" label='Image' name="user" className="form-control d-none" id="filephoto" accept='.jpeg,.png,.jpg'
       onChange={(e)=>
        changeimage(e)}
      />
      </StyledImage>
      {  product.image===""&&<ErrorPara>il faut saisir l'image du produit</ErrorPara>}
        <StyledInput>
        <label>nom</label>
         <input type="text" value={dataBook.name} onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,name:e.target.value})
         }} required/>

        </StyledInput>
         {  product.name===""&&<ErrorPara>il faut saisir le nom du produit</ErrorPara>}
          
           <StyledInput>
        <label>type</label>
         <input type="text"  value={dataBook.type} onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,type:e.target.value})
         }} required/>
         
        </StyledInput>
        {  product.type===""&&<ErrorPara>il faut saisir le type du produit</ErrorPara>}
        <StyledInput>
        <label>description</label>
        <textarea value={dataBook.decription}  id="w3review" name="w3review" rows="4" cols="50"
        onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,decription:e.target.value})
         }} ></textarea>
   
            
        </StyledInput>
        {  product.description===""&&<ErrorPara>il faut saisir la definition du produit</ErrorPara>}

        <StyledInput>
        <label>prix</label>
         <input type="number"  value={dataBook.price} onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,price:e.target.value})
         }}/>
        </StyledInput>
        {  product.price===""&&<ErrorPara>il faut saisir le prix du produit</ErrorPara>}
         <StyledInput>
         <label>pays</label>
         <input type="text"  value={dataBook.autherName} onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,autherName:e.target.value})
         }} required/>
            
         </StyledInput>
         
       
        


        <StyleButton type='submit' onClick={handleSubmit} > {statusEdit==="loading" ?"...loading":"modifier produit"}</StyleButton>
        
     </StyledForm>


   </StyledProduct>
  
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
 border-radius:5px;
 border:2px solid black;
 transition:2s;
 padding:5px;
 background-color :rgb(123, 176, 176,0.2);


`
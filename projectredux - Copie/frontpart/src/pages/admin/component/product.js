import React from 'react';
import { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import  convertTo64Bit from"../../../convertto64.js/convert64"
import {postproducts}from'../../../redux/operationbooks'
import{ToastContainer,toast}from'react-toastify'
import styled from 'styled-components'
import gigo from'../img/images.png'
import { useNavigate } from 'react-router';



export default function Product() {


 



  const dispatch=useDispatch()
 const navigate=useNavigate()

  const[image,setImage]=useState('')
 const[fieldName,setFieldName]=useState('')
  const changeimage=async(e)=>{

      e.preventDefault()

      const file=e.target.files[0]
      const r=await  convertTo64Bit(file)
      setImage(r)
  
  }


     const [dataBook,setDataBook]=useState({
        name:"",
        type:'',
        decription:'',
        price:'',
        autherName:'',
        created:''
      
     })

    const[info,setInfo]=useState({nameError:"",
    TypeError:"",
    priceError:"",
    contryError:"",
    createdError:"",
    imageError:"",
    descError:""

  })
     const data={
      image:image,
      name:dataBook.name,
      type:dataBook.type,
      description:dataBook.decription,
      price:dataBook.price,
      contry:dataBook.autherName,
      created:dataBook.created,
      
     }

  
  
     
     const handlerclick=(e)=>{
      e.preventDefault()
      const t=[]

      let obj={}
        dispatch(postproducts(data))
       
        .unwrap()
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult,"error please")
          if (originalPromiseResult.message) {
           
        
          const y=originalPromiseResult.message.substring(24).split(',')
          
            const field=(y[0].split(':'))
             setFieldName(field[0])
           if (field[0]==='name') {
          setInfo({...info,nameError:field[1]})
           }
          
           if (field[0]==='type') {
            setInfo({...info,TypeError:field[1]})
             }
           
            
               if (field[0]==='description') {
                setInfo({...info,descError:field[1]})
                 }
                 if (field[0]==='price') {
                  setInfo({...info,priceError:field[1]})
                   }
                 if (field[0]==='contry') {
                  setInfo({...info,contryError:field[1]})
                   }
                 if (field[0]==='image') {
                  setInfo({...info,imageError:field[1]})
                   }
                   if (field[0]==='created') {
                    setInfo({...info,createdError:field[1]})
                     }

                
                   
                   
          y.map(ed=>{
                t.push(ed.split(":"))
               
           })
         
           t.map((e)=>{
               const [key,value]=e
             
               obj[key]=value
              
            if (key==="image") {
             toast.warning(value) 
          
            }
       
        
            else if (key==="created") {
              toast.warning(value) 
                
             
            }
         
               
               
               
           })
       
   
   
          
       
          }
          else{
            setDataBook({...dataBook, name:"",
            type:'',
            decription:'',
            price:'',
           autherName:'',
            created:'',
        })
        setImage('')
         setInfo({...info,nameError:"",TypeError:"",priceError:"",descError:"",imageError:""
         ,createdError:"",contryError:""
        })
        navigate(-1)
          }

          
        })
        .catch((rejectedValueOrSerializedError) => {
         console.log(rejectedValueOrSerializedError)
        })
        
  
    }




   

  return (
    <div>
      <ToastContainer
    position='top-right' 
    pauseOnFocusLoss="false"
     limit={2}
    autoClose={2000}
    hideProgressBar={false}
    closeOnClick
    
    rtl={false}
    draggable={false}
    pauseOnHover={false}
  /> 

   <StyledProduct >
     
     <StyledForm className='card shadow'>
      <StyledImage>
      <label className='form-label' htmlFor='filephoto'><img src={image||gigo}/></label>
      <p style={fieldName==="image"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.imageError!=""&&fieldName==="image"&& info.imageError}</p>
      < input  type="file" label='Image' name="user" className="form-control d-none" id="filephoto" accept='.jpeg,.png,.jpg'
       onChange={(e)=>
        changeimage(e)}
      />
      </StyledImage>
        <StyledInput>
        <label>nom</label>
         <input type="text" onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,name:e.target.value})
         }}/>

        </StyledInput>
           <p style={fieldName==="name"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.nameError!=""&&fieldName==="name"&& info.nameError}</p>
           <StyledInput>
        <label>type</label>
         <input type="text" onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,type:e.target.value})
         }}/>
         
        </StyledInput>
        <p style={fieldName==="type"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.TypeError!=""&&fieldName==="type"&& info.TypeError}</p>
        <StyledInput>
        <label>description</label>
        <textarea type="text"   id="w3review" name="w3review" rows="4" cols="50"
        onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,decription:e.target.value})
         }} ></textarea>
        
            
        </StyledInput>
        <p style={fieldName==="description"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.descError!=""&&fieldName==="description"&& info.descError}</p>

        <StyledInput>
        <label>prix</label>
         <input type="number" onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,price:e.target.value})
         }}/>
        </StyledInput>
        <p style={fieldName==="price"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.priceError!=""&&fieldName==="price"&& info.priceError}</p>
         <StyledInput>
         <label>pays</label>
         <input type="text" onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,autherName:e.target.value})
         }}/>
            
         </StyledInput>
         <p style={fieldName==="contry"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.contryError!=""&&fieldName==="contry"&& info.contryError}</p>
       
         <StyledInput>
         <label>date du fabrication</label>
         <input type="date" onChange={(e)=>{
          e.preventDefault()
          setDataBook({...dataBook,created:e.target.value})
         }}/>
            
         </StyledInput>
         <p style={fieldName==="created"?{color:'red',border:'solid 2px gray',textAlign:'center',padding:'5px',borderRadius:'5px', backgroundColor:'rgb(183, 182, 181,0.2)'}:{border:'none'}}> {info.createdError!=""&&fieldName==="created"&& info.createdError}</p>



        <StyleButton onClick={handlerclick}>ajouter produit</StyleButton>
        
     </StyledForm>


   </StyledProduct>
  
 
    </div>
  );
}
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
   input{
    margin-left:20px;
    height:40px;
    flex:1;
   
   };
   textarea{
    margin-left:20px;
    
    flex:1;
   }

`

const StyleButton=styled.button`
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 5px;
    background-color: rgb(8, 133, 45);
    text-align: center;
    padding: 5px 10px;
   
    color: azure;
    box-shadow: 2px 2px 5px rgb(14, 40, 0.4);
    &:hover{
      background-color: rgb(22, 108, 5);
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
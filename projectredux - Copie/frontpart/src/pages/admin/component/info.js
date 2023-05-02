import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import {getProfileUser}from'../../../redux/userslice'
import DialogTitle from '@mui/material/DialogTitle';
import styled from'styled-components'
import { useNavigate } from 'react-router';

import { current } from '@reduxjs/toolkit';
  export default function View({rad}) {

  const{profile,statuProfile}=useSelector((state)=>state.user)


  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [open, setOpen] = React.useState(false);
 
   const[current,setCurrent]=useState([])
  useEffect(() => {
   
    }, []);
 
    

    
 
  
     const handleClickOpen = useCallback(() => {
      setOpen(true);
      dispatch(getProfileUser(rad))
    
     
 
      
      
 
     
    },[]);
    


  

    const handleClose = () => {
      setOpen(false);
    };


  return (
    <div>
      <Edit variant="outlined" onClick={handleClickOpen}>
        voir profile
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md' >
        <DialogTitle>information d'utilisateur</DialogTitle>
        <DialogContent>
          {
            statuProfile==="loading"?(<p>...loading</p>):
            (
              <StyledPrduct>
                
                <ProductContainer>
                <ProductDetails>information du client</ProductDetails>
                <ImageContainer>
                <img src={profile.image} alt={profile.name}/>

              </ImageContainer>
              <Styledinfo>
               <p>nom du client:</p> <span>{profile.name}</span>
              </Styledinfo>
              <Styledinfo>
                <p>age:</p>
                 <span>{profile.age}</span>
              </Styledinfo>
              <Styledinfo>
                <p>email:</p>
                <span>{profile.email}</span>
              </Styledinfo>
              <Styledinfo>
                <p>addresse</p>
                <span>{profile.addresse}</span>
              </Styledinfo>
              <Styledinfo>
                <p>crée à</p>
                <span>{profile.createdAt?.substring(0,10)}</span>
              </Styledinfo>
             { profile?.updatedAt&&<Styledinfo>
                <p>modifiée à</p>
                <span>{profile?.updatedAt?.substring(0,10)}</span>
              </Styledinfo>}
                 
              <StyleButton onClick={()=>navigate(`viewCommande/${profile._id}`)}>voir la liste du commande</StyleButton>

                </ProductContainer>
              
              
              </StyledPrduct>
            )

          }
       
     </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}


const StyledPrduct=styled.div`
display:flex;
 justify-content:center;

 margin-top:50px

`
const ProductContainer=styled.div`
 border:2px solid;
 max-width:600px;
 width:100%;
 display:flex;
 flex-direction:column;
 padding:20px 30px;
  background-color:rgb(153, 82, 181,0.1);
 height:auto;


`
const ImageContainer=styled.div`
 
 height:auto;
  
 text-align:center;
  img{
   border:2px solid;
   width:250px;
   margin:10px auto
   
  }
`
const ProductDetails=styled.div`
 flex:2;
text-align:center;
margin-bottom:20px;
 h3{
    font-size:  35px;
   
    color:gray;
   
 }



`

const Styledinfo=styled.div`

  display:flex;
  align-items:center;
  margin-top:40px;
  p{
    font-size:20px;
    width:160px;
    letter-spacing:1.5px;
    font-weight:bold
   
   };
 
   span{
   font-size:20px;
   letter-spacing:1.2px;
    height:45px;
  
   
   }

`









const Edit=styled.button`
background-color: rgb(28, 28, 205,0.8);
margin:5px;
width:100px;
outline:none;
transition:1s;
&:hover{
  background-color: rgb(28, 28, 205);
}
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
 box-shadow:3px 3px 8px rgb(25, 128, 10,0.5),-4px -4px 8px rgb(65, 128, 10,0.3),


`
const StyleButton=styled.div`
  
  background-color:blue;
  outline:none;
  border-radius:5px;
  padding:5px 10px;
  color:white;
  text-align:center;
  font-size:20px;
  font-weight:500;
  width:250px;
  margin:20px auto;
  margin-top:30px;
  cursor: pointer;
  &:hover{
    background-color:rgb(4, 4, 169);
  }

`
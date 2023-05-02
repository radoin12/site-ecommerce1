import React from 'react';
import {useNavigate,Outlet ,} from 'react-router-dom';
import styled from 'styled-components'
export default function Create() {
    const navigate=useNavigate()
  return (
    <div>
      <StyleButton type='submit' className='btn btn-primary' onClick={()=>{
        navigate('product')
      }}>create</StyleButton>
      <Outlet/>
    </div>
  );
}

const  StyleButton =styled.button`

 margin:50px;
 float:right;
 transition:2s;
 @media (max-width: 700px) {
   float:none;
   margin:20px auto;
    display:flex;
    justify-content:center;
     padding:5px 10px;
     width:130px;
     &:hover{
      background-color:blue
     }
    }

 
`

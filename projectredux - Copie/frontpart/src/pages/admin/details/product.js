import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components'
import {FindOnePro}from'../../../redux/operationbooks'
import { useDispatch,useSelector } from 'react-redux';
import{postcard}from '../../../redux/features/storecard'
export default function ProductFindOne() {
  const{findooneprodata,statusFindOne}=useSelector((state)=>state.product)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  console.log(findooneprodata,"oneeeee")
    const{id}=useParams()
     console.log(id)
    useEffect(()=>{
     dispatch(FindOnePro(id))
    },[dispatch])
    

    // add to carte 
    const handlerCarte=()=>{
      dispatch(postcard(findooneprodata))
      navigate('/card')
    }



    function formatDollar(num) {
        var p = num?.toFixed(2)?.split(".");
        return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
            return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
        }, "") ;
      }

  return (
    <div>
     <StyledPrduct>
        <ProductContainer>
           {statusFindOne==="loadin"?<p>...loading</p>
             :<div>
               <ImageContainer>
                <img src={findooneprodata?.image} alt='product'/>
               </ImageContainer>
               <ProductDetails>
                <h3>{findooneprodata?.name}</h3>
                <p>date du fabrication: <span>{findooneprodata?.created.substring(0,10)}</span></p>
                <p>pays: <span>{findooneprodata?.contry}</span></p>
                <p>type: <span>{findooneprodata?.type}</span></p>
                <Price>prix: {findooneprodata&&formatDollar(findooneprodata?.price*1000)}</Price>
                <StyleButton onClick={handlerCarte} >ajouter au carte</StyleButton>
               </ProductDetails>

             </div>
        
        
        }
        </ProductContainer>
     </StyledPrduct>
    </div>
  );
}

const StyledPrduct=styled.div`
 display:flex;
 justify-content:center;
 margin:10px;
`
const ProductContainer=styled.div`
 max-width:400px;
 width:100%;
 height:auto;
 display:flex;
 justify-content:center;
 box-shadow:rgb(42, 156, 7,0.3) 0px 7px 20px 0px;
 border-radius:5px;
 padding: 20px;


`
const ImageContainer=styled.div`
  flex:1;
  margin:0 auto;
      border:2px solid gray;
      border-radius:3px;
      box-shadow:rgb(42, 156, 7,0.3) 0px 5px 18px 0px;
  
  img{
    width:250px;
    object-position:80% 20%;
   

  }
`
const ProductDetails=styled.div`
 flex:2;
 margin-left:20px;
 h3{
    font-size:  35px;
    text-align:center;
    color:gray;
 }
 p {
    font-weight:bold;
 }


`

const Price=styled.div`
font-weight:bold;
margin:10px 0;
font-size:20px;

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
  width:200px;
  margin:20px auto;
  margin-top:30px;
  cursor: pointer;
  &:hover{
    background-color:rgb(4, 4, 169);
  }

`
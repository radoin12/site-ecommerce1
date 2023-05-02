import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import{getAllMoney} from'../../../redux/features/order'
import{useGetContactsQuery}from'../../../redux/features/api'
import styled from 'styled-components'
export default function Allinfo({props}) {
const dispatch=useDispatch()
console.log(props,' props hh')
const{data,error, isLoading}=useGetContactsQuery()

const{mydata,nbrcmd}=useSelector((state)=>state.order)

useEffect(()=>{

dispatch(getAllMoney())
},[dispatch])
function formatDollar(num) {
    var p = num?.toFixed(2)?.split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
    }, "") ;
  }

  return (
    <div>
      {data&&<Main>
        <h3>somme des toutes les caracteristiques</h3>
      <Information>
        <Title>users</Title>
        <Data>{props?.length}</Data>
      </Information>
      <Information>
        <Title>product</Title>
        <Data>{data&&data?.length}</Data>
      </Information>
      <Information>
        <Title> gangner</Title>
        <Data>{formatDollar((mydata)*1000)}</Data>
      
      </Information>
      <Information>
        <Title>liste du commande</Title>
        <Data>{nbrcmd}</Data>
      </Information>
      </Main>}
    </div>
  );
}
const Main=styled.div`
 background-color:black;
 color:white;
 margin-top:15px;
 border-radius:10px;
 padding:10px;
 font-size:14px;
 max-width:100%;
 margin:10px;
 h3{
    font-size:18px;
    width:100%;
    color:rgb(255, 55, 55);
    text-align:center;
    background-color:rgb(255, 55, 55,0.17);
};
box-shadow:2px 2px 5px rgb(55, 49, 49,0.4) ,-2px -2px 5px rgb(55, 49, 49,0.3);

`
const Information=styled.div`
display:flex;
margin-top:10px;
border-radius:3px;
background-color: rgb(45, 79, 49,0.5);
padding:5px;
`
const Data=styled.div`

`
const Title=styled.div`
flex:1;
font-weight:700
`
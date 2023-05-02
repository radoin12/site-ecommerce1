import React, { useState } from 'react';
import * as FaIcons from'react-icons/fa'
import * as AiIcons from'react-icons/ai'
import * as IoIcons from'react-icons/io'
import * as RiIcons from'react-icons/ri'
import styled from'styled-components'
import {axiosPrivate} from'../../../service/privatekey'
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import {getStatistique,getMoneyOrder} from'../../../redux/features/order'
import Widget from './widget';
import { useEffect } from 'react';
import Charts from './charts';
import {getAllInfoUsers}from'./../../../redux/userslice'
import Transaction from './transaction';
import Allinfo from './allinfo';
export default function Summary() {
 const[order,setOrder]=useState([])
  useEffect(()=>{
    const getOrder=async()=>{
     try {
       const response=await axiosPrivate.get('/orders')
      console.log(response.data)
       setOrder(response.data)
    } catch (error) {
    console.log(error)
    }
    }
  getOrder()
  





  },[])



 const dispatch=useDispatch()
 const {orderData,orderStatus, percentage, orderMoneyData}=useSelector((state)=>state.order)
 const{allusers}=useSelector((state)=>state.user)
 console.log("give me all users",allusers)
 const stat=useSelector((state)=>state.order)
 console.log(orderMoneyData)

  useEffect(()=>{
  
   dispatch(getStatistique())
   dispatch(getMoneyOrder())
     dispatch(getAllInfoUsers())
 },[dispatch])

 function formatDollar(num) {
  var p = num?.toFixed(2)?.split(".");
  return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
      return num + (num != "-" && i && !(i % 3) ? "," : "") + acc;
  }, "") ;
}


 const data=[
  {
    icon:<IoIcons.IoIosPaper/>,
 numbers: orderData[0]?.total,
 isMoney:false,
 title:'utilisateur',
 color:'rgb(119, 236, 236);',
 bagroundColor:'rgb(119, 236, 236,0.17)',
 percentage:percentage

 },
 {
  icon:<FaIcons.FaClipboard/> ,
  numbers:order[0]?.total,
  isMoney:false,
  title:'commande',
  color:'rgb(105, 237, 16)',
  bagroundColor:'rgb(105, 237, 16,0.17)',
  percentage:((order[0]?.total-order[1]?.total)/order[1]?.total)*100
 
  },
  {
    icon:<FaIcons.FaChartBar/>,
    numbers:orderMoneyData[0]?.total&&formatDollar(orderMoneyData[0]?.total*10),
    isMoney:true,
    title:'gagner',
    color: 'rgb(239, 176, 41)',
    bagroundColor:'rgb(239, 176, 41,0.12)',
    percentage:((orderMoneyData[0]?.total-orderMoneyData[1]?.total)/orderMoneyData[1]?.total)*100
   
    }


]

  return (
    <div >
     <StyledSummary>
      <MainStatistique>
        <Overview>
          <Title>
         <h2>statistique</h2>
         <p>la performance de votre boutique par rapport au mois précédent</p>
          </Title>
           <Wrapper>
            {
              data.map((item,index)=>
               <Widget key={index}data={item}/>
              )
            }
           </Wrapper>
        </Overview>
        <Charts/>
      </MainStatistique>
      <SideStat>
        <Transaction/>
        <Allinfo props={allusers}/>
      </SideStat>
     </StyledSummary>
    </div>
  );
}

const StyledSummary=styled.div`

 width:100%;
 display:flex;
 @media (max-width: 1258px) {
padding:20px;
display:flex;
flex-direction:column
}
@media (max-width: 1258px) {
padding:0px;

}

`
const MainStatistique=styled.div`
 
 flex:2;
 width: 100%;
 @media (max-width: 1200px) {

  margin:20px 50px;
  width: 100%;
}
@media (max-width: 700px) {

margin:15px ;

}

`
const Title=styled.div`
  p{
    color: aliceblue;
    font-size:16px;
  }
  @media (max-width: 700px) {

 text-align:center

}


`
const Overview=styled.div`
background-color: rgb(15, 5, 64);
width:700px;
display:flex;
color:beige;
justify-content:space-between;
padding:15px;
height:190px;
margin:50px;
border-radius:15px;
flex-direction:column;
@media (max-width: 1300px) {
padding:10px;
margin:20px 10px ;
width: 80%;
height: 200px;
}
@media (max-width: 700px) {
margin:30px 40px;

height: 400px;
}

`
const SideStat=styled.div`

display: flex;
flex-direction: column;
margin-left:20px;
width: 100%;
max-width:100%;
@media (max-width: 1300px) {

  margin:20px 80px;
  width: 85%;
}
@media (max-width: 700px) {

margin:5px;
width: 100%;
}
`
const Wrapper=styled.div`
display: flex;
justify-content: space-between;
width: 100%;
@media (max-width: 1200px) {
display:flex;
justify-content: center;



}
@media (max-width: 700px) {
display:flex;
flex-direction:column;



}



`
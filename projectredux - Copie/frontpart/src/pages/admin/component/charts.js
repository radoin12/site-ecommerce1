import React, { useEffect } from 'react';
import styled from'styled-components'
import{getRecharts}from '../../../redux/features/order'
import { useDispatch,useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function Charts() {
    const dispatch=useDispatch()
    const {rechartsData,rechartStatus}=useSelector((state)=>state.order)
useEffect(()=>{
dispatch(getRecharts())
},[dispatch])
 console.log(rechartsData,"recharts")




  return (
    <>
     {rechartStatus===<Para>...loading</Para>?'...Loading':
         <StyledReCharts>
            <h3>les sept derniers jours pour les commandes en ligne</h3>
         <ResponsiveContainer width="100%" height="100%">
           <LineChart
             width={600}
             height={300}
             data={rechartsData}
             margin={{
               top: 5,
               right: 30,
               left: 20,
               bottom: 5,
             }}
           >
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="day" />
             <YAxis />
             <Tooltip />
             <Legend />
             <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
           
           </LineChart>
         </ResponsiveContainer>
       </StyledReCharts>
     }
    </>
 
  );
}

const StyledReCharts=styled.div`
width:700px;
height:350px;
padding:15px;
h3{
    padding:10px 25px ;
    width:100%;
   
    color:rgb(82, 237, 47);
}
margin:10px 50px;
border:2px solid black;
padding:10px;
border-radius:10px;


`
const Para=styled.div`
padding:50px;
font-size:25px;
color:red;

`

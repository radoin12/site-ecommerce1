
import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


import styled from 'styled-components'

import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import{getAllOrders,UpDateOrderStat}from'../../../redux/features/order'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { blueGrey } from '@mui/material/colors';
import { useNavigate } from 'react-router';

export default function OrderListe() {
    const dispatch=useDispatch()
   const navigate=useNavigate()
    const {OrdersDataAll,editStatusOrdeer}=useSelector((state)=>state.order)
  console.log(OrdersDataAll&&OrdersDataAll)
 useEffect(()=>{
  dispatch(getAllOrders())

 },[dispatch])




 const rows=OrdersDataAll?.map((item)=>{
    return{
      id:item._id,
      customerName:item.shipping?.name,
      phone:item?.shipping.phone,
      total:(item?.amount_subtotal/100),
      orderStatus:item?.delevryStatus,
      dateOrder: moment (item?.createdAt).fromNow(),
  




    
    }
  
  })
  const columns= [
    { field:'id', headerName: 'ID', width: 100 },
    { field:'customerName', headerName: 'nom du client', width: 120 },

    { field:'phone', headerName: 'telephone', width: 120},
    { field: 'total', headerName: 'total', width: 80 },
    {
      field: 'orderStatus',
      headerName: 'status',
      type: 'number',
      width: 120,
      renderCell:(params)=>{
       return<div>
          {params.row.orderStatus==="pending"?<Pending>en attente</Pending>:
          params.row.orderStatus==="dispatched"?<Dispatched>envoyée</Dispatched>:
          params.row.orderStatus==="delivered"?<Delivered>livré</Delivered> :"error"

          }
         </div>
      }
    },
    {
        field: 'dateOrder',
        headerName: 'date',
        type: 'number',
        width: 120,
      
      },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 450,
      renderCell:(params)=>{
        return <Actions>
        <DeleveredBtn onClick={()=>handlerDelevered(params.row.id)}>livré</DeleveredBtn>
        <DispatchedBtn onClick={()=>handlerDispatch(params.row.id)}>envoyé</DispatchedBtn>
        <View onClick={()=>navigate(`detailOrder/${params.row.id}`)}>verfication</View>
        </Actions>
      }
    
    },
  ];

  const handlerDelevered=(id)=>{
    dispatch(UpDateOrderStat(
     { id,
      delevryStatus:'delivered'
    }
      
      ))
  }
  const handlerDispatch=(id)=>{
    dispatch(UpDateOrderStat(
     { id,
      delevryStatus:'dispatched'
    }
      
      ))
  }

  return (
    <>
    <ToastContainer></ToastContainer>
    <h2 style={{color:'blueGrey',textAlign:'center',borderBottom:'2px solid',padding:'10px'}}>liste des commandes</h2>
    
    <>
    { editStatusOrdeer==="loading"?<Para>...loading</Para>:
      OrdersDataAll?.length>0&&<div style={{ height: 500, width: '95%',margin:'50px 30px',backgroundColor:'rgb(245, 183, 69,0.17)'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
      />
    </div>
    
    }
   

    </>
   
    </>
  
  );
}
const Pending=styled.div`
background-color:orange;
background:rgb(245, 183, 69,0.17);
border-radius:5px;
font-size:14px;
padding:5px 10px


`
const Dispatched=styled.div`
background-color:rgb(79, 140, 13);

border-radius:5px;
font-size:17px;
padding:5px 10px;
font-weight:700;

`
const Delivered=styled.div`

background-color:rgb(122, 61, 178);
border-radius:5px;
font-size:17px;
padding:5px 20px;
font-weight:700;
 
`

const Actions=styled.div`
display:flex;
justify-content: space-between;


`

const DeleveredBtn=styled.button`
background-color: rgb(122, 61, 178);
box-shadow:1px 1px 4px rgb(122, 61, 178,0.17),-3px -3px 5px rgb(122, 61, 178,0.2);
width:120px;
margin:5px;
outline:none;
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
`
const DispatchedBtn=styled.button`
background-color: rgb(79, 140, 13) ;
box-shadow:1px 1px 4px rgb(79, 140, 13,0.17),-3px -3px 5px rgb(79, 140, 13,0.2);
width:120px;
margin:5px;
outline:none;
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
`



const View=styled.button`
background-color:blue;
margin:5px;
width:120px;
outline:none;
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
 box-shadow:3px 3px 8px rgb(25, 128, 10,0.5),-4px -4px 8px rgb(65, 128, 10,0.3),


`
const Para=styled.div`
 text-align:center;
 font-size:20px;
 letter-spacing:1.17px;

`
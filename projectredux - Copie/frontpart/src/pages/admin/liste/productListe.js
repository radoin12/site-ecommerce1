


import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';

import styled from 'styled-components'

import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import{postPro,deleteProduct}from'../../../redux/operationbooks'
import { ToastContainer, toast } from 'react-toastify';
import EditPro from '../component/editProduct';

export default function ProductListe() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const{productData,deletePro}=useSelector((state)=>state.product)
 
 useEffect(()=>{
  dispatch(postPro())

 },[])

//  delete product
const deleteHandler=(e,id)=>{

  dispatch(deleteProduct(id))
  toast.error('product is deleted',{
    position:'top-right'
  })
  
}


 const rows=productData.map((item)=>{
    return{
      id:item._id,
      contry:item.contry,
      image:item.image,
      name:item.name,
      type:item.type,
      price:item.price,
    
    }
  
  })
 const columns= [
    { field:'id', headerName: 'ID', width: 120 },
    { field:'contry', headerName: 'contry', width: 90 },

    { field:'image', headerName: 'image', width: 170,
    
    renderCell:(params)=>{
        return(<ImageContainer>
           <img src={params.row.image}alt=''/>  
        </ImageContainer>)
    }

},
{ field: 'name', headerName: 'name', width: 120 },
    {
      field: 'type',
      headerName: 'type',
      type: 'number',
      width: 140,
    },
    {
        field: 'price',
        headerName: 'price',
        type: 'number',
        width: 90,
      },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 300,
      renderCell:(params)=>{
        return(
            <Actions>
              
                
                <Delete onClick={(e,id)=>deleteHandler(e,params.row?.id)}>supprimer</Delete>
                <EditPro propsId={params.row.id}/>
                <View onClick={()=>navigate(`pro/findone/${params.row.id}`)}>verifier</View>
            </Actions>
        )
          
        
      }
    },
  ];
  return (
    <>
    <ToastContainer></ToastContainer>
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </>
  
  );
}
const ImageContainer=styled.div`
 img{

        height: 70px;
      object-position:20% 80%;
      border:2px solid;
      width:130px;
      text-align:center
    
 }

`
const Actions=styled.div`
display:flex;
justify-content: space-between;


`

const Delete=styled.button`
background-color: rgb(241, 86, 35);
box-shadow:1px 1px 4px rgb(241, 86, 35,0.17),-3px -3px 5px rgb(241, 86, 35,0.17);
width:80px;
margin:5px;
outline:none;
padding:5px 10px;
 text-align :center;
 color:white;
 border-radius:5px;
`
const View=styled.button`
background-color:blue;
margin:5px;
width:80px;
outline:none;
padding:5px 10px;
 text-align :center;
 color:white;
 border-radius:5px;
 box-shadow:3px 3px 8px rgb(25, 128, 10,0.5),-4px -4px 8px rgb(65, 128, 10,0.3),


`
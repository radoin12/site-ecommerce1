import React, { useEffect } from 'react';
import {getAllInfoUsers,deleteProfileUser,ChangeRoleUser}from'../../../redux/userslice'
import { useDispatch,useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import styled from 'styled-components'
import moment from 'moment';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

import View from '../component/info';
import UpdateOurUsers from '../component/editUser';
export default function Users() {
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const{allusers,statusUser,statusrole}=useSelector((state)=>state.user)
 const{allowedit}=useSelector((state)=>state.regestration)
 console.log(allusers,"all user")

 useEffect(()=>{
dispatch(getAllInfoUsers())

 },[dispatch])

 const rows=allusers?.map((item)=>{
  return{
    id:item?._id,
    nom:item?.name,
    email:item?.email,
    addresse:item?.addresse,
    image:item?.image,
    creation: moment(item?.createdAt).fromNow(),
    isAdmin:item.isAdmin




  
  }

})
const columns= [
  { field:'id', headerName: 'ID', width: 100 },
  { field:'nom', headerName: 'nom du client', width: 120 },

  { field:'email', headerName: 'email', width: 120},
  { field: 'addresse', headerName: 'addresse', width: 120 },
  {
    field: 'isAdmin',
    headerName: 'etat de fonctionalité',
    type: 'number',
    width: 120,
    renderCell:(params)=>{
     return<div>
        {params.row.isAdmin===true?<Admine>admin</Admine>:
        params.row.isAdmin===false?<User>utilisateur</User>:"error"
  
        }
       </div>
    }
  },
  {
      field: 'creation',
      headerName: 'creation',
      type: 'number',
      width: 120,
    
    },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 400,
    renderCell:(params)=>{
      return <Actions>
      <Delete onClick={()=>handlerDelete(params.row.id)}>supprimer</Delete>
      <UpdateOurUsers propsId={params.row.id}/>
      <View rad={params.row.id} />
      </Actions>
    }
  
  },   
  { field: 'roles',
  headerName: 'role',
  sortable: false,
  width: 400,
  renderCell:(params)=>{
    return <Actions>
    <UserRole onClick={()=>handlerUser(params.row.id)}> utulisateur</UserRole>
    <AdminRole onClick={()=>handlerAdmin(params.row.id)}>admine</AdminRole>
    
    
    </Actions>
  }

},

];
const handlerDelete=(id)=>{
dispatch(deleteProfileUser(id))

}

const handlerAdmin=(id)=>{
  const user=allusers?.find((item)=>item._id===id)
 !(user.isAdmin)&&allowedit&&toast.success(`${user.name}a été ajouté comme admine`)
dispatch(ChangeRoleUser({
  id,
  isAdmin:true
}))

}
const handlerUser=(id)=>{
  const user=allusers?.find((item)=>item._id===id)
  user.isAdmin&&allowedit&& toast.error(`${user?.name} a été changé comme un utlisateur`)
  dispatch(ChangeRoleUser({
    id,
    isAdmin:false
  }))
 
  
  }
  






  return (
    <div>
       
    <ToastContainer></ToastContainer>
    <h2 style={{color:'blueGrey',textAlign:'center',borderBottom:'2px solid',padding:'10px'}}>liste des utilisateurs</h2>
    
    <>
    { statusUser==="loading"?<Para>...loading</Para>:
      allusers?.length>0&&<div style={{ height: 500, width: '95%',margin:'50px 20px',backgroundColor:'rgb(245, 183, 69,0.17)'}}>
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
   
    
    </div>
  );
}
const User=styled.div`
background-color:orange;
background:rgb(245, 183, 69,0.17);
border-radius:5px;
font-size:14px;
padding:5px 10px;
width:90px;
text-align:center;
font-weight:bold


`
const Admine=styled.div`
background-color:green;

background-color:rgb(11, 126, 11,0.7);

width:90px;
border-radius:5px;
font-size:14px;
padding:5px 10px;
text-align:center;
font-weight:bold

`
const Delete=styled.div`
 cursor: pointer;
  background-color: rgb(185, 22, 22,0.8);
box-shadow:2px 2px 3px rgb(185, 22, 22,0.1),-3px -3px 6px rgb(185, 22, 52,0.2);
width:100px;
margin:5px;
transition:1s;
&:hover{
  background-color:  rgb(185, 22, 22);
}
outline:none;
padding:5px 10px ;
 text-align :center;
 color:white;
 border-radius:5px;
 
`

const Actions=styled.div`
display:flex;
justify-content: space-between;


`

const AdminRole=styled.button`

background-color: rgb(65, 128, 10);
box-shadow:3px 3px 5px rgb(8, 133, 45,0.2),-3px -3px 6px rgb(8, 133, 45,0.2);
width:85px;
margin:5px;
outline:none;
padding:5px 12px;
 text-align :center;
 color:white;
 border-radius:5px;
 cursor: pointer;

`
const UserRole=styled.button`
width:85px;
margin:5px;
outline:none;
padding:5px 12px;
 text-align :center;
 color:white;
 border-radius:5px;
 cursor: pointer;
  background-color: rgb(185, 22, 22,0.8);
box-shadow:2px 2px 3px rgb(185, 22, 22,0.1),-3px -3px 6px rgb(185, 22, 52,0.2);

`




const Para=styled.div`
 text-align:center;
 font-size:20px;
 letter-spacing:1.17px;

`
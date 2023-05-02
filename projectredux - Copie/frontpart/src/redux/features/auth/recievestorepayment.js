import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import { axiosPrivate } from "../../../service/privatekey";




// get recu

export const getCommand=createAsyncThunk("command/getCommand",async(id)=>{

 try {
    const res=await axiosPrivate.get(`/recuclient/${id}`) 

    return res.data

 } catch (error) {
    console.log(error)
  return error
 }
 
  
})
// view
export const OrderView=createAsyncThunk("command/OrderView",async(id)=>{

  try {
     const res=await axiosPrivate.get(`/getonecommand/${id}`) 
 
     return res.data
 
  } catch (error) {
     console.log(error)
   return error
  }
  
   
 })




const initialState={
    recieveCommond:[],
    recieveStatus:"",
    recieveError:"",
    view:[],
    etat:'',
    error:''
   
   
}

const recuReducer=createSlice(({
 name:"command",
 initialState,
 reducers:{},
 extraReducers:(builder)=>{
    builder.addCase(getCommand.pending,(state,action)=>{
     
        return{...state,
         recieveStatus:"loading"
        
        }

    })
    .addCase(getCommand.fulfilled,(state,action)=>{
      return{
        ...state,recieveStatus:"success",
        recieveCommond:action.payload
      }
    })
    .addCase(getCommand.rejected,(state,action)=>{
        return{
          ...state,recieveStatus:"field",
          recieveError:action.payload
        }
      })
// view commande
.addCase(OrderView.pending,(state,action)=>{
     
  return{...state,
   etat:"loading"
  
  }

})
.addCase(OrderView.fulfilled,(state,action)=>{
  return{
    ...state,etat:"success",
   view:action.payload
  }
})
.addCase(OrderView.rejected,(state,action)=>{
    return{
      ...state,etat:"field",
     error:action.payload
    }
  })

 
 }












}))

export default recuReducer.reducer
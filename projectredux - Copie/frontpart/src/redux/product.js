

import{ createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

import {toast}from'react-toastify'


// ****** post product*********

  
// delete products
export const deleteProducts=createAsyncThunk('book/deleteProducts',async(id,thunkAPI)=>{
  const {rejectWithValue}=thunkAPI
    try {
        const response=fetch(`http://localhost:3000/deleteBook/${id}`,{
            method:'DELETE',
            headers:{
                "content-type":"application/json"
            }
        })
     
        return id


    } 
    
    catch (error) {
        rejectWithValue(error.message)
    }


}




)

const registrationBook=createSlice({
    name:'book',
    initialState:{
  
 
      findbook:[],
   
      loading:false,
  
   
     error:null,

   

   
      


    },
    reducers:{
     
    },
     extraReducers:{
   












  
    //  delete product
    [deleteProducts.pending]:(state,action)=>{
        state.loading=true
        state.error=null
     },
     [deleteProducts.fulfilled]:(state,action)=>{
        state.loading=false
        state.findbook=state.findbook.filter((i)=>i._id!=action.payload)
   
     },
     [deleteProducts.rejected]:(state,action)=>{
        state.loading=false
        state.error=true
     },

        
    }
})
export default registrationBook.reducer

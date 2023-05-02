
 import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
 import {axiosPrivate}from'../service/privatekey'
  import axios from 'axios'
import { toast } from "react-toastify";




  

// create product



export const postproducts=createAsyncThunk('product/postproducts',async(datas,thunkAPI)=>{
  const{rejectWithValue}=thunkAPI
 
  try {
      const {data}=await axiosPrivate.post('/addbooks',datas)
    
   
      return data
   
    
  } catch (error) {
  
    return rejectWithValue(error.response)
  }


})







//  show all product
  export const postPro=createAsyncThunk('product/postPro',async(_,thunkApi)=>{
     const{rejectWithValue}=thunkApi
     try {
       const {data}=await  axios.get('http://localhost:3000/displayBook')
       return data
     } catch (error) {
        return rejectWithValue(error.response)
     }

 })
//  delete product
export const deleteProduct=createAsyncThunk('product/deleteProduct',async(id,thunkApi)=>{
    const{rejectWithValue}=thunkApi
    try {
      const {data}=await axiosPrivate.delete(`/deleteBook/${id}`)
      return data
    } catch (error) {
       return rejectWithValue(error.response)
    }

})

// find one product

export const FindOnePro=createAsyncThunk('product/FindOnePro',async(id,thunkApi)=>{
    const{rejectWithValue}=thunkApi
    try {
      const {data}=await  axiosPrivate.get(`/onlybook/${id}`)
      return data
    } catch (error) {
       return rejectWithValue(error.response)
    }

})

// modifier produit
export const updateProducts=createAsyncThunk('product/updateProducts',async(values)=>{

 try {
  const res=await axiosPrivate.put(`/updatebook/${values._id}`,values)
   console.log(values,"new val")
 
    return res.data

 } catch (error) {
  console.log(error,'error')
  return error

 }



})









 const  initialState={
  productData:[],
  statusPro:'',
  errorPro:'',

  statusProDelete:'',
  errorProDelete:'',

  findooneprodata:null,
  statusFindOne:'',
  error:'',

  // create product
  statusProCreate:"",
  errorProduct:"",
  
  // edit pro
  statusEdit:'',
  erroredit:''



 }
 const ProductReducer=createSlice({

  name:'product',
  initialState,
  reducers:{},
  extraReducers(builder){
 
   



    // all product
  builder.addCase(postPro.pending,(state,action)=>{
    return{
        ...state,statusPro:'loading'
    }
  })
  .addCase(postPro.fulfilled,(state,action)=>{
    return{
        ...state,productData:action.payload,
        statusPro:'success'

    }
  })
  .addCase(postPro.rejected,(state,action)=>{
    return{
        ...state,errorPro:action.payload,
        statusPro:'fieled'

    }
  })


//  create product


.addCase(postproducts.pending,(state,action)=>{
  return{
      ...state,statusProCreate:'loading'
  }
})
.addCase(postproducts.fulfilled,(state,action)=>{
  if (action.payload._id) {
    console.log(action.payload)
 
      state.productData.push(action.payload)
      state.statusProCreate='success'
     
  }
  else{
    return{
      ...state,errorProduct:action.payload,
      statusProCreate:'fieled'

  }
  }
  
})
.addCase(postproducts.rejected,(state,action)=>{
  return{
      ...state,errorProduct:action.payload,
      statusProCreate:'fieled'

  }
})





//   delete product

  
.addCase(deleteProduct.pending,(state,action)=>{
    return{
        ...state,statusProDelete:'loading'
    }
  })
  .addCase(deleteProduct.fulfilled,(state,action)=>{
     if (action.payload) {
      return{
        ...state,
        productData:state.productData.filter((data)=>data._id!==action.payload?._id),
        statusProDelete:'success'
       }
    
     }
      

  
  })
  .addCase(deleteProduct.rejected,(state,action)=>{
    return{
        ...state,errorProDelete:action.payload,
        statusProDelete:'fieled'

    }
  })



   //   find one product

  
.addCase(FindOnePro.pending,(state,action)=>{
    return{
        ...state,statusFindOne:'loading'
    }
  })
  .addCase(FindOnePro.fulfilled,(state,action)=>{
    return{
        ...state,findooneprodata:action.payload,
        statusFindOne:'success'

    }
  })
  .addCase(FindOnePro.rejected,(state,action)=>{
    return{
        ...state,error:action.payload,
        statusFindOne:'fieled'

    }
  })


// up date product



.addCase(updateProducts.pending,(state,action)=>{
  return{
      ...state,statusEdit:'loading'
  }
})
.addCase(updateProducts.fulfilled,(state,action)=>{
  if (action.payload) {
    console.log(action.payload)
  const update=state.productData?.map((item)=>
  item._id==action.payload._id?action.payload:item)
  
     
     
      state.productData=update
      state.statusEdit='success'
  }

  toast.info('product is modified',{
    position:'top-right'
  })
  

})
.addCase(updateProducts.rejected,(state,action)=>{
  toast.error('rejected value...',{
    position:'top-right'
  })
  return{
      ...state,erroredit:action.payload,
      statusEdit:'fieled'

  }

})





     

  }



 })
 export default ProductReducer.reducer
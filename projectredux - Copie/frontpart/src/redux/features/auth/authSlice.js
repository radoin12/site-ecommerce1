
import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

import decode from"jwt-decode"
import { toast } from "react-toastify";
//  post to create a new user compte
  
export const postRegester=createAsyncThunk('regestration/postRegester',async(mydata,thunkAPI)=>{
 const {rejectWithValue}=thunkAPI
 try {
   const {data}=await axios.post('http://localhost:3000/registre',mydata)

   console.log(data)
   localStorage.setItem('token',JSON.stringify(data))
   return data
    
 } catch (error) {
  
    return rejectWithValue(error.response.data)
   
 }

})

//*************** */ login customer****************


export const loginUser=createAsyncThunk('regestration/loginuser',async(data,thunkAPI)=>{
const{rejectWithValue}=thunkAPI
  try {
    const response=await axios.post('http://localhost:3000/login',data)
  

           
    localStorage.setItem('token',JSON.stringify(response.data))


 return response.data
 
  } catch (error) {
    console.log(error.reponse)
    return rejectWithValue(error.response)
  }

})




const initialState={
 
    regesterStatus:"",
    loginStatus:'',
    name:"",
    email:"",
    image:"",
    id:'',
    isAdmin:"",
    token:JSON.parse(localStorage.getItem('token')),
     loginError:'',
    regesterError:'',
    allowedit:''


}
const regesterSlice=createSlice({
  name:'regestration',
  initialState,
  reducers:{

    reload:(state)=>{
        const token=state.token
        if (token) {
          const user=decode(state.token.accessToken)
            return{
                ...state,token,name:user.name,
                id:user._id,
                email:user.email,
                image:user.image,
                isAdmin:user.isAdmin,
                 allowedit:user.allowEdit,
                reloaded:"false"
            }
        }
        
       
    },
    logout:(state)=>{
       localStorage.removeItem('token') 
      
       return{
        ...state,regesterStatus:"",
        name:"",
        email:"",
        image:"",
        id:'',
        isAdmin:"",
        token:"",
        allowedit:'',
      
    
        regesterError:''
       }
    }
  },
  extraReducers:{
  [postRegester.pending]:(state,action)=>{
       

        state.regesterStatus="loading"   

       
    
    
  },
  [postRegester.fulfilled]:(state,action)=>{
    if (action.payload) {
      const user=decode(action.payload.accessToken)
        
       return{
        ...state,user,name:user.name,
         id:user._id,
         email:user.email,
         image:user.image,
         regesterStatus:"success",
         isAdmin:user.isAdmin,
         allowedit:user.allowEdit,
         reloaded:"false"
       } 
    }
    else{
        return state
    }
  },
  [postRegester.rejected]:(state,action)=>{
    return{
        ...state,regesterStatus:"field",
         regesterError:action.payload
    }
  },
  
//   login user
[loginUser.pending]:(state,action)=>{
       

    state.loginStatus="loading"   

   


},
[loginUser.fulfilled]:(state,action)=>{
if (action.payload) {
    const user=decode(action.payload.accessToken)
    
   return{
    ...state,user,name:user.name,
     id:user._id,
     email:user.email,
     image:user.image,
     isAdmin:user.isAdmin,
     loginStatus:"success",
     allowedit:user.allowEdit,
     reloaded:"false"
   } 
}
else{
    return state
}
},
[loginUser.rejected]:(state,action)=>{
return{
    ...state,loginStatus:"field",
     loginError:action.payload
}
}

  }

})
export default regesterSlice.reducer
export const{reload, logout}=regesterSlice.actions
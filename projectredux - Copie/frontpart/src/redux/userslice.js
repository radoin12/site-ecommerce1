import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../service/privatekey";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";















// ***********operations request api server**************


    //  ************* getAllUsers************

        export const getAllInfoUsers=createAsyncThunk('user/getAllInfoUsers',async(_,thunkAPI)=>{
           const{rejectWithValue}=thunkAPI
           try {
            const {data}=await axiosPrivate.get('/profiles/all')

                return data
           } catch (error) {
            return rejectWithValue(error.response)
           }
           

        })
        // ***********get profile user*********
       
        export const getProfileUser=createAsyncThunk('user/getProfileUser',(async(id,thunkAPI)=>{
        const{rejectWithValue}=thunkAPI
            try {
             const {data}=await axiosPrivate.get(`/proinfo/${id}`)
                if (data._id) {
                    return data  
                }
                
            } catch (error) {
                console.log(error)
                return rejectWithValue(error)
    
            }
            
 
         }))
        //  delete user
        export const deleteProfileUser=createAsyncThunk('user/deleteProfileUser',(async(id,thunkAPI)=>{
            const{rejectWithValue}=thunkAPI
                try {
                 const {data}=await axiosPrivate.delete(`/deleteuser/${id}`)
                 console.log(data,'api data')
                    if (data._id) {
                        return data  
                    }
                    
                } catch (error) {
                    console.log(error)
                    return rejectWithValue(error)
        
                }
                
     
             }))
        // up date role user

        export const ChangeRoleUser=createAsyncThunk('user/ChangeRoleUser',  async(role,{getState})=>{
                  
                   const getstate=getState()
                  const currentUser=getstate.user.allusers?.find((rols)=>rols._id===role.id)
                  const newOperation={
                    ...currentUser,
                   isAdmin:role.isAdmin
                  }
            try {
             const{data}= await axiosPrivate.put(`/addrole/${role.id}`,newOperation) 
             console.log(data)
                 return data
            } catch (error) {
                console.log(error,"error")
                return error
               
            }
        })





            //  up date users
           export const editUsers=createAsyncThunk('user/editUsers',async(datauser,thunkAPI)=>{
              const{rejectWithValue} =thunkAPI
                try {
                    
                    const {data}=await axiosPrivate.put(`/update/profile/${datauser._id}`,datauser) 
                    console.log(data,'response')
                  
                    return data
                   
                } catch (error) {
                    console.log(error.response)
                 console.log(error.response,'error form') 
                    return rejectWithValue(error.response)
                }
               

            })

   
const initialState={
    // get user all

    allusers:[],
    statusUser:'',
    errorfordataAllUser:'',
    // get one user profile

    profile:'',
    statuProfile:'',
    errorfordataOne:'',

    // delete user

     statusDelete:'' ,
     errorDelete:'',
    //  upDateUser

   
    statusUpdateuser:'',
    errorfordataUpdating:'',
    // role update
    statusrole:'',
    errorroles:''



}

const userRed=createSlice({
name:'user',
initialState,
reducers:{},
extraReducers:{
 [getAllInfoUsers.pending]:(state,action)=>{
   return{
    ...state,
    statusUser:'loading'
   }
 },
 [getAllInfoUsers.fulfilled]:(state,action)=>{
    return{
        ...state,
        statusUser:'success',
        allusers:action.payload
    }

 },
 [getAllInfoUsers.rejected]:(state,action)=>{
    return{
        ...state,
        statusUser:'fieled',
        errorfordataAllUser:action.payload
    }
 },

    //  *********** get profile user***********
    [getProfileUser.pending]:(state,action)=>{
        return{
         ...state,
         statuProfile:'loading'
        }
      },
      [getProfileUser.fulfilled]:(state,action)=>{
        if (action.payload._id) {
            return{
                ...state,
                statuProfile:'success',
                profile:action.payload
            } 
        }
        else{
            return{}
        }
       
     
      },
      [getProfileUser.rejected]:(state,action)=>{
         return{
             ...state,
             statuProfile:'fieled',
             errorfordataOne:action.payload
         }
      },
  //  *********** delete profile user***********
  [deleteProfileUser.pending]:(state,action)=>{
    return{
     ...state,
    statusDelete:'loading'
    }
  },
  [deleteProfileUser.fulfilled]:(state,action)=>{
    if (action.payload) {
        toast.error(`${action.payload?.name} a été supprimé`)
        return{
            ...state,
            statusDelete:'success',
          allusers:state.allusers.filter((user)=>user._id!==action.payload?._id)
        } 
       
    }
  
   
 
  },
  [deleteProfileUser.rejected]:(state,action)=>{
    toast.error("vous n'etes pas autorisée!!")
     return{
         ...state,
         statusDelete:'fieled',
       errorDelete:action.payload
     }
  },

    //   modifier les utilisateurs

       [editUsers.pending]:(state,action)=>{
        
        return{...state,statusUpdateuser:'pending'

         
        }

       },
       [editUsers.fulfilled]:(state,action)=>{
        if (action.payload) {
            console.log(action.apyload,"actionpayload")
           const posUser=state.allusers.findIndex((item)=>item._id===action.payload._id)
            const updatingnewvalue=state.allusers?.map((item)=>
            item._id===action.payload?._id?action.payload:item
            )
            toast.success(`${state.allusers[posUser]?.name} a été modifiée`)
        
            return{...state,statusUpdateuser:'success',
            allusers:updatingnewvalue
           
          }  
        }
       
     

       },
       [editUsers.rejected]:(state,action)=>{
        toast.error("vous n'etes pas autorisée")
        console.log(action.payload)
        return{
            ...state,errorfordataUpdating:action.payload,
            statusUpdateuser:'fieled'
        }
       },
    //    up date role user
    [ChangeRoleUser.pending]:(state,action)=>{
      state.statusrole='loading'
    },
    [ChangeRoleUser.fulfilled]:(state,action)=>{
        if (!action.payload?._id) {
            toast.error("vous n'avez pas l'accée pour cette mission!")
         }
        const updaterole=state.allusers?.map((item)=>
         item._id===action.payload?._id?action.payload:item
        )
       
         return{
         ...state,
         allusers:updaterole,
         statusrole:'success'
         }
        
    },
    [ChangeRoleUser.rejected]:(state,action)=>{

      return{
        ...state,statusrole:'fieled',
          errorroles:action.payload
      }
    },




}

})
export default userRed.reducer
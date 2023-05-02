
import { apiSlice } from "./features/api";
import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import regesterBook from './product'
import cardSlice,{total} from'./features/storecard'
import authreducer,{reload} from'./features/auth/authSlice'
import recuReducer from'./features/auth/recievestorepayment'
import orderReducer from'./features/order'
import ProductReducer from'./operationbooks'
import userReducer from './userslice'
export const store= configureStore({
    reducer:{
       book: regesterBook,
       card:cardSlice,
       user:userReducer,
       regestration:authreducer,
       command:recuReducer,
       order:orderReducer,
       product:ProductReducer,
       [apiSlice.reducerPath]:apiSlice.reducer
  
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(apiSlice.middleware)
    },
   
})
store.dispatch(total())
store.dispatch(reload(null))

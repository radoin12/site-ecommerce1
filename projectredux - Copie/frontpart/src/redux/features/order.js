import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import  {axiosPrivate}    from'../../service/privatekey'




 export const getStatistique=createAsyncThunk('order/getStatistique',async(_,thunkAPI)=>{
 const{rejectWithValue}=thunkAPI
 try {
    const response=await axiosPrivate.get('/stat')

 
       
        return response.data
     
      
 } catch (error) {
    console.log(error)
    return rejectWithValue(error.response.message)
 }
  

})













export const getMoneyOrder=createAsyncThunk('order/getMoneyOrder',async(_,thunkAPI)=>{
 const {rejectWithValue}=thunkAPI
 try {
   const {data}=await axiosPrivate.get('/commandMoney')
   return data
    
 } catch (error) {
    console.log(error)
    return rejectWithValue(error)
 }


})

export const getRecharts=createAsyncThunk('order/getRecharts',async(_,thunkAPI)=>{
 const{rejectWithValue}=thunkAPI
 try {
   
    const {data}=await axiosPrivate.get('/order/lastWeek')
      return data

 } catch (error) {
    return rejectWithValue(error)
 }


})

// take just 4 command user
export const getAllOrder=createAsyncThunk('order/getAllOrder',async(_,thunkAPI)=>{
const {rejectWithValue}=thunkAPI
 try {
   const {data}=await axiosPrivate.get('/orders/all/?new=true')
   return data  
 }
  catch (error) {
   return rejectWithValue(error) 
 }

})
// take all command user
export const getAllOrders=createAsyncThunk('order/getAllOrders',async(_,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
     try {
       const {data}=await axiosPrivate.get('/orders/all')
       return data  
     }
      catch (error) {
       return rejectWithValue(error) 
     }
    
    })


// take all command user money
export const getAllMoney=createAsyncThunk('order/getAllMoney',async(_,thunkAPI)=>{
    const {rejectWithValue}=thunkAPI
     try {
       const {data}=await axiosPrivate.get('/allMoney')
       console.log('data')
       return data  
     }
      catch (error) {
       return rejectWithValue(error) 
     }
    
    })
    // up date status of command
    export const UpDateOrderStat=createAsyncThunk('order/UpDateOrderStat',async(dataOrd,{getState})=>{
      
        const state=getState()
        const currentData=state.order.OrdersDataAll.find((order)=>order._id===dataOrd.id)
         let newOrder={
            ...currentData,
            delevryStatus:dataOrd.delevryStatus
         }
        try {
         const {data}=await axiosPrivate.put(`/updateOrder/${dataOrd.id}`,newOrder) 
          return data  
        } catch (error) {
            console.log(error)
        }

    })




const initialState={
    orderData:[],
    orderError:'',
    orderStatus:'',
    percentage:0,


    orderMoneyData:[],
    orderMoneyError:'',
    orderMoneyStatus:'',
    percMoney:0,
    

    rechartsData:[],
    rechartError:'',
    rechartStatus:'',
    days:["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],

     
    allOrderData:[],
    allOrderError:'',
    allOrderStatus:'',
    
   
        mydata:0,
        nbrcmd:0,

    moneystatus:'',
    errormoney:'',
    // take alll orders
    OrdersDataAll:[],
    statusOperationOrder:'',

    editStatusOrdeer:'',
   


    

   
}
const orderReduce=createSlice({
 name:'order',
 initialState,
 reducers:{},
 extraReducers:{
    [getStatistique.pending]:(state,action)=>{
      state.orderStatus="loading"
    },


    [getStatistique.fulfilled]:(state,action)=>{
      console.log(action.payload,"eeee")
        const perc=(((action.payload[0]?.total-action.payload[1]?.total)/action.payload[1]?.total)*100)
        return{
          ...state,orderStatus:'success',  orderData:action.payload,
          percentage:action.payload.length>1?perc:100

        }
           
          }
    ,
    [getStatistique.rejected]:(state,action)=>{
        return{
          ...state,orderStatus:'rejected',  orderError:action.payload

        }
           
          },



          [getMoneyOrder.pending]:(state,action)=>{
            state.orderMoneyStatus="loading"
          },
      
      
          [getMoneyOrder.fulfilled]:(state,action)=>{
              const perc=((((action.payload[0]?.total/100)-(action.payload[1]?.total/100))/(action.payload[1]?.total/100))*100)
              return{
                ...state,orderMoneyStatus:'success',  orderMoneyData:action.payload,
                percMoney:perc
      
              }
                 
                }
          ,
          [getMoneyOrder.rejected]:(state,action)=>{
              return{
                ...state,orderMoneyStatus:'rejected',  orderError:action.payload
      
              }
                 
                },











                

          [getRecharts.pending]:(state,action)=>{
            state.rechartStatus="loading"
          },
      
      
          [getRecharts.fulfilled]:(state,action)=>{
            
              return{
                ...state,rechartStatus:'success',rechartsData:action.payload.map((item)=>
                {
                   return{
                       day:state.days[item._id-1],
                       amount:item.total
                   }
                }
             
             
             )
               
      
              }
                 
                }
          ,
          [getRecharts.rejected]:(state,action)=>{
              return{
                ...state,rechartStatus:'rejected', rechartError:action.payload
      
              }
                 
                },


                // take orders 4 command


                       

          [getAllOrder.pending]:(state,action)=>{
            state.allOrderStatus="loading"
          },
      
      
          [getAllOrder.fulfilled]:(state,action)=>{
            
              return{
                ...state,allOrderData:action.payload,
                allOrderStatus:'success'
               
      
              }
                 
                }
          ,
          [getAllOrder.rejected]:(state,action)=>{
              return{
                ...state,allOrderStatus:'rejected', allOrderError:action.payload
      
              }
                 
                },




         // take orders all command


                       

         [getAllOrders.pending]:(state,action)=>{
            state.statusOperationOrder="loading"
          },
      
      
          [getAllOrders.fulfilled]:(state,action)=>{
            
              return{
                ...state,OrdersDataAll:action.payload,
                statusOperationOrder:'success'
               
      
              }
                 
                }
          ,
          [getAllOrders.rejected]:(state,action)=>{
              return{
                ...state,statusOperationOrder:'rejected'
      
              }
                 
                },

















                [getAllMoney.pending]:(state,action)=>{
                    state.moneystatus="loading"
                  },
              
              
                  [getAllMoney.fulfilled]:(state,action)=>{
                     console.log(action.payload)
                       let t=0
                      action.payload.map((item)=>{
                        t+=(item.sales/100)
                        
                      
                      })
                      state.mydata=t
                      state.nbrcmd=action.payload?.length
                       state.moneystatus="succes"
                       
              
                      
                         
                        }
                  ,
                  [getAllMoney.rejected]:(state,action)=>{
                      return{
                        ...state,moneystatus:'rejected', errormoney:action.payload
              
                      }
                         
                        },

            // up date status order
            [UpDateOrderStat.pending]:(state,action)=>{
                return{
                    ...state,editStatusOrdeer:'pending'
                }
            },
            [UpDateOrderStat.fulfilled]:(state,action)=>{
                const updatestatusOrder=state.OrdersDataAll?.map((item)=>
                item._id===action.payload._id?action.payload:item
                )
                return{
                    ...state,editStatusOrdeer:'success',
                    OrdersDataAll:updatestatusOrder

                }
            },
            [UpDateOrderStat.pending]:(state,action)=>{
                return{
                    ...state,editStatusOrdeer:'fieled'
                }
            },
        
        














      
      
       




    
 
 }
})


export default orderReduce.reducer
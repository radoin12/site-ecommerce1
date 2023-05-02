

import { createSlice } from "@reduxjs/toolkit"

import{toast}from 'react-toastify'
 const cardSlice=createSlice({
    name:'card',
    initialState:{
       cardItem:localStorage.getItem('cardItem')?JSON.parse(localStorage.getItem('cardItem')):[],
   
      totalAmount:0,
      quantite:0
    },
    
    reducers:{
       postcard:(state,action)=>{
         const finditem=state.cardItem?.find((item)=>item._id==action.payload._id)
         if (state.cardItem?.indexOf(finditem)!==-1) {
            state.cardItem[state.cardItem.indexOf(finditem)].quantity+=1
           
          
            toast.info(`quantité de ${state.cardItem[state.cardItem.indexOf(finditem)].name} a été augmenté`,{
                position:'top-right'
            })
         }
         else{
            const addproduct={...action.payload,quantity:1}
            state.cardItem.push(addproduct)
            toast.success(`${action.payload.name} a été ajouté dans votre carte`,{
                position:'bottom-left'
            })
         };
         localStorage.setItem('cardItem',JSON.stringify(state.cardItem))
       },
       removeCard:(state,action)=>{
        const newcartItem=state.cardItem?.filter((item)=>item._id!==action.payload)
         const findindexitem=state.cardItem?.findIndex((item)=>item._id===action.payload)
         console.log(findindexitem)
         toast.error(`${state.cardItem[findindexitem]?.name} a été supprimé de votre carte`,{
            position:'bottom-left'
         })
         state.cardItem=newcartItem
         localStorage.setItem('cardItem',JSON.stringify(state.cardItem))
       
       },
       decreaseCard:(state,action)=>{
        const findItemIndex=state.cardItem?.findIndex((item)=>item._id===action.payload._id)
         if (state.cardItem[findItemIndex].quantity>1) {
            state.cardItem[findItemIndex].quantity-=1 
            console.log(state.cardItem[findItemIndex].quantity)
         }
         else if (state.cardItem[findItemIndex].quantity===1) {
             const newcartItem=state.cardItem.filter((item)=>item._id!==action.payload._id)
           
             toast.info(`${action.payload.name } a été supprimé de votre carte`,{
                position:'bottom-left'
             })
             state.cardItem=newcartItem
         }
         localStorage.setItem('cardItem',JSON.stringify(state.cardItem))
       },
       clearallCard:(state)=>{
        state.cardItem=[]
        localStorage.removeItem('cardItem')
        toast.error('votre  commande a été supprimé',{
            position:'top-center'
        })
       },
    //    method 1
//        total:(state,action)=>{
//         let x=0;
//         let y=0;
//         state.cardItem.map((item)=>{
//         y+=item.price*item.quantity
//          x+=item.quantity
//        }
    
//    )  
//    state.totalAmount=y
//    state.quantite=x
//        }
    //    methode2 

     total:(state,action)=>{
  
        const total = Object.values(state.cardItem).reduce((t, {price,quantity}) => t +( price*quantity), 0)
        const totalquantite=Object.values(state.cardItem).reduce((initialQuantite,{quantity})=>
            (initialQuantite+quantity),0)
       state.totalAmount=total
       state.quantite=totalquantite
     }
    
       
    }


})

export const {postcard,removeCard, decreaseCard,clearallCard, total}=cardSlice.actions
export default cardSlice.reducer
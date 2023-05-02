const express =require('express')
const stripeCommand=require('../../model/modelstripe')
const moment=require('moment')
const{IsAdmin}=require('../../midlware/authjsonwebtoken')
const router=express.Router()



// get orders

router.get('/orders/all',IsAdmin,async(req,res)=>{
const querry=req.query.new
try {
 const orders=querry?await stripeCommand.find().sort({_id:-1}).limit(4)
 :await stripeCommand.find().sort({_id:-1})  
 res.json(orders) 
}

catch (error) {
  res.status(500).send(error)  
}





})














// statorders

router.get('/orders', IsAdmin,async(req,res)=>{
   const previousMonth=moment()
   .month(moment().month()-1)
   .set('date',1)
   .format('YYYY-MM-DD HH:mm:ss');
   try {
      
    const user=await stripeCommand.aggregate([
       {
           $match:{createdAt:{$gte:new Date(previousMonth)}}

           
       },
       {
           $project:{mois:{$month:'$createdAt'}}
       },
       {
           $group:{_id:'$mois',total:{$sum:1}}
       },
       {$sort:{_id:-1}}
    ])
 
    res.json(user)
        
     
     
   } catch (error) {
       res.send(error)
   }

})



// statorders7week

router.get('/order/lastWeek',IsAdmin,async(req,res)=>{
    const lastsevenWeek=moment()
    .day(moment().day()-7)
    
    .format('YYYY-MM-DD HH:mm:ss');
    try {
       
     const user=await stripeCommand.aggregate([
        {
            $match:{createdAt:{$gte:new Date(lastsevenWeek)}}
 
            
        },
        {
            $project:{day:{$dayOfWeek:'$createdAt'},sales:'$total'}
        },
        {
            $group:{_id:'$day',total:{$sum:'$sales'}}
        },
        {$sort:{_id:1}}
     ])
  
     res.json(user)
         
      
      
    } catch (error) {
        res.send(error)
    }
 
 })
// up date order command
router.put('/updateOrder/:id',IsAdmin,async(req,res)=>{
    
    const id=req.params.id
  try {
    const updatingCommand=await stripeCommand.findByIdAndUpdate(id,
        
       { $set:req.body}
        
        
        ,{new:true}) 
        res.status(200).send(updatingCommand)
  } catch (error) {
    res.status(402).send(error)
  }


})













module.exports=router
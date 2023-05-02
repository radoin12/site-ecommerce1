const express =require('express')
const stripeCommand=require('../../model/modelstripe')
const moment=require('moment')
const{IsAdmin}=require('../../midlware/authjsonwebtoken')
const router=express.Router()

// stat commanf of money

router.get('/commandMoney', IsAdmin,async(req,res)=>{
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
           $project:{mois:{$month:'$createdAt'},sales:"$total"}
       },
       {
           $group:{_id:'$mois',total:{$sum:'$sales'}}
       },
       {$sort:{_id:-1}}
    ])
 
    res.json(user)
        
     
     
   } catch (error) {
       res.send(error)
   }

})
//  AllMoney
router.get('/allMoney',IsAdmin,async(req,res)=>{
 try {
    const order= await stripeCommand.aggregate([
        {
           $project:{sales:'$total'}
        }
         
        
         ])
          res.send(order)
 } catch (error) {
    res.send(error)
 }
 

})  

module.exports=router

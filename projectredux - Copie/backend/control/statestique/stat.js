 const express =require('express')
 const{ modeluser}=require('../../model/modeluser')
 const moment=require('moment')
 const{authorisation,IsAdmin,isUser}=require('../../midlware/authjsonwebtoken')
 const router=express.Router()

// statusers

router.get('/stat', IsAdmin,async(req,res)=>{
    const previousMonth=moment()
    .month(moment().month()-1)
    .set('date',1)
    .format('YYYY-MM-DD HH:mm:ss');
    try {
       
     const user=await modeluser.aggregate([
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
















 module.exports=router
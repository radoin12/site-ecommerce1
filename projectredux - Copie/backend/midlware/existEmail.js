const{modeluser}= require('../model/modeluser')


const checkexistEmail=async(req,res,next)=>{
 
    
        const user=await modeluser.findOne({email:req.body.email})
        if (user) {
           return  res.status(402).send(' cet email est deja utulisé')
           
          }
      
       
     
        next()
     
  
      
}
module.exports=checkexistEmail
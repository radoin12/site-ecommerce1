
const jwt=require('jsonwebtoken')


require('dotenv').config()



 const authorisation=async(req,res,next)=>{

  

   
    
   
  
    let token=req.header('Authorization')
      
       
          if (token) {
            let auth=token.split(' ')[1]
            jwt.verify(auth,process.env.keyprivate,(err,user)=>{
              if (err) {
                return res.status(401).json('invalid token')
              }
              req.user=user
              next()
            })
          }
          else{
            return res.status(403).json('not regestered yet')
          }
         }
const isUser=(req,res,next)=>{
  authorisation(req,res,()=>{
    if (req.user.isAdmin||req.user._id===req.params.id) {
     next()
    }
    else{
     return res.status(401).send('not authorised!!')
    }
    })
 
}
 const accessEdit=(req,res,next)=>{
  authorisation(req,res,()=>{
    if (req.user.allowEdit&&req.user.isAdmin) {
      next()
    }
    else{
      return res.status(401).send('not authorised!!')
    }
  })

 }
  const IsAdmin=(req,res,next)=>{
     authorisation(req,res,()=>{
     if (req.user.isAdmin) {
      next()
     }
     else{
      return res.status(401).send('not authorised!!')
     }
     })
  }

module.exports={authorisation,IsAdmin,isUser,accessEdit}
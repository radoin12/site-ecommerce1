
const mongoose=require('mongoose')
 const joi=require('joi')
 const jwt=require('jsonwebtoken')
 const{authorisation,IsAdmin,isUser,accessEdit}=require('../midlware/authjsonwebtoken')
 const {validateuser,modeluser,schema,schemaRegester}=require('../model/modeluser')
 const validateLogin=require('../midlware/authValidator')
 const schemaLogin=require('../schema/schemalogin')
 const checkexistEmail=require('../midlware/existEmail')
 const express=require('express')
 require('dotenv').config()

 const bcrypt=require('bcrypt')

 const route=express.Router()
 // refreshToken
 let  refreshTokens=[]
 console.log("taaaaaaaaaaaaaab",refreshTokens)
  route.post('/refreshToken',(req,res)=>{

 
     const refreshTok=req.body.token
     if (!refreshTok) {
       return res.status(403).send('not authenticated') 
     }
     console.log("taaaaaaaaaaaaaabfrefresh",refreshTokens)
     if (!refreshTokens.includes(refreshTok)) {
       return res.status(401).send('invalid token !!') 
     }
     jwt.verify(refreshTok,process.env.refreshToken,(err,user)=>{

       if(err){
        return res.send("vous n'etes pas autorisée")
       }
      
      
       refreshTokens= refreshTokens.filter((token)=>token!==refreshTok)      
          const{_id,image,isAdmin,name,allowEdit}=user
          let newAccesToken=  jwt.sign({_id,image,isAdmin,name,allowEdit},
            process.env.keyprivate,{expiresIn:'10s'})
          let  Newrefreshtoken=jwt.sign({_id,image,isAdmin,name,allowEdit},
            process.env.refreshToken)
          refreshTokens.push(Newrefreshtoken)      
          res.json({accessToken:newAccesToken,refreshToken:Newrefreshtoken})
        })
          })

//  register user
route.post('/registre',validateuser(schemaRegester.blogRegester),checkexistEmail,async(req,res)=>{
    try {
       
   
     
  

      
      
     
        const salt=await bcrypt.genSalt(10)
        const pass=await  bcrypt.hash(req.body.password,salt)
        
      
   

      
     
         
    
        const data= await new modeluser({name:req.body.name,password:pass,confirmPassword:pass,
            
            
                
        email:req.body.email,image:req.body.image,age:req.body.age,addresse:req.body.addresse
        
        })
      
          const accessToken= await data.getToken()
          const refreshToken=await data.generateRefreshToken()
          refreshTokens.push(refreshToken)
        

          res.status(200).json({accessToken,refreshToken})
    } catch (error) {
        res.json(error)
        console.log(error)
    }





})
// get profile user

route.get('/proinfo/:id',isUser,(req,res)=>{
    const id=req.params.id
    try {
      
        modeluser.findById(id).select({password:0,confirmPassword:0})
        .then((user)=>{
            res.send(user)
        })
        .catch((err)=>{
            res.send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
// get all user
route.get('/profiles/all',IsAdmin,(req,res)=>{
 
    try {
      
        modeluser.find().select({password:0,confirmPassword:0})
        .then((user)=>{
            res.send(user)
        })
        .catch((err)=>{
            res.send(err)
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

// up date role admin

   route.put('/addrole/:id',accessEdit,(req,res)=>{
    const id =req.params.id
    try {
        const{isAdmin}=req.body
       modeluser.findByIdAndUpdate(id,req.body,{new:true}).select({password:0,confirmPassword:0}) 
        .then((role)=>{
            res.status(200).send(role)
        })
    } catch (error) {
      res.status(501).send('access is rejected')  
    }

   })

//  up date user
route.put('/update/profile/:id',isUser,validateuser(schema.blogPOST),async(req,res)=>{
  
   
    try {

   
        const id=req.params.id
      const user=await modeluser.findById(id)
        const test=await modeluser.find({}).select({confirmPassword:0,password:0})
        
         const check=test.filter((item)=>item.id!==id)
          
         const useremail=check.find((item)=>item.email===req.body.email)
         if (check.includes(useremail)) {
            return res.status(406).send(' cet email est deja utulisé')
         }
        // if (req.body.password&&req.body.confirmPassword&&user) {
        //     const salt=await bcrypt.genSalt(10)
         
        //     user.password=await  bcrypt.hash(req.body.password,salt)
        // }
    

        modeluser.findByIdAndUpdate(id,
            {
                name:req.body.name,
            
                email:req.body.email,
                image:req.body.image,
                age:req.body.age,
                addresse:req.body.addresse,
                isAdmin:req.body.isAdmin

            }
            
            
            ,{new:true}).select({password:0,confirmPassword:0})
        .then((user)=>{
          
           console.log('user',user)
            
            user.save()
            res.send(user)
        })
        .catch((err)=>{

            res.send(err)

        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// delete user
route.delete('/deleteuser/:id',isUser,(req,res)=>{
 
try {
    const id =req.params.id
    console.log(id)
    modeluser.findByIdAndDelete(id).select({password:0,confirmPassword:0})
    .then((user)=>{
        console.log(user)
        res.status(200).send(user)
    })
    .catch((error)=>{
        res.status(401).send(error)
    })
    
} catch (error) {
    res.status(405).send(error)
}

})


// login user

route.post('/login',validateLogin(schemaLogin.login),async(req,res)=>{
    try {
       const checkExistEmail=await modeluser.findOne({email:req.body.email})
        if (!checkExistEmail) {
           return res.status(405).json('votre email ou mot de passe est  incorrect ')
        }
         const isvalidPassword=await bcrypt.compare(req.body.password,checkExistEmail.password)
         if (!isvalidPassword) {
         return    res.status(406).json('votre email ou mot de passe est  incorrect')
         }
       const accessToken= await checkExistEmail.getToken()
       const refreshToken=await checkExistEmail.generateRefreshToken()
    
       refreshTokens.push(refreshToken)
       console.log(refreshTokens)
       res.status(200).json({accessToken,refreshToken})
    } catch (error) {
       res.send(error)
    }
      
   
   })
 



 module.exports=route
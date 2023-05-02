

const mongoose=require('mongoose')

  const joi=require('joi')
  const jwt=require('jsonwebtoken')
  const complexPassword=require('joi-password-complexity')
  require('dotenv').config()
  console.log("ee")
  const ShemaClient= new mongoose.Schema({
   
      name:{
          type:String,
          required:[true,"n'est pas autorisé à être vide"]
         },
      password:{
          type:String,
          required:[true,"n'est pas autorisé à être vide"],
          trim:true,
          
       
      },
      confirmPassword:{},
      email:{
          type:String,
        
          trim:true,
          index:true
        
          
       
  
      },
      image:{
          type:String,
          required:[true,"n'est pas autorisé à être vide"]
      },
     
    
      age:{
          type:Number,
          required:true
       
      },
      addresse:{
        type:String,
        required:[true,"invalide adresse"]
     
      },
      allowEdit:{
        type:Boolean,
        default:false
      },
     
   
        isAdmin:{
        type:Boolean,
        default:false
    }
    
  
    },{
      timestamps:true
  })

 ShemaClient.methods.getToken=async function(){

 try {
    let token=jwt.sign({_id:this._id,image:this.image,isAdmin: this.isAdmin,name:this.name,allowEdit:this.allowEdit},process.env.keyprivate,{expiresIn:'10s'})
    this.save()
    return token
 }
  catch (error) {
   res.json(error) 
 }
 }
 ShemaClient.methods.generateRefreshToken=async function () {
  let token=jwt.sign({_id:this._id,image:this.image,isAdmin: this.isAdmin,name:this.name,allowEdit:this.allowEdit},
    process.env.refreshToken
    )
    
    return token
  
 }




  const modeluser=mongoose.model('user',ShemaClient)
 
    const schema={
      blogPOST: joi.object().keys({
        _id:joi.required(),
        name:joi.string().min(4).required(),
      password:new complexPassword({
          min: 8,
          max: 255,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4
        }),
        confirmPassword:joi.ref('password'),
       
        email:joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
        image:joi.string().required(),
        age:joi.number().required(),
        addresse:joi.string().required(),
        isAdmin:joi.boolean(),
        allowEdit:joi.boolean(),
        createdAt:joi.required()
      

      })
    }
    
    const schemaRegester={
      blogRegester: joi.object().keys({
      
        name:joi.string().min(4).required(),
      password:new complexPassword({
          min: 8,
          max: 255,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4
        }),
        confirmPassword:joi.ref('password'),
       
        email:joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
        image:joi.string().required(),
        age:joi.number().required(),
        addresse:joi.string().required(),
       
      

      })
    }

     const validateuser = (schema) => { 
      return (req, res, next) => { 
      const { error } = schema.validate(req.body); 
  
      
      if (!error) { 
        next(); 
      } else { 
        const { details } = error; 
        const message = details[0].message;
     
        console.log("error", message); 
       res.status(422).json(message ) } 
      } 
    } 

  

     

    module.exports={validateuser,modeluser,schema,schemaRegester}


  //   createdAt:{
  //     type: Date,
  //     default:()=>Date.now()
  //  },
   
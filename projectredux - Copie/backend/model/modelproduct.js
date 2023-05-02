
const mongoose=require('mongoose')
const schemaBooks=new mongoose.Schema({
    image:{
        type:String,
        required:[true,"choisir la photo du produit"]
           
                
             },
    name:{
        type:String,
        required:[true,"nom  est obligatoire"]
    },
    type:{
        type:String,
        required:[true,'type  est obligatoire']
    },
    description:{
        type:String,
        required:[true,"definition est obligatoire"]
    },
    price:{
        type:Number,
        required:[true,"vous devez taper le prix de produit!!"]
    },
   contry:{
        type:String,
        required:[true,"vous devez taper le nom du pays"]
    },
    created:{
        type:Date,
        required:[true,"date de creation est obligatoire "]
    }
    

      
       
     
})
const modelBooks=mongoose.model('book',schemaBooks)
module.exports=modelBooks
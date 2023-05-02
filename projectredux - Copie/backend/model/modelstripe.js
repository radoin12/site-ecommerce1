const mongoose=require('mongoose')

const schemaStripe=new  mongoose.Schema({
    userId:{
  type:String,
  required:true
    },
    customerId:{
        type:String
    },
    paymentIntendId:{
        type:String
    },
product:[{
   
 
    name:{
        type:String 
    },
    price:{
        type:Number
    },
    quantity:{
        type:String
    },
    type:{
        type:String
    },
    id:{
        type:String
    },
    
}
],

amount_subtotal:{
    type:Number,
    required:true
},
total:{
    type:Number,
    required:true
},
shipping:{
    type:Object,
    required:true
},
delevryStatus:{
   type:String, default:'pending'
},
paymentStatus:{
type:String,
required:true
}



},
{
    timestamps:true
}

)
const stripeCommand=mongoose.model('command',schemaStripe)
module.exports=stripeCommand
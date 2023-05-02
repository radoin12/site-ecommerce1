


const express = require('express')
const bodyParser=require('body-parser')
const router=express.Router()
require('dotenv').config()
const stripeCommand=require('../model/modelstripe')
const{authorisation}=require('../midlware/authjsonwebtoken')
const stripe = require('stripe')('sk_test_51MtGbXLg5Q4Bm4WgzdQkfuvI6u0TJLmJfNMxCJVePMMhv09bz9dVXkFWLtevVhPPqlMbEsYRaXZ0Cmyv3E7xV9bX008w9DRfNT')






 
// affiche recu client
router.get('/recuclient/:id', authorisation,(req,res)=>{
const id=req.params.id
  stripeCommand.findById(id)
  .then((recieve)=>{
    if (req.user.id===recieve.userId||req.user.isAdmin) {
      res.json(recieve)
    }
    else{
      return res.status(501).send("vous n'avez pas l'accée de vois cette commande")
    }
    
  })
  .catch((error)=>{
    res.send(error)
  })

})
// affiche recu client
router.get('/getonecommand/:id', authorisation,(req,res)=>{
  const id=req.params.id
    stripeCommand.find({userId: id})
    .then((recieve)=>{
      if (req.user.id===recieve.userId) {
        res.json(recieve)
      }
      else{
        return res.status(501).send("vous n'avez pas l'accée de vois cette commande")
      }
      
    })
    .catch((error)=>{
      res.send(error)
    })
  
  })

const orderDate=async(customer,data)=>{
 
  
 try {
  const items= JSON.parse(customer.metadata.card)
 const command= await stripeCommand.create({

  userId:customer.metadata.userId,
  customerId:data.customer ,
  paymentIntendId:data.payment_intent,
  product:items,

  amount_subtotal:data.amount_subtotal,
  total:data.amount_total,

  shipping:data.customer_details,
  paymentStatus:data.payment_status,

 })
 // handler consume data from stripe




 } catch (error) {
  
   console.log(error)
 }
 


}


router.post("/create-checkout-session", async(req, res) => {

    try {
    
        const customer=await stripe.customers.create({
       
          metadata:{
            userId:req.body.user,
            card:JSON.stringify(req.body.card)
       
          }
     
         })
        const  line_items=req.body.card.map((item)=>{
            return {
               
                
                      price_data: {
                      
                     
                        currency: 'usd',
                        product_data:{
                            name:item.name,
                       
                          
                            description:item.type,
                            metadata:{
                                id:item.id,
                            },
                        },
                        unit_amount: parseInt(item.price*100),
                     
                      },
                      adjustable_quantity: {enabled: true, minimum: 1, maximum: 10},
                    quantity:item.quantity
                    
                    
                  
                
           
              
            };
        })
        const session = await stripe.checkout.sessions.create({
          
            shipping_options: [
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'usd'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                  },
                },
              },
              {
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 1500, currency: 'usd'},
                  display_name: 'Next day air',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 1},
                    maximum: {unit: 'business_day', value: 1},
                  },
                },
              },
            ],
            phone_number_collection:{
               enabled:true,
            },
            customer:customer.id,
           line_items:line_items,
            mode: 'payment',
            allow_promotion_codes: true,
            success_url:`${process.env.client}/verification?success=true`,
            cancel_url:`${process.env.client}/card?canceled=true`,
          
          })
         
           console.log(session.url,"amaaaan")
          res.send(session.url)
    } catch (error) {
       console.log(error) 
    }
    
  });


  // handle the event






 router.post('/hooks',async(req,res)=>{

  const payload = req.body
  
  const payloadString = JSON.stringify(payload, null, 2);

  
  
  
  let event 


  let endpoint_secret = 'whsec_bb60bf1f2248b2b621d1b5d77dbd0203ba93713e5687b5506ef2e070e0f7ef9f'

  
    const sig = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
     secret: endpoint_secret 
    })

  
    try {
        event = stripe.webhooks.constructEvent(payloadString,sig,endpoint_secret )
        console.log('verified')
        let eventType=event.type
        let data=event.data.object
       
        if (eventType==="checkout.session.completed") {
     
          stripe.customers.retrieve(data.customer)
          .then((client)=>{
         
           orderDate(client,data)
           


           
          
          })
        
          .catch((error)=>{
            console.log("error is ",error.message)
          })
        }
      

    } catch (error) {
        console.log(error.message)
        res.status(400).json({ success: false })
        return;
    }
  
 
      // Do something with mocked signed event


   
     


 
//  *************handle event*************

    res.send().end()

 })
  module.exports=router
 

  
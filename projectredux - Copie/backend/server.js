const express =require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()

const app=express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));
app.use(cors(
  {
    "origin":"*",
   
    "methods":"GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.static('public'));
// midlware route product
const router=require('./control/product')
app.use(router)

// midlware route user
const routerUsers=require('./control/user')
app.use(routerUsers)


// midlware stripe
const routeSripe=require('./control/stripe')
app.use(routeSripe)
// midlware router statistique
const routerStat=require('./control/statestique/stat')
app.use(routerStat)
// midlware router order statistique
const routeOrder=require('./control/statestique/statorder')
app.use(routeOrder)
// midlware router eraning money
const routeOrderMoney=require('./control/statestique/earningMoney')
app.use(routeOrderMoney)

cnxmongo=()=>{
    
      mongoose.connect(process.env.url1 ,{useNewUrlParser: true, useUnifiedTopology: true
    })
      .then(()=>{
        console.log(`cnx mongo db connected`)
        
      })
      .catch((error)=>{
        console.log(error)
    
      })
    }
    cnxmongo()

app.listen(process.env.port,(()=>{
    console.log(`port is connected to ${process.env.port}`)
}))


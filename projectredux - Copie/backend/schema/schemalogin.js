const joi=require('joi')
const complexPassword=require('joi-password-complexity')
const schemaLogin={
    login: joi.object().keys({

     password:new complexPassword({
        min: 8,
        max: 25,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4
      }),
     
     
      email:joi.string().min(8).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','fr'] } }),
  

    })
  }
  module.exports=schemaLogin
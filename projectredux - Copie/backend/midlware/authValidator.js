

const validateLogin = (schema) => { 
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
module.exports=validateLogin
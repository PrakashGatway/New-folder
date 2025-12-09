const Admin = require('./../model/Admin');
const jwt = require('jsonwebtoken')

const signInToken = (user) => {
    return jwt.sign(
      {
        id:user.id,
        name:user.name,
        email:user.email
      },
      process.env.JWT_SECURE,
      {
        expiresIn: "2d",
      }
    );
  };

  exports.isAuth = async (req, res, next) => {
    
    const { authorization } = req.headers;
    // console.log('authorization',authorization)
    try {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECURE);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).send({
        message: err.message,
      });
    }
  };


  exports.createAdmin = async(req,res,next)=>{
    console.log(req.body)
    const admin = await Admin.create(req.body);

    res.status(201).send(admin)

}

 exports.login = async(req,res,next)=>{
    
    try{
           const {email,password}= req.body;
           
           user = await Admin.findOne({email:email});
           if(user&&user.password == password){
                const token = signInToken(user)
                res.status(201).send({
                    message: "user login succesfully",
                    token,
                    user
                });
               
            }else{
                res.status(404).send({
                    message: "user creditional wrong",
                });
            }
    }catch(error){
        res.status(404).send({
            message: error.message
        });
    }

}


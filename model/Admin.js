const  mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plese provide name"]
    },
    email:{
        type:String,
        required:[true,"plese provide email"],
    },
    password:{
        type:String,
        required:[true,'plese provide password']
    }
},
  
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;
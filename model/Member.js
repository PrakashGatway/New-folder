const  mongoose = require('mongoose');


const memberSchema = new mongoose.Schema({
    image:{
        type:String
    }, 
    name:{
        type:String
    }, 
    content:{
        type:String
    }  
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Member = mongoose.model('Member',memberSchema);

module.exports = Member;
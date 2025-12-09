const  mongoose = require('mongoose');


const formSchema = new mongoose.Schema({
    name:{
        type:String
    },
    lastName:{
        type:String
    },
     
    email:{
        type:String
    },
    mobileNo:{
        type:String
    },
    city:{
        type:String
    },
    whatsappNo:{
        type:String
    },
    age:{
        type:Number
    },
    occupation:{
        type:String
    },
    adress:{
        type:String
    },
    howDidyouKnow:{
        type:String
    },
    qualification:{
        type:String
    },
    studyDestination:{
        type:String
    },
    eduInterest:{
        type:String
    },
    intakeYear:{
        type:String
    },
    message:{
        type:String
    },
    file:{
        type:String
    },
    type:{
        type:String,
        default:'contact',
        enum:['contact','resume','register','partner']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Form = mongoose.model('Form',formSchema);

module.exports = Form;
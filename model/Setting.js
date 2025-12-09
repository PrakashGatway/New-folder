const  mongoose = require('mongoose');


const settingSchema = new mongoose.Schema({
    logo:{
        type:String
    }, 
    contectOne:{
        type:String
    }, 
    contectTwo:{
        type:String
    }, 
    contectThree:{
        type:String
    },
    email:{
        type:String
    }, 
    facebook:{
        type:String
    }, 
    instagram:{
        type:String
    }, 
    linkdin:{
        type:String
    },
    tweeter:{
        type:String
    },
    googlePlus:{
        type:String
    },
    pintrest:{
        type:String
    },
    youtube:{
        type:String
    },
    adressOne:{
        type:String,
    },
    adressTwo:{
        type:String,
    },
    officeAdress:{
        type:String,
    }
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Setting = mongoose.model('Setting',settingSchema);

module.exports = Setting;
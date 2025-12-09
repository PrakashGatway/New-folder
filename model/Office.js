const  mongoose = require('mongoose');


const officeSchema = new mongoose.Schema({
    OfficeLogo:{
        type:String
    },
    officeName:{
        type:String
    }, 
    officeAdress:{
        type:String
    }, 
    officeCity:{
        type:String
    },
    officeContact:{
        type:String
    },
    officeMapLink:{
        type:String
    },
    officeEmail:{
        type:String
    },
    officeType:{
        type:String,
        default:'National',
        enum:['National','InterNational']
    }
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Office = mongoose.model('Office',officeSchema);

module.exports = Office;
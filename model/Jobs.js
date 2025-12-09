const  mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobTitle:{
        type:String
    },
    jobShortDescription:{
        type:String
    },
    jobDescription:{
        type:String
    },
    vacancy:{
        type:Number
    },
    location:{
        type:String
    },
    jobType:{
        type:String
    },
    jobExp:{
        type:Number
    },
    jobLevel:{
        type:String
    },
    Status:{
        type:Boolean,
        default:true
    },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Jobs = mongoose.model('Jobs',jobSchema);

module.exports = Jobs;
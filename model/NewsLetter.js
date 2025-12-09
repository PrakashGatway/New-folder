const  mongoose = require('mongoose');


const newsSchema = new mongoose.Schema({
    email:{
        type:String
    }, 
    createdAt:{
        type: Date,
        default: Date.now()
    }, 
    Subscribed:{
        type:String,
        default:'Yes',
        enum:['Yes','No']
    }  
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const News = mongoose.model('News',newsSchema);

module.exports = News;
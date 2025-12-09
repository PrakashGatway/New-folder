const  mongoose = require('mongoose');


const FaqSchema = new mongoose.Schema({
   
    title:{
        type:String
    }, 
    content:{
        type:String
    },
    category:{
        type:String,
        default:"About"
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Faq = mongoose.model('Faq',FaqSchema);

module.exports = Faq;
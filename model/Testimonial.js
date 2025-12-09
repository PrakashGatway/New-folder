const  mongoose = require('mongoose');


const testimonialSchema = new mongoose.Schema({
    image:{
        type:String
    }, 
    name:{
        type:String
    }, 
    content:{
        type:String
    }, 
    rating:{
        type:Number
    }, 
    status:{
        type:Boolean
    }, 
    type:{
        type:String
    },
    univercity:{
        type:String
    }, 
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Testimonial = mongoose.model('Testimonial',testimonialSchema);

module.exports = Testimonial;
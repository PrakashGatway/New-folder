const  mongoose = require('mongoose');


const homeSliderSchema = new mongoose.Schema({
    page:{
        type:String,
        required:[true,'Page is required'],
    }, 
    image:{
        type:String,
        required:[true,'image is required'],
    },
    heading:{
        type:String,
    },
    description:{
        type:String,
    },
    buttonLink:{
        type:String,
    },
    Status:{
        type:Boolean,
        default:true
    },
    type:{
        type:String,
        default:'slider',
        enum:['slider','banner']

    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const HomeSlider = mongoose.model('HomeSlider',homeSliderSchema);

module.exports = HomeSlider;
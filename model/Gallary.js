const  mongoose = require('mongoose');


const galarySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'plese provide title']
    },
    mediaLink:{
        type:String
    },
    catogary:{
        type:String,
        enum:['image','video','page','slider']
    },
    position:{
        type:Number
    },
    Status:{
        type:Boolean,
        default:true
    },
    page:{
        type:String
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Gallery = mongoose.model('Gallery',galarySchema);

module.exports = Gallery;
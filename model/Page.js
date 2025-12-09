const  mongoose = require('mongoose');


const pageSchema = new mongoose.Schema({
    pageName:{
        type:String,
        required:[true,'Page Name is required'],
    }, 
    pageTitle:{
        type:String,
        required:[true,'Page is required'],
    }, 
    image:{
        type:String,
    },
    image2:{
        type:String,
    },
    image3:{
        type:String,
    },
    image4:{
        type:String,
    },
    textFild:{
        type:String,
    },
    textFild2:{
        type:String,
    },
    whatIsOn:{
        one:{
            type:String
        },
        two:{
            type:String
        },
        three:{
            type:String
        },
        four:{
            type:String
        }
    },
    whyChoose:{
        one:{
            type:String
        },
        two:{
            type:String
        },
        three:{
            type:String
        },
        four:{
            type:String
        },
        five:{
            type:String
        },
        six:{
            type:String
        }
    },
    description:{
        type:String,
    },
    htmlSnipit:{
        type:String,
    },
    Status:{
        type:Boolean,
        default:true
    },
    experience:{
        type:Number,
    },
    students:{
        type:Number,
    },
    interNationalOfc:{
        type:Number,
    },
    nationalOfc:{
        type:Number,
    },
    acceptedCountrie:{
        type:Number,
    },
    type:{
        type:String,
        default:'page',
        enum:['page','course']
    }
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Page = mongoose.model('Page',pageSchema);

module.exports = Page;
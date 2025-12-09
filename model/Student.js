const  mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    image:{
        type:String
    }, 
    name:{
        type:String
    }, 
    content:{
        type:String
    }, 
    rank:{
        type:Number
    }, 
    courseName:{
        type:String
    }, 
    univercity:{
        type:String
    }, 
    type:{
        type:String,
        default:'slider',
        enum:['home','slider']
    }
   
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);



const Student = mongoose.model('Student',studentSchema);

module.exports = Student;
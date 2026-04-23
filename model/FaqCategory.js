const mongoose = require("mongoose")

const faqCategorySchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        unique : true
    },
    
},{
timestamps : true})


const FaqCategory = mongoose.model("FaqCategory",faqCategorySchema);

module.exports = FaqCategory;

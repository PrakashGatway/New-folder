const mongoose = require('mongoose');


const homePageSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, 'Title is required'],
    },
    MetaTitle: {
        type: String,
        required: [true, 'Title is required'],
    },
    Description: {
        type: String,
        required: [true, 'Description is required'],
    },
    SubTitle: {
        type: String,
    },
    image: {
        type: String,
    },
    keyword: {
        type: String,
    },
    descriptions: {
        type: String,
    },
    createdBy: {
        type: String,
        require: true
    }

},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);



const HomePage = mongoose.model('HomePage', homePageSchema);

module.exports = HomePage;
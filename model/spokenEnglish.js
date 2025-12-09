const mongoose = require('mongoose');


const spokenEnglish = new mongoose.Schema({
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
    WhyChoose: [{
        title: { type: String, max: 100, required: [true, "Title is required"] },
        content: { type: String, max: 500, required: [true, "content is required"] },
        iconImage: { type: String, required: [true, "Icon Image required"] },
    }],
    ComponentsLanguage: [{
        section: { type: String, required: [true, "section required"] },
        content: { type: String, max: 500, required: [true, "content is required"] },
        components: [
            {
                name: { type: String, required: [true, "name required"] },
                description: { type: String, required: [true, "description required"] }
            }
        ]
    }],
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



const SpokenEnglish = mongoose.model('SpokenEnglish', spokenEnglish);

module.exports = SpokenEnglish;
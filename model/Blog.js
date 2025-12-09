const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: [true, 'Page Name is required'],
    },
    blogDescription: {
        type: String,
        required: [true, 'Page is required'],
    },
    image: {
        type: String,
    },
    Slug: {
        type: String,
    },
    keyword: {
        type: String,
    },
    descriptions: {
        type: String,
    },
    htmlSnipit: {
        type: String,
    },
    Status: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        default: "Education"
    },
    createdBy: {
        type: String,
        default: "Admin"
    },
    review: [
        {
            name: String,
            email: String,
            comment: String,
            status: {
                type: Boolean,
                default: false
            }
        }
    ]

},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);



const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
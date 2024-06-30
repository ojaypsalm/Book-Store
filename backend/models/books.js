const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publishedYear: {
        type: Number,
        require
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    imageUrl: {
        type: String,
        required: false //set to false if the image is optional
    }

},
{
    timestamps: true
}

);
const Book = mongoose.model('Cat', bookSchema);
module.exports = Book;
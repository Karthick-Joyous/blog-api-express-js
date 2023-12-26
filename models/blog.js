const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', dataSchema)
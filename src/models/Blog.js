const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        type: mongoose.Schema.Types.ObjectId, ref: 'Comment',
    }],
    description: [{
        type: String,
        requires: true
    }],

})

module.exports = mongoose.model("Blog", blogSchema);

const mongoose = require('mongoose');

const peopleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        role: {
            type: String,
            anum: ['admin', 'user'],
            default: 'user',
        },
    },
    {
        timestamps: true,
    }
);

const People = mongoose.model('People', peopleSchema);

module.exports = People;

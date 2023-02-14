const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const channelSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15,
    unique: true
    },
    messages: [
        {   username: {
                type: String,
                required:true
            },
            messaage: {
                type: String,
                required:true
            },
            user: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Message' 
            }
        }],
    });
const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel
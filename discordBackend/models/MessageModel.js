const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const messageSchema = new mongoose.Schema({
    content: {
    type: String,
    required: true
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
    });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message
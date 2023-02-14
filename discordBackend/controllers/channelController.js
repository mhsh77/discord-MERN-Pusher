const Channel = require('../models/ChannelModel');
const User = require('../models/UserModel');
const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utilites/jwtTokens');

const crypto = require('crypto');
const Message = require('../models/MessageModel');
const Pusher = require("pusher");


    
exports.getallchannels = catchAsyncErrors(async (req, res, next) => {
    const ChannelCount = await Channel.countDocuments();

    const channels =await Channel.find()
    
    
    res.status(200).json({
        success:true,
        ChannelCount,
        channels
    })   
})
exports.newchannel = catchAsyncErrors(async (req, res, next) => {
    

    
    console.log(req.body.name);
    const channel = await Channel.create({"name":req.body.name})
    console.log(channel);
    res.status(201).json({
        success:true,
        channel
    })
        
          pusher.trigger("channel", "newchannel", {
            "message":channel
          });
     
})
exports.singlechat = catchAsyncErrors(async (req, res, next) => {
    

    
    
    const channel = await Message.findById(req.params.id)
    const senderId = channel.sender
    const sender = await User.findById(senderId)
    const content = channel.content
    res.status(201).json({
        success:true,
        channel:{
            "sender":sender.username,
            "content":content
        }
    }) 
})
exports.channelchats = catchAsyncErrors(async (req, res, next) => {
    
    
    const channel = await Channel.findById(req.params.id)
    //console.log(channel);
    res.status(201).json({
        success:true,
        "messages":channel.messages
    }) 
})
const pusher = new Pusher({
    appId: "1553293",
    key: "bc335b0566864758a822",
    secret: "f3d8775095f4e139f8d3",
    cluster: "ap2"
  });
  
exports.newmessage = catchAsyncErrors(async (req,res,next)=>{
    const {content,channel} = req.body;
    sender = req.user.id
    if(!content  || !channel){
        return next(new ErrorHandler('Please enter content and channel',400))
    }


    var user = await User.findById(sender)
    var channeL= await Channel.findById(channel)

    if(!user || !channeL){
        return next(new ErrorHandler('User or channel dosent exist!',401))

    }else{
        var message ={"username":user.username,"messaage":content,"user":user._id}
        channeL.messages.push(message)
        channeL.save()
        console.log(message);
        
          pusher.trigger("message", "newmessage", {
            "message":message
          });
        
    }
    
    res.status(200).json({
        success:true,
        channeL
    })
})
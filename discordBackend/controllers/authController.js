const User = require('../models/UserModel')
const ErrorHandler = require('../utilites/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utilites/jwtTokens');

const crypto = require('crypto');

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const {username,email,password} = req.body;
   // console.log(req.body);
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }


    var user = await User.findOne({
        email,
    }).select('+password')
    if(user){
        return next(new ErrorHandler('User already exist with same email',401))

    }else{
        user = await User.create({
            username,
            email,
            password
        })
    }
    
    sendToken(user,200,res)
}) 


exports.loginUser = catchAsyncErrors( async (req,res,next) => {
    //console.log(req)
    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }


    const user = await User.findOne({
        email,
    }).select('+password')
    if(!user){
        return next(new ErrorHandler('User not found',401))

    }
    //check if password is correct or not
    const isPasswordCorrect = await user.compareUserPassword(password);
    if(!isPasswordCorrect){
        return next(new ErrorHandler('Incorrect password',401))

    }
    sendToken(user,200,res)

})
exports.logOut = catchAsyncErrors( async (req, res, next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true,

    })
    res.status(200).json({
        success:true,
        message:'Logged out successfully'

    })
})
exports.forgetPassword = catchAsyncErrors( async (req, res, next) => {
    const user = await User.findOne({email:req.body.email});
    
    if(!user){
        return next(new ErrorHandler('User not found with this email',404));
    
    }
    // Get reset Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false})

    const resetUrl = `${req.protocol}://localhost:3000/resetpass/${resetToken}`
    const message = `your message reset token is as follow:\n\n${resetUrl}\n\n if you have not requested this email,then ignore it.`
    console.log(resetUrl);
    try {
        res.status(200).json({
            success:true,
            message:`Email sent to: ${user.email}`,
            msg:message
        })
    } catch (error) {
        //user.resetPasswordToken = undefined
        //user.resetPasswordTokenExpires = undefined
        //await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error,message,500))
    }
})
exports.resetPass = catchAsyncErrors( async (req, res, next) => {
   //
    
    const resetPasswordToken =crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log('resetPasswordToken', resetPasswordToken)
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpires:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('Password reset token is invalid or has been expired',400))

    }
    if (req.body.password !== req.body.confirmPassword){
        return next( new ErrorHandler('Password dosent match',400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordTokenExpires = undefined

    await user.save();

    sendToken(user,200,res)
})
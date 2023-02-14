require('dotenv').config()
const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errors');
const catchAsyncErrors = require('./middlewares/catchAsyncErrors');
const cors = require('cors');
const { registerUser, loginUser, logOut, forgetPassword, resetPass } = require('./controllers/authController');
const { getallchannels, newchannel, channelchats, newmessage, singlechat } = require('./controllers/channelController');
const { isAuthenticatedUser } = require('./middlewares/auth');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
//console.log(process.env.JWT_SECRET);
const mongoURI = 'mongodb://localhost:27017/discord';

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true
});
mongoose.connection.once('open',()=>{
  // const changeStream = mongoose.connection.collection('channels').watch()
  // changeStream.on('change',(change)=>{
  //   if(change.operationType==='insert'){
  //     pusher.trigger('channels','newchannel',{
  //       'change':change
  //     })
  //   }
  //   if(change.operationType==='update'){
  //     pusher.trigger('conversation','newchannel',{
  //       'change':change
  //     })
  //   } else {
  //     console.log('Error triggering Pusher');
  //   }
  // })
})
//import routes
//user
app.route('/api/register').post(registerUser)
app.route('/api/login').post(loginUser)
app.route('/api/logout').get(logOut)
app.route('/api/forgotpass').post(forgetPassword)
app.route('/password/reset/:token').put(resetPass)
//messaging part
app.route('/api/channels').get(getallchannels)
app.route('/api/newchannel').post(newchannel)
app.route('/api/channel/:id').get(channelchats)
app.route('/api/newmessage').post(isAuthenticatedUser,newmessage)
app.route('/api/chat/:id').get(isAuthenticatedUser,singlechat)
app.get('*',async (req,res,next) => {
    res.status(404).json({
        success:false,
        errMessage:"Route not found"
    })
})

app.use(errorHandler);
app.use(catchAsyncErrors);
const server= app.listen(process.env.PORT,()=>{
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
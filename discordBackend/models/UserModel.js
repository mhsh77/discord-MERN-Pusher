const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const bycrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
//Encrypting password before saving
userSchema.pre('save',async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bycrypt.hash(this.password,10)
})
userSchema.methods.compareUserPassword = async function (enteredpassword) {
    return await bycrypt.compare(enteredpassword, this.password)

}
// Return JWT token
userSchema.methods.getJwtToken = function (){
	console.log('gwttoken');
	
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: Number(process.env.COOKIE_EXPIRES_TIME) * 30 * 60 * 1000

    })
}
userSchema.methods.getResetPasswordToken = function (){
    //generate token
    const resetToken = crypto.randomBytes(5).toString('hex')
    console.log('reset token is: ',resetToken)
    // Hash and set resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log('hashed reset token is: ',this.resetPasswordToken)
    // set token expire Time
    this.resetPasswordTokenExpires = Date.now() + 30 * 60 * 1000
    return resetToken
}



const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports =User,{validate}
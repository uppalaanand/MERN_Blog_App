import Express from 'express'
import { authenticate } from '../services/authService.js';
import { UserTypeModel } from '../models/UserModel.js';
import bcrypt from 'bcrypt'
import { verifyToken } from '../middleware/verifyToken.js';

export const commonRoute = Express.Router();

//login
commonRoute.post('/login', async (req, res) => {
    //get user Credintial object
    let userCred = req.body;
    //authenticate user
    let { token, user } = await authenticate(userCred);
    //save the token in httpOnly
    res.cookie("token", token, {
        httpOnly : true,
        sameSite : 'lax',
        secure : false
    });
    //send res
    res.status(200).json({message : "Login Success", payload : user});
});

//logout
commonRoute.get('/logout', async (req, res) => {
    //Clear the cookie named 'token
    res.clearCookie('token', {
        httpOnly : true,
        secure : false,
        sameSite : 'lax'
    })
    res.status(200).json({message : "logged out successfully"});
});

//update the password if the user knows the previous password
commonRoute.put('/change-password', verifyToken, async (req, res) => {
    //get currentpassword and new password
    const { email, currentPassword, newPassword } = req.body;
    let user = await UserTypeModel.findOne({ email });
    if(!user) {
        return res.status(401).json({message : "User not found"});
    }
    //check the current password is correct or not
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if(!isMatch) {
        const err = new Error("Invalid password");
        err.status = 401;
        throw err;
    }
    //replace current password with new password
    let createdNewPassword = await bcrypt.hash(newPassword, 10);
    let updated = await UserTypeModel.findOneAndUpdate({ email }, {$set : {"password" : createdNewPassword}}, { new : true });
    //convert document to object to remove password
    const newUserObj = updated.toObject();
    //remove password
    delete newUserObj.password;
    //return user obj without password
    res.status(200).json({message : "Password Updated Successfully", payload : newUserObj});
    //send res
})
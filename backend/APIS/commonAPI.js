import Express from 'express'
import { authenticate } from '../services/authService.js';

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
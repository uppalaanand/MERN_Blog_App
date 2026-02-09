import Express from 'express'
import { authenticate, register } from '../services/authService.js';

export const userRoute = Express.Router();


//Register user
userRoute.post('/users', async (req, res) => {
    //get the user object from body
    const userObj = req.body;
    //call register
    const newUserObj = await register({...userObj, role : "USER"});
    //send res
    res.status(201).json({message : "User Created", payload : newUserObj});
});
//Authenticate user
userRoute.post('/authenticate', async (req, res) => {
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
//read all articles
//comment on articles
import Express from 'express'
import { UserTypeModel } from '../models/UserModel.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const adminRoute = Express.Router();


//Read all articles
adminRoute.get('/articles', verifyToken, async (req, res) => {
    //get all articles
    let articles = await UserTypeModel.find();
    res.status(200).json({message : "All Articles", payload : articles});
});

//Block user roles
adminRoute.put('/block-user/:userId', verifyToken, async (req, res) => {
    //get user id
    let userId = req.params.userId;
    //verify that user exist
    let user = await UserTypeModel.findById(userId);
    if(!user) {
        res.status(404).json({message : "User Not Found"});
    }
    let updated = "";
    if(user.isActive == true) {
    //block the user isActive = false
        updated = await UserTypeModel.findByIdAndUpdate(userId, {$set : {"isActive" : false}}, { new : true });
    }else {
        return res.status(400).json({message : "User Blocked Already", payload : user});
    }
    //send res
    res.status(200).json({message : "Blocked user"});
});

//Unblock  user roles
adminRoute.put('/unblock-user/:userId', verifyToken, async (req, res) => {
    //get user id
    let userId = req.params.userId;
    //verify that user exist
    let user = await UserTypeModel.findById(userId);
    if(!user) {
        res.status(404).json({message : "User Not Found"});
    }
    let updated = "";
    if(user.isActive == false) {
    //block the user isActive = true
        updated = await UserTypeModel.findByIdAndUpdate(userId, {$set : {"isActive" : true}}, { new : true });
    }else {
        return res.status(400).json({message : "User Blocked Already", payload : user});
    }
    //send res
    res.status(200).json({message : "UnBlocked user Successfully", payload : updated});
});

import Express from 'express'
import { authenticate, register } from '../services/authService.js';
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';

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

//read all articles
userRoute.get('/articles', async (req, res) => {
    //get all articles
    let articles = await UserTypeModel.find();
    res.status(200).json({message : "All Articles", payload : articles});
});

//comment on articles
userRoute.post('/comments', async (req, res) => {
    const {articleId, user, comment} = req.body;
    let article = await ArticleModel.findById(articleId);
    if(!article) {
        res.status(404).json({message : "Article Not Found"});
    }
    let updated = await ArticleModel.findByIdAndUpdate(articleId, {$push : {"comments": {comment, user}}}, { new : true });
    res.status(200).json({message : "Comment added", payload : updated});
})
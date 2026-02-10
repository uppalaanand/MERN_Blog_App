import Express from 'express'
import { register } from '../services/authService.js';
import { authenticate } from '../services/authService.js';
// import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { checkAuthor } from '../middleware/checkAuthor.js';
import { UserTypeModel } from '../models/UserModel.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const authorRoute = Express.Router();


//Register author(public)
authorRoute.post('/users', async (req, res) => {
    //get the user object from body
    const userObj = req.body;
    //call register
    const newUserObj = await register({...userObj, role : "AUTHOR"});
    //send res
    res.status(201).json({message : "User Created", payload : newUserObj});
});


//Create article(protected)
authorRoute.post('/articles', verifyToken, checkAuthor, async (req, res) => {
    //get articles from req
    let article = req.body;
    //check for the author
    // let author = await UserTypeModel.findOne({_id : article.author });
    // if(!author || author.role !== 'AUTHOR') {
    //     res.status(400).json({message : "Invalid Author", payload : article});
    // };
    //create article document
    let newArticleDoc = new ArticleModel(article);
    //save
    let createdArticleDoc = await newArticleDoc.save();
    res.status(201).json({message : "Article Created", payload : createdArticleDoc});
});

//Read article of author(protected)
authorRoute.get('/articles/:authorId', verifyToken, checkAuthor, async (req, res) => {
    //get auth id
    let authorId = req.params.authorId;
    //check for the author
    // let author = await UserTypeModel.findById(authorId);
    // if(!author || author.role !== 'AUTHOR') {
    //     res.status(400).json({message : "Invalid Author"});
    // };
    //read articles by this author
    let articles = await ArticleModel.find({ author : authorId, isArticleActive : true }).populate("author")
    //send res
    res.status(200).json({message : "All the Articles", payload : articles});
});

//edit article(protected)
authorRoute.put('/articles', verifyToken, checkAuthor, async (req, res) => {
    //get modified article from req
    let {title, category, articleId, content, author } = req.body;
    //find the article
    let article = await ArticleModel.findOne({ _id : articleId, author });
    if(!article) {
        res.status(404).json({message : "Article not found"});
    }
    // update the article
    let updatedArticle = await ArticleModel.findByIdAndUpdate(articleId, {$set : { title, category, content }}, { new : true });
    //send res
    res.status(200).json({message : "Article Updated", payload : updatedArticle});
});

//delete {soft delete} article(protected)
authorRoute.delete('/articles/:articleId', verifyToken, checkAuthor, async (req, res) => {

});
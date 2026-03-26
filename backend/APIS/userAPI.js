import Express from 'express'
import { authenticate, register } from '../services/authService.js';
import { UserTypeModel } from '../models/UserModel.js';
import { ArticleModel } from '../models/ArticleModel.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { upload } from '../config/multer.js';
import cloudinary from '../config/cloudinary.js';
import { uploadToCloudinary } from '../config/cloudinaryUpload.js';

export const userRoute = Express.Router();


//Register user
// userRoute.post('/users', async (req, res) => {
//     //get the user object from body
//     const userObj = req.body;
//     //call register
//     const newUserObj = await register({...userObj, role : "USER"});
//     //send res
//     res.status(201).json({message : "User Created", payload : newUserObj});
// });
userRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
    let cloudinaryResult;
    try {
        let userObj = req.body;
        //  Step 1: upload image to cloudinary from memoryStorage (if exists)
        if (req.file) {
            cloudinaryResult = await uploadToCloudinary(req.file.buffer);
        }

        // Step 2: call existing register()
        const newUserObj = await register({ ...userObj, role: "USER", profileImageUrl: cloudinaryResult?.secure_url});
        //send response
        res.status(201).json({ message: "user created", payload: newUserObj});
    } catch (err) {
        // Step 3: rollback 
        if (cloudinaryResult?.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
        }
        next(err); // send to your error middleware
    }
});

//read all articles
userRoute.get('/articles', verifyToken("USER"), async (req, res) => {
    //get all articles
    let articles = await ArticleModel.find({isArticleActive : true}).populate("author");
    res.status(200).json({message : "All Articles", payload : articles});
});

//comment on articles
userRoute.post('/comments', verifyToken("USER"), async (req, res) => {
    const {articleId, user, comment} = req.body;
    console.log(req.user);
    //Check user(req.user)
    // if(user !== req.user.userId) {
    //     return res.status(403).json({message : "Forbidden"});
    // }
    let article = await ArticleModel.findById(articleId);
    if(!article) {
        res.status(404).json({message : "Article Not Found"});
    }
    let updated = await ArticleModel.findByIdAndUpdate(articleId, {$push : {"comments": {comment, user}}}, { new : true, runValidators:true });
    res.status(200).json({message : "Comment added", payload : updated});
});
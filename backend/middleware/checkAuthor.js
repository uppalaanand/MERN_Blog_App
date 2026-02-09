import { UserTypeModel } from "../models/UserModel.js";

export const checkAuthor = async (next, req, res, err) => {
    //get author id
    let authorId = req.body?.author || req.params?.authorId;
    //verify author
    let author = await UserTypeModel.findById(authorId);
    if(!author) {
        res.status(400).json({message : "Invalid Author"});
    };
    //if author found role is different
    if(author.role !== 'AUTHOR') {
        return res.status(203).json({message : "User is not an author"})
    }
    //if author is blocked
    if(!author.isActive) {
        return res.status(403).json({message : "Author account is not active"});
    }
    //forward req to next
    next();
};
import { Schema, model } from 'mongoose'

//Create user comment Scema
const userCommentSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    comment : {
        type : String
    }
});

//Create article Schema
const articleSchema = new Schema({
    author : {
        type : Schema.Types.ObjectId,
        ref : 'user',
        required : [true, "Author Id is required"]
    },
    title : {
        type : String,
        required : [true, "title is required"]
    },
    category : {
        type : String,
        required : [true, "category is required"]
    },
    content : {
        type : String,
        required : [true, "content is required"]
    },
    comments : [userCommentSchema],
    isArticleActive : {
        type : Boolean,
        default : true
    }
}, {
    timestamps : true,
    versionKey : false,
    strict : "throw"
});

export const ArticleModel = model('article', articleSchema);
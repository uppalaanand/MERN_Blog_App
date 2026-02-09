import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName : {
        type : String,
        required : [true, "FirstName is Required"]
    },
    lastName : {
        type : String
    },
    email : {
        type : String, 
        required : [true, "Email is Required"],
        unique : [true, "Email already exist"]
    },
    password : {
        type : String,
        required : [true, "Password is requitred"]
    },
    profileImageUrl : {
        type : String,
    },
    role : {
        type : String,
        enum : ["AUTHOR", "USER", "ADMIN"],
        required : [true, "Invalid Role"]
    },
    isActive : {
        type : Boolean,
        default : true
    }
}, { 
    timestamps : true, 
    versionKey : false,
    strict : "throw"
});

export const UserTypeModel = model('user', userSchema);
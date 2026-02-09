import Express from 'express'
import { connect } from 'mongoose';
import { config } from 'dotenv'
import { userRoute } from './APIS/userAPI.js';
import { adminRoute } from './APIS/adminAPI.js';
import { authorRoute } from './APIS/authorAPI.js';
import { checkAuthor } from './middleware/checkAuthor.js';
import cookieParser from 'cookie-parser';

config();

const app = Express();

//add body parser middleware
app.use(Express.json());
app.use(cookieParser());


//connect APIS
app.use('/user-api', userRoute);
app.use('/admin-api', adminRoute);
app.use('/author-api', authorRoute);


//Connect to db
async function connectDB() {
    try {
        await connect(process.env.MONGO_URL);
        console.log("DB Connection Success");

        //Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server is Running on PORT ${process.env.PORT}`);
        })
    }catch(err) {
        console.log("Error in Connection", err);
    }
}
connectDB();

//logout for User, author, and admin
app.post('/logout', (req, res) => {
    //Clear the cookie named 'token
    res.clearCookie('token', {
        httpOnly : true,
        secure : false,
        sameSite : 'lax'
    })
    res.status(200).json({message : "logged out successfully"});
})

//error handling middleware
app.use((err, req, res, next) => {
    console.log("err", err);
    res.json({message: "error", reason : err.message });
})
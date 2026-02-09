import jwt from 'jsonwebtoken';

export const verifyToken = async (next, req, res, err) => {
    //read token fron req
    let token = req.cookies;
    console.log("token:", token);
    // if(!token) {
    //     return res.status(400).json({message : "Unauthorized req, Please Login"});
    // }
    // //verify the validity of the token(decoding)
    // let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // next();
    //forward req to next middleware/route
};
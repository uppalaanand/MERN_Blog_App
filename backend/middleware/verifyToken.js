import jwt from 'jsonwebtoken';

export const verifyToken = (...allowedRoles) => { 
    return async (req, res, next) => {
        try {
            //read token fron req
            let token = req.cookies?.token;
            if(!token) {
                return res.status(400).json({message : "Unauthorized req, Please Login"});
            }
            //verify the validity of the token(decoding)
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            //Check if role is allowed
            if(!allowedRoles.includes(decodedToken.role)) {
                return res.status(403).json({message : "Forbidden, You don't have permission"});
            }

            req.user = decodedToken;
            next();
            //forward req to next middleware/route
        }catch(err) {
            // return res.status(401).json({ message: "Invalid or Expired Token" });
            if(err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session Expired.." });
            }
            if(err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token. Please login" });
            }
        }
    }
};
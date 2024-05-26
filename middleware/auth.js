const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if(req.headers && req.headers.authorization){
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function(err, decoded) {
            if(err){
                req.email = undefined;
                res.status(403).json("Header verification failed");
                next();
            }
            else{
                req.email = decoded.email;
                next();
            }
        });
    }
    else{
        req.email = undefined;
        res.status(401).json("Authorization header not found");
        next();
    }
}
module.exports = verifyToken;
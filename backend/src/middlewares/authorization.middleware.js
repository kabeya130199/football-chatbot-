const { verifyAccessJWT } = require('../helpers/jwt.helper');
const { getJWT, deleteJWT } = require('../helpers/redis.helper');

const userAuthorization = async(req, res, next) => {
    const {authorization} = req.headers;
    
    //1. verify if jwt is valid
    //2. check if jwt is exist in redis
    const decoded = await verifyAccessJWT(authorization);

    if(decoded.email) {
        const userId = await getJWT(authorization);
        console.log(userId)
        if(!userId) {
            return res.status(403).json({message: "Forbidden"});
        }
        req.userId = userId;
        return next();
    }

    deleteJWT(authorization);
         
    return res.status(403).json({message: "Forbidden"});
    
    
}

module.exports = {
    userAuthorization,
}
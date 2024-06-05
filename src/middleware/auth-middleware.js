import authModule from "../modules/auth-module.js";

class AuthMiddleware{

    AuthMiddleware = (req,res,next) =>{
        let authHeader = req.headers.Authorization;
        if(!authHeader){
            res.status(401).send('Missing Token')
        }
        else{
            res.status(200).send('Ok')
        }
        next();
    }
}

export default new AuthMiddleware;
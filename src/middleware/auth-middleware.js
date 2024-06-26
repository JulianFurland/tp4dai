import authModule from "../modules/auth-module.js";

class AuthMiddleware{

    RemoveBearer = (header) => {
        let returnValue = header;
        if (header.startsWith('Bearer ')){
            returnValue = header.slice(7);
        }
        return returnValue;
    }

    VerifAuthTokenMiddleware = async (req, res, next) => {
        let authHeader = req.headers.authorization;
        let response = null; 
        if(!authHeader) {
            response = res.status(401).send('Token Invalido')
        }
        else{
            let payload = await authModule.VerifyAuthToken(RemoveBearer(authHeader));
            if(payload != null){
                req.user = payload;
                next();
            }
            else{
                response = res.status(401).send('Token Invalido');
            }
        }
        return response;
    }
    
} 
export default AuthMiddleware;
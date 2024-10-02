import authModule from "../modules/auth-module.js";

const RemoveBearer = (header) => {
        let returnValue = header;
        if (header.startsWith('Bearer ')){
            returnValue = header.slice(7);
        }
        return returnValue;
};

const VerifAuthTokenMiddleware = async (req, res, next) => {
    try {
        let authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send({code: 'Token Inválido'});
        }

        let token = RemoveBearer(authHeader);
        let payload = await authModule.VerifyAuthToken(token);
        if (payload) {
            req.user = payload;
            next();
        } else {
            return res.status(401).send({code: 'Token Inválido'});
        }
    } catch (err) {
        console.error('Error en el middleware de verificación de token:', err);
        return res.status(500).send('Error en el servidor');
    }
};
export {VerifAuthTokenMiddleware};
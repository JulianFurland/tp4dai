import jwt from 'jsonwebtoken';
const secretKey = 'PolshuCrack';

const ObtainAuthToken = (payload, options) =>{
    return jwt.sign(payload, secretKey, options);
}

const VerifyAuthToken = async (token) =>{
    let payload;
    try {
        payload = await jwt.verify(token, secretKey)
    } catch (error) {
        console.log(error);
    }
    return payload;
}

export default {ObtainAuthToken, VerifyAuthToken};
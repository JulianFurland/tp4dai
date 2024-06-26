import jwt from 'jsonwebtoken';
const secretKey = 'PolshuCrack';
const options = {
    expiresIn: '15m',
    issuer: 'TLT'
}


const ObtainAuthToken = async (payload) =>{
    return await jwt.sign(payload, secretKey, options);
}

const VerifyAuthToken = async (token) =>{
    let payload;
    try {
        payload = await jwt.verify(token, secretKey)
    } catch (error) {
        console.log(error);
        payload = null;
    }
    return payload;
}

export default {ObtainAuthToken, VerifyAuthToken};
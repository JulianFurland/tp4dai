import UserRepository from '../repositories/user-repository.js';
import Helper from '../helpers/helpers.js';
import authModule from '../modules/auth-module.js';

const helper = new Helper();
export default class UserService{
    getUserAsync = async (user, password) => {
        const repo = new UserRepository();
        let returnObj = await repo.getUserAsync(user, password);
        if(returnObj !== undefined) {
            let payload = {
            username: user,
            password: password
            }
            let token = await authModule.ObtainAuthToken(payload)
            returnObj = {
                user: returnObj,
                token: token
            }
        }
        else{
            returnObj = null
        }
        return returnObj;
    }

    insertUserAsync= async (name, lastName, user, password) => {
        const repo = new UserRepository();
        helper.validarVaciosYMenorTresLetras()
        if(name)
        returnBool = await repo.insertUserAsync(name, lastName, user, password);
        return returnBool;
    }


}
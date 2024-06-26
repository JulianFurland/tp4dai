import UserRepository from '../repositories/user-repository.js';
import CommonService from '../services/common-service.js';
import authModule from '../modules/auth-module.js';

export default class UserService{
    getUserAsync = async (user, password) => {
        const repo = new UserRepository();
        let returnObj = await repo.getUserAsync(user, password);
        if(returnObj != null) {
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
        return returnObj;
    }

    getByIDAsync = async (id) => {
        const svc = new CommonService();
        const returnObj = await svc.getByIdAsync(id, table);
        return returnObj;
    }
}
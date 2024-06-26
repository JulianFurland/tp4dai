import UserRepository from '../repositories/user-repository.js';
import CommonService from '../services/common-service.js';
import authModule from '../modules/auth-module.js';

export default class UserService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
        
    }

    getByIDAsync = async (id) => {
        const svc = new CommonService();
        const returnObj = await svc.getByIdAsync(id, table);
        return returnObj;
    }
}
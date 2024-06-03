import CommonRepository from '../repositories/common-repository.js';

export default class CommonService{
    getAllAsync = async () => {
        const repo = new CommonRepository();
        const returnArray = await repo.getAllAsync(table);
        return returnArray;
        
    }

    getByIdAsync = async (id) => {
        const repo = new CommonRepository();
        const returnArray = await repo.getByIdAsync(params);
        return returnArray;
    }
}
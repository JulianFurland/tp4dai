import CommonRepository from '../repositories/common-repository.js';

export default class CommonService{
    getAllAsync = async (table) => {
        const repo = new CommonRepository();
        const returnArray = await repo.getAllAsync(table);
        return returnArray;
        
    }

    getByIdAsync = async (id, table) => {
        let params = {
            id: id,
            table: table
        }
        const repo = new CommonRepository();
        const returnArray = await repo.getByIdAsync(params);
        return returnArray;
    }

    getTenAsync = async (table, offset) =>{
        let params = {
            table: table,
            offset: offset
        }
        const repo = new CommonRepository();
        const returnArray = await repo.getTenAsync(params);
        return returnArray;
    }
}
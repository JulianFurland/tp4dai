import { json } from 'express';
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
        const returnArray = await repo.getByIDAsync(params);
        return returnArray;
    }

    getByIdAndUserAsync = async (id, userID, table) => {
        let params = {
            id: id,
            userID: userID,
            table: table,
        }
        const repo = new CommonRepository();
        const returnArray = await repo.getByIDAndUserAsync(params);
        return returnArray;
    }

    getByUserAsync = async (userID, table) => {
        let params = {
            userID: userID,
            table: table,
        }
        console.log(JSON.stringify(params))
        const repo = new CommonRepository();
        const returnArray = await repo.getByUserAsync(params);
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

    delete = async (id, table) => {
        let params = {
            id: id,
            table: table
        }
        const repo = new CommonRepository();
        const success = await repo.delete(params);
        return success;
    }
}
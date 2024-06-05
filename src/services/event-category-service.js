import EventCategoryRepository from '../repositories/event-category-repository.js';
import CommonService from '../services/common-service.js';

const table = 'Categories'
export default class EventCategoryService{
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
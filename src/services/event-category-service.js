import EventCategoryRepository from '../repositories/event-category-repository.js';

export default class EventCategoryService{
    getAllAsync = async () => {
        const repo = new EventCategoryRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }

    getByIDAsync = async (id) => {
        const repo = new EventCategoryRepository();
        const returnObj = await repo.getByIDAsync(id);
        return returnObj;
    }
}
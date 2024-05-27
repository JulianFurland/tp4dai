import EventCategoryRepository from '../repositories/event-category-repository.js';

export default class EventCategoryService{
    getAllAsync = async () => {
        const repo = new EventCategoryRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }
}
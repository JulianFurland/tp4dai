import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';

export default class EventService{
    getAllAsync = async (page) => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync((page-1)*10);
        const catsvc = new CategoryService();
        returnArray.forEach(async element => {
            let cat = await catsvc.getByIDAsync(element.id_event_category);
            element.category = cat;
            console.log(cat)
        });
        return returnArray;
        
    }
}
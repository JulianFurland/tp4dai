import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';

export default class EventService{
    getAllAsync = async (page) => {
        const repo = new EventRepository();
        const svc = new CommonService();
        const returnArray = await repo.getAllAsync(table);
        return returnArray;
    }
}
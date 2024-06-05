import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';

const table = 'events'
export default class EventService{
    getAllAsync = async (page) => {
        const svc = new CommonService();
        const returnArray = await svc.getTenAsync(table,page*10);
        return returnArray;
    }
}
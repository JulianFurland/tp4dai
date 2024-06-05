import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';

const table = "events"
export default class EventService{
    getTenAsync = async (page) => {
        const svc = new CommonService();
        const returnArray = await svc.getTenAsync(table,page*10);
        return returnArray;
    }
    getByParamsAsync = async (name, category, startDate, tag) => {
        let params = {
            name: name,
            category: category,
            startDate: startDate,
            tag: tag
        }
    }
    
}
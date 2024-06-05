import EventCategoryRepository from '../repositories/event-location-repository.js';
import CommonService from './common-service.js';

const table = "event_locations"
export default class EventLocationService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
        
    }
}
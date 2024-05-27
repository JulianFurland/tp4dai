import EventCategoryRepository from '../repositories/event-location-repository.js';

export default class EventLocationService{
    getAllAsync = async () => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }
}
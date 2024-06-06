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
    searchEventsAsync = async (name, category, startDate, tag) => {
        const repo = new EventRepository()
        const resultados = await repo.searchEventsAsync(name,category,startDate,tag)
        return resultados
    }
    getDetailed = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getDetailed(id);
        return returnArray[0];
    }
    searchParticipants = async (first_name, last_name, username, attendent, rating) => {
        const repo = new EventRepository()
        const resultados = await repo.searchParticipants(first_name,last_name,username,attendent,rating)
        return resultados
    }
}
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
        console.log(resultados);
        const eventosUnicos = {};
        resultados.forEach(fila => {
            const idEvento = fila.id;
            if (!eventosUnicos[idEvento]) {
                eventosUnicos[idEvento] = fila;
            }
        }); 
        return eventosUnicos
    }
    
}
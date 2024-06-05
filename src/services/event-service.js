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
        console.log('resultados' +resultados);
        const eventosUnicos = {};
        // if(resultados != null){
        //     resultados.forEach(event => {
        //         let encontrado = false;
        //         let i = 0;
        //         while(!encontrado){
                    
        //         }
        //     }); 
        // }
        console.log(eventosUnicos)
        return eventosUnicos
    }
    getDetailed = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.getDetailed(id);
        return returnArray;
    }
}
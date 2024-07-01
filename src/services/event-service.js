import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';
import Helper from '../helpers/helpers.js';
import UserService from './user-service.js';

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
    createEvent = async (name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator) => {
        const helper = new Helper();
        const usersvc = new UserService();
        const repo = new EventRepository();
        let returnObj = {
            status: 0,
            message: "",
        }
        if(!helper.validarVaciosYMenorTresLetras(name) || !helper.validarVaciosYMenorTresLetras(description)) {
            returnObj = {
                status: 400,
                message: "El nombre y descripción deben ser de 3 o más caracteres",
            }
        }
        else if(maxAssistance > commonsvc.getByIdAsync(location, 'event_locations').max_capacity){
            returnObj = {
                status: 400,
                message: "La máxima capacidad del evento excede la de la locación",
            }
        }
        else if(price < 0 || duration < 0){
            returnObj = {
                status: 400,
                message: "La duración y precio del evento deben ser mayores o iguales a 0",
            }
        }
        else{
            repo.createEvent(name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator);
            returnObj = {
                status: 200,
                message: "Evento Creado",
            };
        }
        return returnObj;
    }
}
import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';
import Helper from '../helpers/helpers.js';
import UserService from './user-service.js';
import CommonRepository from '../repositories/common-repository.js';
import EventEnrollmentRepository from '../repositories/event-enrollment-repository.js';
import EventEnrollmentService from './event-enrollment-service.js';

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
        const commonsvc = new CommonService();
        const categoryObj = helper.strToInt(category);
        category = categoryObj.intValue;
        const locationObj = helper.strToInt(location);
        location = locationObj.intValue;
        const durationObj = helper.strToInt(duration);
        duration = durationObj.intValue;
        const priceObj = helper.strToInt(price);
        price = priceObj.intValue;
        const maxAssistanceObj = helper.strToInt(maxAssistance);
        maxAssistance = maxAssistanceObj.intValue;
        const intformat = (categoryObj.success&&locationObj.success&&durationObj.success&&priceObj.success&&maxAssistanceObj.success);
        let returnObj = {
            status:500,
            message: "",
        }
        try {

        if(!helper.validarVaciosYMenorTresLetras(name) || !helper.validarVaciosYMenorTresLetras(description)) {
            returnObj = {
                status:400,
                message: "El nombre y descripción deben ser de 3 o más caracteres",
            }
        }
        else if(maxAssistance > commonsvc.getByIdAsync(location, 'event_locations').max_capacity){
            returnObj = {
                status:400,
                message: "La máxima capacidad del evento excede la de la locación",
            }
        }
        else if(price < 0 || duration < 0){
            returnObj = {
                status:400,
                message: "La duración y precio del evento deben ser mayores o iguales a 0",
            }
        }
        else if(!helper.validarFecha(startDate).success){
            returnObj = {
                status:400,
                message: "La fecha es invalida",
            }
        }
        else if(!intformat){
            returnObj = {
                status:400,
                message: "No se respetaron los tipos",
            }
        }
        else{
            if(boolEnrollment === "true"){
                boolEnrollment = 1
            }
            else{
                boolEnrollment = 0
            }
            if(repo.createEvent(name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator)){
                returnObj = {
                    status: 201,
                    message: "Evento Creado",
                };
            }
            else {
                returnObj = {
                    status: 500,
                    message: "Error Interno",
                };
            }
        }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    updateEvent = async (id, name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator) => {
        const helper = new Helper();
        const usersvc = new UserService();
        const repo = new EventRepository();
        const commonsvc = new CommonService();
        const categoryObj = helper.strToInt(category);
        category = categoryObj.intValue;
        const locationObj = helper.strToInt(location);
        location = locationObj.intValue;
        const durationObj = helper.strToInt(duration);
        duration = durationObj.intValue;
        const priceObj = helper.strToInt(price);
        price = priceObj.intValue;
        const maxAssistanceObj = helper.strToInt(maxAssistance);
        maxAssistance = maxAssistanceObj.intValue;
        const intformat = (categoryObj.success&&locationObj.success&&durationObj.success&&priceObj.success&&maxAssistanceObj.success);
        let returnObj = {
            status:500,
            message: "",
        }
        try {
        let idCreatorUser = repo.selectidUserCreatorEvent(id);
        if(idCreatorUser == idCreator){
            returnObj = {
                status:404,
                message: "El evento no existe o no pertenece al usuario",
            }
        }
        else if(!helper.validarVaciosYMenorTresLetras(name) || !helper.validarVaciosYMenorTresLetras(description)) {
            returnObj = {
                status:400,
                message: "El nombre y descripción deben ser de 3 o más caracteres",
            }
        }
        else if(maxAssistance > commonsvc.getByIdAsync(location, 'event_locations').max_capacity){
            returnObj = {
                status:400,
                message: "La máxima capacidad del evento excede la de la locación",
            }
        }
        else if(price < 0 || duration < 0){
            returnObj = {
                status:400,
                message: "La duración y precio del evento deben ser mayores o iguales a 0",
            }
        }
        else if(!helper.validarFecha(startDate).success){
            returnObj = {
                status:400,
                message: "La fecha es invalida",
            }
        }
        else if(!intformat){
            returnObj = {
                status:400,
                message: "No se respetaron los tipos",
            }
        }
        else{
            if(boolEnrollment === "true"){
                boolEnrollment = 1
            }
            else{
                boolEnrollment = 0
            }
            repo.updateEvent(id, name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator);
            returnObj = {
                status:200,
                message: "Evento Actualizado",
            };
        }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    deleteEvent = async (id, idCreator) => {
        const helper = new Helper();
        const commonsvc = new CommonService();
        const enrollmentsvc = new EventEnrollmentService();
        const repo = new EventRepository();
        let returnObj = {
            status:500,
            message: "",
        }
        try {
        let idCreatorUser = await repo.selectidUserCreatorEvent(id);
        let enrollment = await enrollmentsvc.selectEnrollmentEvent(id);
        if(idCreatorUser[0].id_creator_user !== idCreator){
            returnObj = {
                status:404,
                message: "El evento no existe o no pertenece al usuario",
            }
        }
        else if(enrollment[0]){
            returnObj = {
                status:404,
                message: "Hay alguien ya inscripto en el evento",
            }
        }
        else{
            commonsvc.delete(id, "events");
            returnObj = {
                status:200,
                message: "Evento Eliminado",
            }
        }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }
}
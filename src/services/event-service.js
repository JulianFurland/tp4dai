import EventRepository from '../repositories/event-repository.js';
import CategoryService from './event-category-service.js';
import CommonService from './common-service.js';
import Helper from '../helpers/helpers.js';
import UserService from './user-service.js';
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
            repo.deleteEnrollment(id, "events");
            returnObj = {
                status:200,
                message: "enrollment Eliminado",
            }
        }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    createEnrollment = async (id, idUser) => {
        const repo = new EventRepository();
        const helper = new Helper();
        const enrollmentsvc = new EventEnrollmentService();
        const commonsvc = new CommonService();
        let returnObj = {
            status:500,
            message: "",
        }
        let fecha = new Date();
        let evento = (await (commonsvc.getByIdAsync(id, "events")))[0];
        let startDate = evento.start_date;
        let maxAssistance = evento.max_assistance;
        let actualAssistance = (await enrollmentsvc.countEnrollment(id))[0].count;
        let enabled = evento.enabled_for_enrollment;
        try {
            if(!(maxAssistance >= actualAssistance + 1)){
                returnObj = {
                    status:400,
                    message: "el evento ya no tiene espacio",
                }
            }
            else if(!(startDate < fecha)){
                returnObj = {
                    status:400,
                    message: "el evento ya pasó",
                }
            }
            else if(!enabled){
                returnObj = {
                    status:400,
                    message: "el evento no esta habilitado",
                }
            }
            else if(enrollmentsvc.selectEnrollment(id, idUser)){
                returnObj = {
                    status:400,
                    message: "el usuario ya esta registrado",
                }
            }
            else{
                repo.createEnrollment(id, idUser);
                returnObj = {
                    status:201,
                    message: "Enrollment creado",
                }
            }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    deleteEnrollment = async (id, idUser) => {
        const repo = new EventRepository();
        const commonsvc = new CommonService();
        const enrollmentsvc = new EventEnrollmentService();
        let returnObj = {
            status:500,
            message: "",
        }
        let fecha = new Date();
        let idCreatorUser = await enrollmentsvc.selectEnrollment(id, idUser);
        let startDate = (await (commonsvc.getByIdAsync(id, "events")))[0].start_date;
        try {
            if(!(await enrollmentsvc.selectEnrollment(id, idUser))){
                returnObj = {
                    status:400,
                    message: "El usuario no esta registrado en el evento",
                }
            }
            else if(startDate > fecha){
                returnObj = {
                    status:400,
                    message: "el evento ya pasó",
                }
            }
            else{
                repo.deleteEnrollment(id, idUser);
                returnObj = {
                    status:201,
                    message: "Enrollment eliminado",
                }
            }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    rateEvent = async (eventID, rating, observations, userID) => {
        const commonsvc = new CommonService();
        const enrollmentsvc = new EventEnrollmentService();
        const helper = new Helper();
        const repo = new EventRepository();
        let returnObj = {
            status: 500,
            message: "Error Interno",
        }
        const raitingObj = helper.strToInt(rating);
        rating = raitingObj.intValue;
        const fechaHoy = new Date();
        var event = await commonsvc.getByIdAsync(eventID,table);
        var enrollment = await enrollmentsvc.selectEnrollment(eventID,userID);
        if(!enrollment) {
            returnObj = {
                status: 404,
                message: "El usuario no se encuentra registrado al evento",
            }
        }
        else if(event[0].start_date > fechaHoy){
            returnObj = {
                status: 404,
                message: "El evento no comenzó todavía",
            }
        }
        else if(!raitingObj.success || rating > 10 || rating < 1){
            returnObj = {
                status: 404,
                message: "El rating debe ser un entero entre 1 y 10",
            }
        }
        else {
            enrollment = enrollment[0];
            console.log(JSON.stringify(enrollment))
            if(repo.rateEvent(enrollment.id, rating, observations)){
                returnObj = {
                    status: 200,
                    message: "Evento Puntuado",
                }
            }
        }
        return returnObj;
    }
}
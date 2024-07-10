import EventLocationRepository from '../repositories/event-location-repository.js'
import CommonService from './common-service.js';
import Helper from '../helpers/helpers.js';
import LocationService from './location-service.js';

const table = "event_locations"
export default class EventLocationService {
    getAllAsync = async (userID) => {
        const svc = new CommonService();
        const returnArray = await svc.getByUserAsync(userID, table);
        return returnArray;
        
    }

    getByLocationIDandUserID = async (locationID, userID) => {
        const repo = new EventLocationRepository();
        return await repo.getByLocationIDandUserID(locationID, userID);
    }

    createEventLocation = (idLocation, name, fullAddress, maxCapacity, latitude, longitude, id) => {
        const helper = new Helper();
        const repo = new EventLocationRepository();
        const locationsvc = new LocationService();
        const idLocationObj = helper.strToInt(idLocation);
        idLocation = idLocationObj.intValue;
        const maxCapacityObj = helper.strToInt(maxCapacity);
        maxCapacity = maxCapacityObj.intValue;
        const latitudeObj = helper.strToInt(latitude);
        latitude = latitudeObj.intValue;
        const longitudeObj = helper.strToInt(longitude);
        longitude = longitudeObj.intValue;
        const intformat = (idLocationObj.success&&maxCapacityObj.success&&latitudebj.success&&longitudeObj.success);
        let returnObj = {
            status:500,
            message: "",
        }
        try {
        if(!locationsvc.getByIDAsync(idLocation)){
            returnObj = {
                status:404,
                message: "Localización no encontrada",
            }
        }
        if(!helper.validarVaciosYMenorTresLetras(name)||!helper.validarVaciosYMenorTresLetras(fullAddress)) {
            returnObj = {
                status:400,
                message: "El nombre y dirección deben ser de 3 o más caracteres",
            }
        }
        else if(maxCapacity < 0 ){
            returnObj = {
                status:400,
                message: "La capacidad de la localización debe ser mayor o iguales a 0",
            }
        }
        else if(!intformat){
            returnObj = {
                status:400,
                message: "No se respetaron los tipos",
            }
        }
        else{
            // if(repo.createEvent(name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator)){
            //     returnObj = {
            //         status: 201,
            //         message: "Evento Creado",
            //     };
            // }
            // else {
            //     returnObj = {
            //         status: 500,
            //         message: "Error Interno",
            //     };
            // }
        }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }
}
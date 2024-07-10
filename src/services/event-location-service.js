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

    getByEventLocationIDandUserID = async (eventLocationID, userID) => {
        const svc = new CommonService();
        const returnArray = await svc.getByIdAndUserAsync(eventLocationID, userID, table);
        return returnArray;
    }

    createOrUpdateEventLocation = async (idEvent_location, idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser, mode) => {
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
        const intformat = (idLocationObj.success&&maxCapacityObj.success&&latitudeObj.success&&longitudeObj.success);
        let returnObj = {
            status:500,
            message: "Error Interno",
        }
        try {
            if((await locationsvc.getByIDAsync(idLocation)).status === 404){
                returnObj = {
                    status:404,
                    message: "Localización no encontrada",
                }
            }
            else if(!helper.validarVaciosYMenorTresLetras(name)||!helper.validarVaciosYMenorTresLetras(fullAddress)) {
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
                if(mode === "create"){
                    if(repo.createEventLocation(idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser)){
                        returnObj = {
                            status: 201,
                            message: "Localización Creada",
                        };
                    }
                }
                else if (mode === "update"){
                    console.log(await this.getByEventLocationIDandUserID(idEvent_location, idUser)[0])
                    if (!((await this.getByEventLocationIDandUserID(idEvent_location, idUser))[0])){
                        returnObj = {
                            status: 404,
                            message: "Esta localización de evento no existe o no te pertenece",
                        };
                    }
                    else if (repo.updateEventLocation(idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser, idEvent_location)){

                        returnObj = {
                            status: 200,
                            message: "Localización Actualizada",
                        };
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    deleteEventLocation = async (event_locationID, userID) => {
        const commonsvc = new CommonService();
        let returnObj = {
            status:500,
            message: "Error Interno",
        }
        if (!((await this.getByEventLocationIDandUserID(event_locationID, userID))[0])){
            returnObj = {
                status: 404,
                message: "Esta localización de evento no existe o no te pertenece",
            };
        }
        else if(await commonsvc.delete(event_locationID, table)) {
            returnObj = {
                status: 200,
                message: "Localización de evento eliminada",
            };    
        }
        return returnObj;
    }
}
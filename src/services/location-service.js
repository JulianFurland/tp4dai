import LocationRepository from '../repositories/location-repository.js';
import EventLocationService from './event-location-service.js';
import CommonService from './common-service.js';

const table = "locations"
export default class LocationService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
    }

    getByIDAsync = async (id) => {
        const svc = new CommonService();
        let returnObj = {
            status:500,
            data: null,
        };
        const data = await svc.getByIdAsync(id, table);
        if(data == null || data[0] == null){
            returnObj = {
                status:404,
                data: null,
            };
        }
        else {
            returnObj = {
                status: 200,
                data: data,
            };
        }
        return returnObj;
    }

    getEventLocationByIDAsync = async (idLocation, idUser) => {
        let returnObj = {
            status:500,
            data: null,
        };
        if((await this.getByIDAsync(idLocation)).data) {
            const svc = new EventLocationService();
            const data = await svc.getByLocationIDandUserID(idLocation,idUser);
            returnObj = {
                status: 200,
                data: data,
            }
        }
        else {
            returnObj = {
                status: 404,
                data: null,
            }
        }
        return returnObj;
    }
}
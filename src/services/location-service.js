import LocationRepository from '../repositories/location-repository.js';
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
        if(data[0] === undefined){
            returnObj = {
                status:404,
                data: "Not Found",
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
}
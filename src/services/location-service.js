import LocationRepository from '../repositories/location-repository.js';
import CommonService from './common-service.js';

const table = "locations"
export default class LocationService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
    }

    getByProvAsync = async (id) => {
        const repo = new LocationRepository();
        const returnArray = await repo.getByProvAsync(id);
        return returnArray;
    }
}
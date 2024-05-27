import LocationRepository from '../repositories/location-repository.js';

export default class LocationService{
    getAllAsync = async () => {
        const repo = new LocationRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }

    getByProvAsync = async (id) => {
        const repo = new LocationRepository();
        const returnArray = await repo.getByProvAsync(id);
        return returnArray;
    }
}
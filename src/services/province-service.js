import ProvinceRepository from '../repositories/province-repository.js';
import CommonService from './common-service.js';
import LocationService from './location-service.js';

const table = "provinces"
export default class ProvinceService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
    }

    getByIDAsync = async (id) => {
        const svc = new CommonService();
        const returnObj = await svc.getByIdAsync(id);
        return returnObj;
    }

    getLocByIDAsync = async (id) => {
        const svc = new LocationService();
        const returnObj = await svc.getByProvAsync(id);
        return returnObj;
    }

    postProvince = async (province) => {
        const repo = new ProvinceRepository();
        let result = false;
        if(await repo.postProvince(province)){
            result = true;
        }
        return result;
    }

    updateProvince = async (province) => {
        const repo = new ProvinceRepository();
        let result = false;
        if(await repo.updateProvince(province)){
            result = true;
        }
        return result;
    }

    deleteProvince = async (id) => {
        const repo = new ProvinceRepository();
        const returnObj = await repo.deleteProvince(id);
        return returnObj;
    }
}
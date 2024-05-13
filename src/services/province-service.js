import ProvinceRepository from '../repositories/province-repository.js';

export default class ProvinceService{
    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getAllAsync();
        return returnArray;
        
    }

    getByIDAsync = async (id) => {
        const repo = new ProvinceRepository();
        const returnObj = await repo.getByIDAsync(id);
        return returnObj;
    }

    postProvince = async (province) => {
        console.log(province);
        const repo = new ProvinceRepository();
        let result = false;
        console.log(province.name);
        if(await repo.postProvince(province)){
            result = true;
        }
        return result;
    }

}
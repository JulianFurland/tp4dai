import EventCategoryRepository from '../repositories/event-category-repository.js';
import CommonService from '../services/common-service.js';
import Helper from '../helpers/helpers.js';

const table = 'event_categories'
export default class EventCategoryService{
    getAllAsync = async () => {
        const svc = new CommonService();
        const returnArray = await svc.getAllAsync(table);
        return returnArray;
        
    }

    getByIDAsync = async (id) => {
        const svc = new CommonService();
        const data = await svc.getByIdAsync(id, table);
        let returnObj = {
            data: data,
        }
        if(data[0] !== undefined){
            returnObj.status = 200;
        }
        else{
            returnObj.status = 404;
        }
        return returnObj;
    }

    createCategory = async (name, displayOrder) => {
        const helper = new Helper();
        const repo = new EventCategoryRepository();
        let returnObj = {
            status:500,
            message: "",
        };
        const displayOrderObj = helper.strToInt(displayOrder);
        displayOrder = displayOrderObj.intValue;
        try {
            if(!helper.validarVaciosYMenorTresLetras(name)) {
                returnObj = {
                    status:400,
                    message: "El nombre debe ser de 3 o más caracteres",
                }
            }
            else if((!displayOrderObj.success) || displayOrder%10 !== 0){
                returnObj = {
                    status: 400,
                    message: "Display Order inválido. El valor debe ser un múltiplo de 10",
                };
            }
            else {
                if(repo.createCategory(name, displayOrder)){
                    returnObj = {
                        status: 201,
                        message: "Categoria Creado",
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
}
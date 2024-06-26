import UserRepository from '../repositories/user-repository.js';
import Helper from '../helpers/helpers.js';
import authModule from '../modules/auth-module.js';

const helper = new Helper();
export default class UserService{
    getUserAsync = async (user, password) => {
        const repo = new UserRepository();
        let returnObj = await repo.getUserAsync(user, password);
        if(returnObj !== undefined) {
            let payload = {
            username: user,
            password: password
            }
            let token = await authModule.ObtainAuthToken(payload)
            returnObj = {
                user: returnObj,
                token: token
            }
        }
        else{
            returnObj = null
        }
        return returnObj;
    }

    insertUserAsync= async (name, lastName, user, password) => {
        const repo = new UserRepository();
        let returnObj = {
            status: null,
            msj: null
        };
        if(!helper.validarVaciosYMenorTresLetras(name)||!helper.validarVaciosYMenorTresLetras(lastName)){
            returnObj.status = 400;
            returnObj.msj = "El nombre/apellido tiene menos de 3 letras."
        }
        else if(!helper.validarMail(user)){
            returnObj.status = 400;
            returnObj.msj = "Mail invalido";
        }
        else if(!helper.validarVaciosYMenorTresLetras(password)){
            returnObj.status = 400;
            returnObj.msj = "La contraseña debe ser mayor a 3 caracteres";
        }
        else{
            if(await repo.insertUserAsync(name, lastName, user, password)){
                returnObj.status = 200;
                returnObj.msj = "OK";
            }
            else{
                returnObj.status = 500;
                returnObj.msj = "Error Interno";
            }
        }
        return returnObj;
    }


}
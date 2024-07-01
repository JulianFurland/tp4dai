import {Router} from 'express';
import UserService from '../services/user-service.js';
import authModule from '../modules/auth-module.js';
import Helper from '../helpers/helpers.js';
const router = Router();
const svc = new UserService();
const help = new Helper();

router.post('/login',  async (req, res) => {
    let returnObj = null
    let status = null
    if(!help.validarMail(req.body.username))
    {
        returnObj = {
            succes: false,
            message: "El usuario ingresado no es correcto",
            token: ""
        }
        status = 400
    }
    else{
    let getUser = await svc.getUserAsync(req.body.username, req.body.password)
        if(getUser!==null){
            returnObj = {
                succes: true,
                message: "",
                token: getUser.token
            }
            status = 200
            
        }
        else{
            returnObj = {
                succes: false,
                message: "Usuario o clave inválida.",
                token: ""
            }
            status = 401
        }
    }
    res.json(returnObj).status(status)
});

router.post('/register',  async (req, res) => {
    let insertUser = await svc.insertUserAsync(req.body.first_name, req.body.last_name, req.body.username, req.body.password)
    res.send(insertUser.msj).status(insertUser.status)
});

export default router;
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
            success: false,
            message: "El usuario ingresado no es correcto",
            token: ""
        }
        status = 400
    }
    else{
    let getUser = await svc.getUserAsync(req.body.username, req.body.password)
        if(getUser!==null){
            returnObj = {
                success: true,
                message: "",
                token: getUser.token
            }
            status = 200
            
        }
        else{
            returnObj = {
                success: false,
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
    res.send(insertUser).status(insertUser.status)
});

router.get('/:id', async (req, res) =>{
    let result = await svc.getUserByIdAsync(req.params.id)
    res.status(result.status).json(result.data)
});

export default router;
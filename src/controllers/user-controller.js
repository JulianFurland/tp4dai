import {Router} from 'express';
import UserService from '../services/user-service.js';
import authModule from '../modules/auth-module.js';
const router = Router();
const svc = new UserService();

router.post('/login',  async (req, res) => {
    let returnObj = svc.getUserAsync(req.body.username, req.body.password)
    if(returnObj!==null){
        
        returnObj = {
            succes: true,
            message: "",
            token: returnObj.token
        }
        res.json(returnObj).status(200)
    }
});

router.post('/register',  async (req, res) => {

});

export default router;
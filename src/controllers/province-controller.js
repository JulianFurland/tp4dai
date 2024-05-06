import {Router} from 'express';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    console.log("a");
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    } else {
        respuesta = res.status(500).send(`Error Interno`);
    }
    return respuesta;
});

router.get('/:id', async (req, res)=>{
    let respuesta;
    const returnObj = await svc.getByIDAsync(req.params.id);
    console.log("b");
    if (returnObj != null) {
        respuesta = res.status(200).json(returnObj);
    } else {
        respuesta = res.status(500).send(`Error Interno`);
    }
    return respuesta;
});

export default router;
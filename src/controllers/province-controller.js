import {Router} from 'express';
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    const returnArray = await svc.getAllAsync();
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.get('/:id', async (req, res)=>{
    const returnObj = await svc.getByIDAsync(req.params.id);
    if (returnObj != null) {
        res.status(200).json(returnObj);
    } else {
        res.status(404).send(`Error Interno`);
    }

});

router.post('', async(req,res)=>{
    const province = req.body;
    if (await svc.postProvince(province)) {
        res.status(200).send('Subido');
    } else {
        res.status(400).send(`Error Interno`);
    }
});

router.put('', async(req,res)=>{
    const province = req.body;
    if (await svc.updateProvince(province)) {
        res.status(200);
    } else {
        res.status(400).send(`Error Interno`);
    }
});

router.delete('/:id', async (req, res)=>{
    const returnObj = await svc.deleteProvince(req.params.id);
    if (returnObj != null) {
        res.status(200);
    } else {
        res.status(404).send(`Error Interno`);
    }

});

router.get('/:id/locations', async (req, res)=>{
    const returnObj = await svc.getLocByIDAsync(req.params.id);
    if (returnObj != null) {
        res.status(200).json(returnObj);
    } else {
        res.status(404).send(`Error Interno`);
    }
});


export default router;
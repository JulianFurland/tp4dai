import {Router} from 'express';
import EventCategoryService from './../services/event-category-service.js'
const router = Router();
const svc = new EventCategoryService();

router.get('', async (req, res) => {
    const returnArray = await svc.getAllAsync();
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.get('/:id', async (req, res) => {
    const returnObj = await svc.getByIDAsync(req.params.id);
    res.status(returnObj.status).json(returnObj.data);
});

router.post('/', async (req,res) => {
    const response = svc.createCategory(req.body.name, req.body.displayOrder)
    res.status((await response).status).send((await response).message); 
})

export default router;
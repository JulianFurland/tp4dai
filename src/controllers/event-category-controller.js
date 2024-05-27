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

export default router;
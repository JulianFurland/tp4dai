import {Router} from 'express';
import EventService from './../services/event-service.js'
const router = Router();
const svc = new EventService();

router.get('/:page', async (req, res) => {
    const returnArray = await svc.getTenAsync(req.params.page);
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.get('/', async (req, res) => {
    const returnArray = await svc.getByParamsAsync(req.query.name, req.query.category, req.query.startDate, req.query.tags)
})

export default router;
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

router.post('/', async (req, res) => {
    const returnArray = await svc.searchEventsAsync(req.body.name, req.body.category, req.body.startDate, req.body.tag)
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
})

export default router;
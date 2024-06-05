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
    const returnArray = await svc.searchEventsAsync(req.query.name, req.query.category, req.query.startDate, req.query.tag)
    console.log(returnArray)
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.get('/detalle/:id', async (req, res) => {
    const returnArray = await svc.getDetailed(req.params.id)
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
})

export default router;
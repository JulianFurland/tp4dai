import {Router} from 'express';
import EventService from './../services/event-service.js';
import {VerifAuthTokenMiddleware} from '../middleware/auth-middleware.js';
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

router.get('/:id/enrollment', async (req, res) => {
    const returnArray = await svc.searchParticipants(req.params.id, req.query.first_name, req.query.last_name, req.query.username, req.query.attended, req.query.rating)
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
})

router.post('/', VerifAuthTokenMiddleware, async (req,res) => {
    const response = svc.createEvent(req.body.name, req.body.description, req.body.id_event_category, req.body.id_event_location, req.body.start_date, req.body.duration_in_minutes, req.body.price, req.body.enabled_for_enrollment, req.body.max_assistance, req.user.id)
    res.status(response.status).send(response.message);
})

export default router;
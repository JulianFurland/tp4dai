import {Router} from 'express';
import LocationService from './../services/location-service.js'
import { VerifAuthTokenMiddleware } from '../middleware/auth-middleware.js';
const router = Router();
const svc = new LocationService();

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

router.get('/:id/event-location', VerifAuthTokenMiddleware, async (req, res) => {
    const returnObj = await svc.getEventLocationByIDAsync(req.params.id, req.user.id);
    res.status(returnObj.status).json(returnObj.data);
});

export default router;
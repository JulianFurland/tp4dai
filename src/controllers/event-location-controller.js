import {Router} from 'express';
import EventLocationService from './../services/event-location-service.js';
import {VerifAuthTokenMiddleware} from '../middleware/auth-middleware.js';
const router = Router();
const svc = new EventLocationService();

router.get('', VerifAuthTokenMiddleware, async (req, res) => {
    const returnArray = await svc.getAllAsync(req.user.id);
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.get('/:id', VerifAuthTokenMiddleware, async (req, res) => {
    const returnArray = await svc.getByLocationIDandUserID(req.params.id, req.user.id);
    if (returnArray != null) {
        res.status(200).json(returnArray);
    } else {
        res.status(500).send(`Error Interno`);
    }
});

router.post('/', VerifAuthTokenMiddleware, async (req,res) => {
    const response = svc.createOrUpdateEventLocation(null, req.body.id_location, req.body.name, req.body.full_address, req.body.max_capacity, req.body.latitude, req.body.longitude, req.user.id, "create")
    res.status((await response).status).send((await response).message); 
})

router.put('/', VerifAuthTokenMiddleware, async (req,res) => {
    const response = svc.createOrUpdateEventLocation(req.body.id, req.body.id_location, req.body.name, req.body.full_address, req.body.max_capacity, req.body.latitude, req.body.longitude, req.user.id, "update")
    res.status((await response).status).send((await response).message); 
})

router.delete('/:id', VerifAuthTokenMiddleware, async (req,res) => {
    const response = svc.deleteEventLocation(req.params.id, req.user.id)
    res.status((await response).status).send((await response).message);
})

export default router;
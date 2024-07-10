import EventEnrollmentRepository from '../repositories/event-enrollment-repository.js'
import CommonService from './common-service.js';

export default class EventEnrollmentService{
    selectEnrollmentEvent = async (id) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.selectEnrollmentEvent(id);
        return returnArray;
    }

    selectEnrollment = async (id, idUser) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.selectEnrollment(id, idUser);
        return returnArray;
    }

    countEnrollment = async (id) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.countEnrollment(id);
        return returnArray;
    }
}
import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventEnrollmentRepository{
    selectEnrollmentEvent = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT id_user FROM event_enrollments WHERE id_event = id`;
            const result = await client.query(sql);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    selectEnrollment = async (id, idUser) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_enrollments WHERE id_event = $1 AND id_user = $2`;
            let values = [id, idUser];
            const result = await client.query(sql, values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    countEnrollment = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1`;
            let values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    

}

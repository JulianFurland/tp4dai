import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventRepository{
    searchEventsAsync = async (name, category, startDate, tag) => {
        let returnArray = [];
        const client = new Client(DBConfig);
        try {
            await client.connect();
            let sql = `SELECT * FROM events 
            LEFT JOIN event_categories on events.id_event_category = event_categories.id
            LEFT JOIN event_tags on events.id = event_tags.id_event
            LEFT JOIN tags on event_tags.id_tag = tags.id
            WHERE 1=1`;
            if (name !== null && name !== undefined) {
                sql += ` AND events.name LIKE '%${name}%'`;
            }
            if (category !== null && category !== undefined) {
                sql += ` AND event_categories.name = '${category}'`;
            }
            if (startDate !== null && startDate !== undefined) {
                sql += ` AND start_date = '${startDate}'`;
            }
            if (tag !== null && tag !== undefined) {
                sql += ` AND tags.name = '${tag}'`;
            }
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    getDetailed = async (id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `select * from events
            inner join users on events.id_creator_user = users.id
            inner join event_tags on events.id = event_tags.id_event
            inner join tags on event_tags.id_tag = tags.id
            inner join event_locations on events.id_event_location = event_locations.id
            inner join locations on event_locations.id_location = locations.id
            inner join provinces on locations.id_province = provinces.id
            Where events.id = ${id}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    searchParticipants = async (first_name, last_name, username, attendent, rating) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            let sql = `SELECT * FROM users 
            LEFT JOIN event_enrollments on users.id = event_enrollments.id_user
            LEFT JOIN events on event_enrollments.id_event = events.id
            WHERE 1=1`;
            if (first_name !== null && first_name !== undefined) {
                sql += ` AND users.first_name LIKE '%${first_name}%'`;
            }
            if (last_name !== null && last_name !== undefined) {
                sql += ` AND users.last_name = '${last_name}'`;
            }
            if (username !== null && username !== undefined) {
                sql += ` AND users.username = '${username}'`;
            }
            if (attendent !== null && attendent !== undefined) {
                sql += ` AND event_enrollments.attendent = '${attendent}'`;
            }
            if (rating !== null && rating !== undefined) {
                sql += ` AND event_enrollments.rating = '${rating}'`;
            }
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createEvent = async (name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
            let values = [name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
    
    selectidUserCreatorEvent = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT id_creator_user FROM events WHERE id = $1`;
            let values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    } 


    updateEvent = async (id, name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `UPDATE events SET name = $2, description = $3, id_event_category = $4, id_event_location = $5, start_date = $6, duration_in_minutes = $7, price = $8, enabled_for_enrollment = $9, max_assistance = $10, id_creator_user = $11 WHERE id = $1`;
            let values = [id, name, description, category, location, startDate, duration, price, boolEnrollment, maxAssistance, idCreator]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    selectAsistanceYDateYenable = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT max_assistance, start_date, enabled_for_enrollment FROM events WHERE id = $1`;
            let values = [id];
            const result = await client.query(sql, values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    } 

    createEnrollment = async (id, idUser) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        let date = new Date();
        try {
            await client.connect();
            const sql = `INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            let values = [id, idUser, "", date, 0, "", 0]
            const result = await client.query(sql, values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    deleteEnrollment = async (id, idUser) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2`;
            let values = [id, idUser];
            const result = await client.query(sql, values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    rateEvent = async (enrollmentID, rating, observation) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        let date = new Date();
        try {
            await client.connect();
            const sql = `UPDATE event_enrollments SET observations=$1, rating=$2 WHERE id = $3`;
            let values = [observation, rating, enrollmentID]
            const result = await client.query(sql, values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
}
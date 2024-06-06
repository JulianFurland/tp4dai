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
            console.log(id)
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
            console.log(returnArray)
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}
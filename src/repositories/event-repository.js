import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventRepository{
    searchEventsAsync = async (name, category, startDate, tag) => {
        let returnArray = null;
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
                sql += ` AND event.categories = '${category}'`;
            }
            if (startDate !== null && startDate !== undefined) {
                sql += ` AND start_date = '${startDate}'`;
            }
            if (tag !== null && tag !== undefined) {
                sql += ` AND tags.name = '${tag}'`;
            }
            console.log(sql)
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
}
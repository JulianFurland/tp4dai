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
            INNER JOIN event_categories on events.id_event_category = event_categories.id
            INNER JOIN event_tags on events.id = event_tags.id_event
            INNER JOIN tags on event_tags.id_tag = tags.id
            WHERE 1=1`;
            if (name !== null && name !== undefined) {
                sql += ` AND name = '${name}'`;
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
    
}
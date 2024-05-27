import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventRepository{
    getAllAsync = async (offset) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM events ORDER BY id OFFSET $1 LIMIT 10`;
            let values = [offset];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}
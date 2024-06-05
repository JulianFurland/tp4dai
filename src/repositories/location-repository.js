import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class LocationRepository{

    getByProvAsync = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM locations WHERE id_province=${id}`;
            const result = await client.query(sql);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }
}
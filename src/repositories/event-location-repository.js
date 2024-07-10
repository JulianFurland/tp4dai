import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventLocationRepository{

    getByLocationIDandUserID = async (locationID, userID) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_locations WHERE id_location = $1 AND id_creator_user = $2`;
            const values = [locationID, userID]
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}
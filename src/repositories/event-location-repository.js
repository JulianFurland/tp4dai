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

    createEventLocation = async (idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
            let values = [idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser]
            console.log(values);
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    updateEventLocation = async (idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser, id) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6, id_creator_user = $7 WHERE id = $8`;
            let values = [idLocation, name, fullAddress, maxCapacity, latitude, longitude, idUser, id]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
}
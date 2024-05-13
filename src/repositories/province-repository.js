import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIDAsync = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM provinces WHERE id=$1`;
            let values = [id];
            const result = await client.query(sql,values);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    postProvince = async (province) => {
        let boolReturn;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO provinces (name, full_name, latitude, longitude) VALUES ($1, $2, $3, $4)`;
            let values = [province.name,province.fullname,province.latitude,province.longitude];
            const result = await client.query(sql,values);
            await client.end();
            boolReturn = result.rowsAffected == 1;
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

}
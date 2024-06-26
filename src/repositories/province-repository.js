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
            const sql = `SELECT * FROM provinces WHERE id=${id}`;
            const result = await client.query(sql);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    postProvince = async (province) => {
        console.log('repo')
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO provinces (name, full_name, latitude, longitude) VALUES ($1, $2, $3, $4)`;
            let values = [province.name,province.full_name,province.latitude,province.longitude];
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    updateProvince = async (province) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 WHERE id = $6`;
            let values = [province.name,province.full_name,province.latitude,province.longitude, province.display_order, province.id];
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    deleteProvince = async (id) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql1 = `DELETE FROM provinces WHERE id=$1`;
            const sql2 = `DELETE FROM locations WHERE id_province=$1`;
            let values = [id];
            const result2 = await client.query(sql2,values);
            const result1 = await client.query(sql1,values);
            await client.end();
            returnObj = result1.RowsAffected == 1;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }   

}
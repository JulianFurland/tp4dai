import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class CommonRepository{
    getAllAsync = async (table) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM $1`;
            let values = [table];
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (params) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM $1 WHERE id=$2`;
            let values = [params.table, params.id];
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getTenAsync = async (params) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM $1 ORDER BY id OFFSET $2 LIMIT 10`;
            let values = [params.table, params.offset];
            console.log(values);
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
            console.log(returnArray)
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}
import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class CommonRepository{
    getAllAsync = async (table) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM ${table}`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIDAsync = async (params) => {
        let returnObj = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM ${params.table} WHERE id=${params.id}`;
            const result = await client.query(sql);
            await client.end();
            returnObj = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnObj;
    }

    getTenAsync = async (params) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM ${params.table} ORDER BY id OFFSET ${params.offset} LIMIT 10`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    
    delete = async (params) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM ${params.table} WHERE id = $1`;
            const values = [params.id]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
}
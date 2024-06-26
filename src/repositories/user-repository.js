import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class UserRepository{
    getUserAsync = async (user, password) =>{
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM Users WHERE username = ($1) AND password = ($2)`;
            let values = [user, password]
            const result = await client.query(sql,values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray[0];
    }
    insertUserAsync =async (name, lastName, user, password) =>{
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`;
            let values = [name, lastName, user, password]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
}
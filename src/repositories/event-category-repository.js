import DBConfig from './../config/dbconfig.js';
import pkg from 'pg';
const {Client, Pool} = pkg;

export default class EventCategoryRepository{
    createCategory = async (name, displayOrder) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `INSERT INTO event_categories (name, display_order) VALUES ($1, $2)`;
            let values = [name, displayOrder]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }

    updateCategory= async (id, name, displayOrder) => {
        let boolReturn = true;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `UPDATE event_categories SET name = $2, display_order = $3 WHERE id = $1 `;
            let values = [id, name, displayOrder]
            const result = await client.query(sql,values);
            await client.end();
        } catch (error) {
            boolReturn = false;
            console.log(error);
        }
        return boolReturn;
    }
}
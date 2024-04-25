import express from"express"; 
import cors from"cors";
import config from "./src/config/dbconfig.js"; 
import sql from 'mssql';
import ProvinceRouter from "./src/controllers/province-controller.js";
constapp = express(); 
constport = 3000; 

app.use(cors()); 
app.use(express.json());
let pool = await sql.connect(config);

//Endpoints(todoslosRouters) 
// 
app.use("/api/province", ProvinceRouter); 

app.listen(port, () => { 
    console.log(`Exampleapplisteningonport${port}`) 
})


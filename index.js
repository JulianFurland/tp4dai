import express from"express"; 
import cors from"cors";
import ProvinceRouter from "./src/controllers/province-controller.js";
import EventRouter from "./src/controllers/event-controller.js";
import LocationRouter from "./src/controllers/location-controller.js";
import EventCategoryRouter from "./src/controllers/event-category-controller.js";
import EventLocationRouter from "./src/controllers/event-location-controller.js";
import AuthRouter from "./src/controllers/auth-controller.js";
const app = express(); 
const port = 3000; 

app.use(cors()); 
app.use(express.json());
app.use('/front', express.static('public'));
app.use("/api/event", EventRouter);
app.use("/api/province", ProvinceRouter);
app.use("/api/location", LocationRouter);
app.use("/api/event-category", EventCategoryRouter);
app.use("/api/event-location", EventLocationRouter);
app.use("/api/auth", AuthRouter);

app.listen(port, () => { 
    console.log(`Example app listening on port: ${port}`) 
})


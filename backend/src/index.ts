import { ENV } from "./config/env";
import express from "express";

const app = express();



app.get("/", (req, res) => {
    res.json({ 
        success: true, 
    
    });
})

app.listen(ENV.PORT, () => {
    console.log("Server is listening at port 3000");
    
});
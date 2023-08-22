import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config()

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/category", categoryRoutes)

app.get('/', (req,res)=> {
    res.send("<h1>Welcome to bazarshodai</h1>")
});

const port = process.env.PORT || 8001;  

app.listen(port, ()=>{
    console.log(`server running on ${process.env.DEV_MODE} http://localhost:${port}`)
})



import express from "express"
import 'dotenv/config'
import cors from "cors" 
import { connectDB } from "./config/db.js";
import vendreRouter from "./routes/vendreRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";



const port=process.env.PORT ||8000
const app = express()

// middleware
app.use(express.json())
app.use(cors())


// db 
connectDB()

// api routes 
app.use("/api/vendre", vendreRouter)
app.use("/api/user", userRouter)
app.use("/images", express.static("uploads"))
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRouter)

app.get("/",(req, res)=>{
    res.send("API DE  NODE JS")
})






app.listen(port, () =>{
    console.log(`Server demaré au port  http://localhost:${port}`)
})

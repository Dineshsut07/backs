import express, { application } from "express";
import eventRoutes from "./routes/event.js";
import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import cors from "cors"
import bookRoutes from "./routes/booking.js"
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
        res.json("success");
});
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
app.use('/api/book', bookRoutes);


app.listen(8080 ,()=>{
    console.log("connected");
});

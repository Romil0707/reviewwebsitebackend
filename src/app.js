
import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
    origin: '*', // change to specific domain if needed
    credentials: true
}))
app.use(express.json({ limit: '16kb', extended: true }));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

import  userRouter  from "./routes/user.routes.js"
app.use('/api/v1', userRouter)

export {app}
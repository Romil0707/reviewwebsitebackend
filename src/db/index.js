import mongoose from 'mongoose';
import {DB_NAME} from "../constans.js"

const connectDb = async () => {

    try {
        
        const connectionInstans = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected: ${connectionInstans.connection.host}`)
    
    } catch (error) {
        console.log(` mongoose Error: ${error}`);
        process.exit(1)
    }}

    export default connectDb
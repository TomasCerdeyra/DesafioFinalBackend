import mongoose from "mongoose";
import dotenv from 'dotenv'
import { logger } from "../utils/pino.js";
dotenv.config()

const connectionMongo = ()=> {
    const URL = process.env.URI
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        logger.info('connect BD ok')
    })
    .catch((err) => {
        console.log(err);
    })
}

export default connectionMongo
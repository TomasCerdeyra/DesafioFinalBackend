import mongoose from "mongoose";
import { logger } from "../utils/pino.js";

try {
    const URL = process.env.URI
    await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    logger.info('connect BD ok')
} catch (error) {
    logger.info('Error de conexion DB');
}

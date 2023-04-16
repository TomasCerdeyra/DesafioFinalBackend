import mongoose from "mongoose";

const collName = 'products'

const productSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

const ModelProduct = mongoose.model(collName, productSchema)

export default ModelProduct
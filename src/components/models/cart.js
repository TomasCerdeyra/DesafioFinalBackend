import mongoose from "mongoose";

const collName = 'cart'

const cartSchema = new mongoose.Schema(
    {
        timestamp: {
            type: String
        },
        products: [
            {
                timestamp: {
                    type: String
                },
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
                    required: true,
                },
                stock: {
                    type: Number,
                    required: true
                }
            }
        ],
        total: {
            type: Number
        },
        user: {
            //Con Schema.Types.ObjectId, puedo traer el Id referido ("User")
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    
    })

const ModelCart = mongoose.model(collName, cartSchema)

export default ModelCart
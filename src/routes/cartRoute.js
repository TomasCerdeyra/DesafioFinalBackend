import express from 'express'
import { deleteProd, productsCart } from '../controllers/cartController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routeCart = express.Router()

routeCart.get('/api/carrito', authenticUsers, productsCart)

routeCart.delete('/api/carrito/:id', authenticUsers, deleteProd)


export default routeCart
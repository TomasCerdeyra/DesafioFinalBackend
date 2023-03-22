import express from 'express'
import { deleteProd, finishesBuying, productsCart } from '../controllers/cartController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routeCart = express.Router()

routeCart.get('/', authenticUsers, productsCart)

routeCart.delete('/:id', authenticUsers, deleteProd)

routeCart.get('/compra-terminada', authenticUsers, finishesBuying )


export default routeCart
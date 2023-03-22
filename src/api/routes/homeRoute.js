import express from 'express'
import { addCart, home } from '../controllers/homeController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routerHome = express.Router()


routerHome.get('/', authenticUsers, home)

routerHome.get('/api/carrito/:id',authenticUsers ,addCart)

export default routerHome
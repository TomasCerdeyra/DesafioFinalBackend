import express from 'express'
import { login, loginEnter, logoutSession, register, registerUser } from '../controllers/loginController.js'
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validationManager.js'

const routeLogin = express.Router()

routeLogin.get('/register', register)

routeLogin.post('/register', bodyRegisterValidator, registerUser)

routeLogin.get('/login', login)

routeLogin.post('/login', bodyLoginValidator, loginEnter)

routeLogin.get('/logout', logoutSession)



export default routeLogin
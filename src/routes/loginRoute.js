import express from 'express'
import { login, loginEnter, logoutSession, register, registerUser } from '../controllers/loginController.js'

const routeLogin = express.Router()

routeLogin.get('/register', register)

routeLogin.post('/register', registerUser)

routeLogin.get('/login', login)

routeLogin.post('/login', loginEnter)

routeLogin.get('/logout', logoutSession)



export default routeLogin
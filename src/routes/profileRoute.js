import express from 'express'
import { profile } from '../controllers/profileController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routerProfile = express.Router()

routerProfile.get('/perfil', authenticUsers, profile)

export default routerProfile
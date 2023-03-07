import express from 'express'
import { addImage, profile } from '../controllers/profileController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routerProfile = express.Router()

routerProfile.get('/perfil', authenticUsers, profile)

routerProfile.post('/perfil', authenticUsers , addImage)

export default routerProfile
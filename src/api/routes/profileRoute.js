import express from 'express'
import { addImage, profile } from '../controllers/profileController.js'
import authenticUsers from '../middlewares/authenticUser.js'

const routerProfile = express.Router()

routerProfile.get('/', authenticUsers, profile)

routerProfile.post('/', authenticUsers , addImage)

export default routerProfile
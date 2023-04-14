import ModelUser from "../../models/user.js"
import { logger } from "../../../utils/pino.js"

class ContainerProfile {

    async getUser(id) {
        try {
            const user = await ModelUser.findById(id)
            return user
        } catch (error) {
            logger.info('No se encontro al usuario');
            console.log(error);
        }
    }

    async updateImg(userId, extension) {
        try {
            const user = await ModelUser.findById(userId)
            user.image = `${userId}.${extension}`
            await user.save()
        } catch (error) {
            logger.info(error)
            console.log(error);
        }
    }
}

export default ContainerProfile
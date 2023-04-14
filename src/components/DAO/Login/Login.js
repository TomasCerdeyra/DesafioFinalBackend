import ModelUser from "../../models/user.js";
import { loggerLog } from "../../../utils/pino.js"

class ContainerLogin {
    async addUser(newUser) {
        try {
            const user = await ModelUser.findOne(newUser)
            if (user) throw new Error('El usuario con ese mail ya existe')

            await ModelUser.create(newUser)
        } catch (error) {
            loggerLog.error({ msg: error.message });
        }
    }

    async login(email) {
        const user = await ModelUser.findOne({ email })
        return user
    }

}

export default ContainerLogin
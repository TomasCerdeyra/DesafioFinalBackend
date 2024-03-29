import formidable from "formidable"
import { logger } from "../../utils/pino.js"
import fs from 'fs'
import ContainerProfile from "../../components/DAO/Profile/Profile.js";
//config __dirname
import __dirname from "../../../configDirname.js";
import path from "path";

const controller = new ContainerProfile()

const profile = async (req, res) => {
    try {
        const user = await controller.getUser(req.user.id)
        res.render('perfil', { user: req.user, image: user.image })
    } catch (error) {
        logger.info(error)
    }
}

const addImage = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.maxFilSize = 50 * 1024 * 1024

    form.parse(req, async (err, fields, files) => {
        try {
            if (err) throw new Error('falla en formidable')

            const file = files.myFile

            if (file.originalFilename === '') throw new Error('Agregue una imagen por favor')

            const imageType = ['image/jpeg', 'image/png']
            if (!(imageType.includes(file.mimetype))) {
                throw new Error('Por favor ingrese un imagen .jpg o png')
            }

            if (file.size > 50 * 1024 * 1024) throw new Error('Se puede insertar imagenes menores a 50MB')

            const extension = file.mimetype.split("/")[1];
            
            const dirFile = path.join(__dirname, `/public/img/perfiles/${req.user.id}.${extension}`);

            fs.renameSync(file.filepath, dirFile)

            await controller.updateImg(req.user.id, extension)

            req.flash("mensajes", [{ msg: 'Se subio la imagen' }])
            res.redirect('/api/perfil')
        } catch (error) {
            logger.info({ msg: error.message })
            res.redirect('/api/perfil')
        }
    })
}

export {
    profile,
    addImage
}
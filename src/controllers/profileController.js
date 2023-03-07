import formidable from "formidable"
import { logger } from "../utils/pino.js"
//config __dirname
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const profile = async (req, res) => {
    res.render('perfil', { user: req.user })
}

const addImage = async (req, res) => {
    const form = new formidable.IncomingForm()
    form.maxFilSize = 50 * 1024 * 1024

    form.parse(req, async(err, fields, files) => {
        try {
            if (err) throw new Error('falla en formidable')

            const file = files.myFile

            if(file.originalFilename === '') throw new Error('agregue una imagen')

            if(!(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')){
                throw new Error('agregue una imagen JPG o PNG')
            }

            if(file.size > 50 * 1024 * 1024) throw new Error('Agregue una imagen de meno de 5MB')
            
            const extension = file.mimetype.split('/')[1]
            const dirFile = path.join(__dirname, `../public/img/perfiles/${req.user.id}.${extension}`)

            console.log(dirFile);
            res.redirect('/perfil')
        } catch (error) {
           logger.info({msg: error.message})
           res.redirect('/perfil')
        }
    })
}

export {
    profile,
    addImage
}
import ModelUser from "../models/user.js"
import { loggerLog } from "../utils/pino.js"


const register = (req, res) => {
    res.render('register')
}

const registerUser = async (req, res) => {
    const newUser = req.body
    console.log(newUser);
    try {
        const user = await ModelUser.findOne(newUser)
        if (user) throw new Error('El usuario con ese mail ya existe')

        await ModelUser.create(newUser)
        res.redirect('/login')
    } catch (error) {
        loggerLog.error({ msg: error.message });
        return res.redirect('/register')
    }
}

/*----- Login -----  */

const login = (req, res) => {
    res.render('login', { mensajes: req.flash("mensajes") })
}

const loginEnter = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await ModelUser.findOne({ email })
        
        if (!user) throw new Error('El usuario no existe')

        //Despues hacer verificacion si tiene la cuenta confirmada

        //
        if (!(await user.comparePassword(password))) throw new Error('Uno de los datos ingresados es incorrecto')

        req.login(user, err =>{
            if(err) throw new Error('Error al crear la sesion')
            res.redirect('/')
        })
    } catch (error) {
        loggerLog.error({ msg: error.message } )
        req.flash("mensajes", [{msg: error.message}])
        res.redirect('/login')
    }
}

const logoutSession = (req, res) => {
    req.logout((err)=>{
        if(err) loggerLog.error('Error al eliminar la sesion')
        res.redirect('/')
    })
}

export {
    register,
    registerUser,
    login,
    loginEnter,
    logoutSession
}
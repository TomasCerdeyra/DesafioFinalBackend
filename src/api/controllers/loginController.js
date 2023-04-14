import ContainerLogin from "../../components/DAO/Login/Login.js"
import { loggerLog } from "../../utils/pino.js"

const controller = new ContainerLogin()

const register = (req, res) => {
    res.render('register')
}

const registerUser = async (req, res) => {
    const newUser = req.body
    try {
        await controller.addUser(newUser)
        res.redirect('/api/login')
    } catch (error) {
        return res.redirect('/api/register')
    }
}

/*----- Login -----  */

const login = (req, res) => {
    res.render('login', { mensajes: req.flash("mensajes") })
}

const loginEnter = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await controller.login(email)
        
        if (!user) throw new Error('El usuario no existe')

        if (!(await user.comparePassword(password))) throw new Error('Uno de los datos ingresados es incorrecto')

        req.login(user, err =>{
            if(err) throw new Error('Error al crear la sesion')
            res.redirect('/')
        })
    } catch (error) {
        loggerLog.error({ msg: error.message } )
        req.flash("mensajes", [{msg: error.message}])
        res.redirect('/api/login')
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
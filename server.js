import express from 'express'
import 'dotenv/config'
import './src/config/MongoDB.js'
import __dirname from './configDirname.js';
import { create } from 'express-handlebars'
import methodOverride from 'method-override'
import { logger } from './src/utils/pino.js';
//sessions
import ModelUser from './src/models/user.js';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash'
import MongoStore from 'connect-mongo';
//Routes
import routeLogin from './src/routes/loginRoute.js';
import routerHome from './src/routes/homeRoute.js';
import routeCart from './src/routes/cartRoute.js';
import routerProfile from './src/routes/profileRoute.js';

const app = express();

/*-----Config Session y pasport-----*/
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URI
    }),
    secret: process.env.MDSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 900000
    }
}))

app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        address: user.address,
        phone: user.phone
    })
})

passport.deserializeUser(async (user, done) => {
    const userDB = await ModelUser.findById(user.id)
    done(null, {
        id: userDB._id,
        name: userDB.name,
        email: userDB.email,
        age: userDB.age,
        address: userDB.address,
        phone: userDB.phone
    })
})

//config handlebasr
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
})
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Routes
app.use('/api', routeLogin)
app.use('/', routerHome)
app.use('/api/carrito', routeCart)
app.use('/api/perfil', routerProfile)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    logger.info('Escuchando ' + PORT);
})

//desde config

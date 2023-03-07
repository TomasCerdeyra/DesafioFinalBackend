import pino from "pino";

const loggerLog = pino('errors.log', {
    Option:{
        ignore: 'hostname'
    }
})

const logger = pino()


export{
    loggerLog,
    logger
}
import { createTransport } from 'nodemailer'
import { logger } from './pino.js'

const sendMails = async (mail,name,prods) => {

    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.MAIL_ADDRES,
            pass: process.env.MAIL_PASS
        }  
    })
    
    const emailContent = {
        from: 'Mi primer prueba de mail',
        to: mail,
        subject: `Tu nuevo pedido esta listo ${name}`,
        text: `Hola ${name} estos son tus productod que solicitaste ${prods}`,
        html: `<h1>Hola ${name} estos son tus productod que solicitaste ${prods}</h1>`
    }

    try {
        const info = await transporter.sendMail(emailContent)
        
    } catch (error) {
        console.log("fallos");
        logger.info('Fallo el envio de mail')
    }
}

export default sendMails
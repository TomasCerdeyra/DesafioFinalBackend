import { createTransport } from 'nodemailer'

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
        console.log(info);
    } catch (error) {
        console.log('fallo el envio d correo');
        console.log(error);
    }
}

export default sendMails
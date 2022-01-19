import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'


class SenderSendgrid {
    async send(msg) {
        sgMail.setApiKey(process.env.API_SENDGRID_KEY)
        return await sgMail.send({ ...msg, from: 'ololo2022@meta.ua' })
    }
}



class SenderNodemailer {
    async send(msg) {
        const config = {
            host: "smtp.meta.ua",
            port: 465,
            secure: true,
            auth: {
                user: process.env.META_EMAIL,
                pass: process.env.META_SECRET,
            }
        }
        const transporter = nodemailer.createTransport(config)
        return await transporter.sendMail({
            ...msg, from: process.env.META_EMAIL
        })
    }
}

export { SenderSendgrid, SenderNodemailer }
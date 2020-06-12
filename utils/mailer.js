const nodemailer = require('nodemailer')
const config = require('config')




const mailer = async ({ nom, email, message }) => {


    let response = {}

    let transporter = nodemailer.createTransport({
        host: process.env.HOSTSMTP || config.get('HOSTSMTP'),
        port: process.env.HOSTPORT || config.get('HOSTPORT'),
        secure: true,
        auth: {
            user: process.env.USER || config.get('USER'),
            pass: process.env.PASSWORD || config.get('PASSWORD'),
        },
    })

    let data = {
        from: `${nom} <${email}>`,
        to:   process.env.MAILBOX || config.get('MAILBOX'),
        subject: 'Message from CoachForYou',
        text: message,
        html: `<p>${message}</p>`,
    }

    let info = await transporter.sendMail(data)


    return info


}

module.exports = mailer

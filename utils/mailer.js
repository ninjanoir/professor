const nodemailer = require('nodemailer')
const config = require('config')


const mailer = async ({ nom, email, message }) => {


    let response = {}

    let transporter = nodemailer.createTransport({
        host: config.get('HOSTSMTP'),
        port: config.get('HOSTPORT'),
        secure: true,
        auth: {
            user: config.get('USER'),
            pass: config.get('PASSWORD'),
        },
    })

    let data = {
        from: `${nom} <${email}>`,
        to: config.get('MAILBOX'),
        subject: 'Message from CoachForYou',
        text: message,
        html: `<p>${message}</p>`,
    }

    let info = await transporter.sendMail(data)


    return info


}

module.exports = mailer

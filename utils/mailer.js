const nodemailer = require('nodemailer')


const mailer = async ({ nom, email, message }) => {
    let transporter = nodemailer.createTransport({
        host: process.env.HOSTSMTP,
        port: process.env.HOSTPORT,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
        },
    })

    let data = {
        from: `${nom} <${email}>`,
        to: process.env.MAILBOX,
        subject: 'Message from CoachForYou',
        text: message,
        html: `<p>${message}</p>`,
    }

    let info = await transporter.sendMail(data)

    return info
}

module.exports = mailer

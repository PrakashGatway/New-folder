// const logger = require("../logger/logger");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const extend = Object.assign;

class Mailer {
    /**
     *Creates an instance of Mailer.
     * @memberof Mailer
     */
    constructor() {
        this.transporter = null;
        const BCC = process.env.MAIL_BCC;
        const CC_MAIL = process.env.MAIL_CC;
        this.mailOptions = {
            html: "",
            template: "",
            from: process.env.MAIL_FROM, // sender address
            subject: process.env.MAIL_SUBJECT_PREFIX + " ", // Subject line
            bcc: BCC?.toUpperCase() !== "OFF" ? CC_MAIL : "",
        };
    }

    /**
     * Initialized the NodeMailer as singleton
     *
     * @returns
     * @memberof Mailer
     */
    initialize() {
        if (this.transporter) {
            return this;
        }
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_SMTP,
            port: process.env.MAIL_PORT,
            secure: false,
            service: process.env.SERVICE,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        this.transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    extName: ".hbs",
                    partialsDir: "./email-tpls/",
                    layoutsDir: "./email-tpls/",
                    defaultLayout: "",
                },
                viewPath: "./email-tpls/",
                extName: ".hbs",
            })
        );

        this.transporter.verify(function (error, success) {
            if (error) {
                console.error(error);
            } else {
                console.info("SMTP Server is ready to send emails");
            }
        });
        return this;
    }

    send(_to, _subject, template, _values) {
        if (!template || !_to) return false;
        const options = extend({}, this.mailOptions);
        options.to = _to;
        options.context = _values || {};
        options.template = template;
        options.subject = options.subject + " " + _subject;
        this.transporter.sendMail(options, (err, res) => {
            if (err) return console.error("Email not Sent: " + options.to + options.subject + err);
            if (res.response.includes("Ok"))
                console.info("Email is sent to: " + options.to + " Subject: " + options.subject);
        });
        console.info("Email is queued for sending to: " + options.to + " Subject: " + options.subject);
    }
}

module.exports = new Mailer();
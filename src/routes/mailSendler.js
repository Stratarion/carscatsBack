

const express = require("express")
const nodemailer = require('nodemailer');
const mail = express.Router()

const User = require("../models/user-model")


mail.post('/mail-send', (req, res) => {
   
    var allEmails = ''
    User.find({}, 'first_name last_name role contry email phone', (err, users) => {
        users.forEach(element => {
            allEmails += element.email + ', '
        });
    }).then (() => {
        allEmails = allEmails.slice(0, -2);
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'volkov.oi.5.8.94@gmail.com', // generated ethereal user
                pass: 'olepop456852'  // generated ethereal password
            },
            tls:{
                rejectUnauthorized:true
            }
        });
        let mailOptions = {
            from: 'volkov.oi.5.8.94@gmail.com', // sender address
            to: allEmails, // list of receivers
            subject: 'Node Contact Request', // Subject line
            text: 'Hello world?', // plain text body
            html: req.body.mail // html body
        };
    
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.send({status: 500})
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            res.send({message : 'Message sent: %s' + info.messageId,
                        status: 200})
            res.render('contact', {msg:'Email has been sent'});
        });

    })
})

module.exports = mail

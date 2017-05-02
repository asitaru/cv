const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req,res) => res.sendFile(__dirname + '/public/index.html'));

app.post('/contact', function(req, res){
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'andreisitaru93@gmail.com',
            pass: process.env.PASS
        }
    });

    let mailOptions = {
        from: 'CV Website <andreisitaru93@gmail.com>',
        to: 'andreisitaru93@gmail.com',
        subject: req.body.subject,
        text: 'You have a submission with the following details... Name: ' + req.body.name + 'Email: ' + req.body.email + 'Message: ' + req.body.message,
        html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email:' + req.body.email +'</li><li>Message: ' + req.body.message + '</li></ul>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            console.log(process.env.PASS);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
            res.redirect('/');
        }
    });
});


app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));
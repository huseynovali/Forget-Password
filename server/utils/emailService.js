// const nodemailer = require('nodemailer');


// const sendPasswordResetEmail = (email, resetLink) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your-email@gmail.com',
//             pass: 'your-password'
//         }
//     });

//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: email,
//         subject: 'Parola Sıfırlama',
//         html: `<p>Parolanızı sıfırlamak için <a href="${resetLink}">buraya tıklayın</a>.</p>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log('E-posta gönderme hatası:', error);
//         } else {
//             console.log('E-posta gönderildi:', info.response);
//         }
//     });
// };


// module.exports = sendPasswordResetEmail


const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//Öncelikle mail konfigürasyonumu yazıyorum
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'login',
        user: "c8657545@gmail.com",
        pass: "bcozssymjajpqicg",
    },
});

function confirmCodeEmail(userEMail,token) {


    transporter.sendMail({
        from: 'c8657545@gmail.com',
        to: userEMail,
        subject: "Confirm Code",
        html: `<p>Parolanızı sıfırlamak için <a href=${"http://localhost:3000/resetpassword/"+token}>buraya tıklayın</a>.</p>`
    });
}


module.exports = {
    confirmCodeEmail
}
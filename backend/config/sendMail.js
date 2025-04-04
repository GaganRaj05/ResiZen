const nodemailer = require('nodemailer');

async function sendMail(email,username, phone,property_name) {
    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user:process.env.GMAIL_ID,
                pass:process.env.GMAIL_PASS
            },
        })
        let mailOptions = {
            from:`Resizen ${process.env.GMAIL_ID}`,
            to:email,
            subject:"Interest in a service",
            text:`${username} is interested in a property ${property_name}, their contact number is: ${phone}`,
            html:`<p>${username} is interested in a property ${property_name}, their contact number is: ${phone}</p>` 
        }
        let info = await transporter.sendMail(mailOptions);
        console.log(info);
        console.log("mail sent succesfully")
        return "mail sent successfully"
    }
    catch(err) {
        console.log(err);
        throw new Error("Failed to send email");
    }
}
module.exports = sendMail;
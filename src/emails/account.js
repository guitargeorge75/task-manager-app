const sgMail = require('@sendgrid/mail');
const sgAPIKey = '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';

sgMail.setApiKey(sgAPIKey);

const sendMail = async function() {
    await sgMail.send({
        to: 'subhayumukherji@gmail.com',
        from: 'subhayumukherji@gmail.com',
        subject: 'This is a test',
        text: 'My new app!!'
    });
    
    console.log('email sent!');
}

sendMail();

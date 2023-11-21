var nodemailer = require('nodemailer');
const fs = require('fs');
function sendMail(recipientAddress, subject, body, pdfFileName, res) {
  var smtpConfig = {
    host: 'mail.tsh2000.com',
    port: 465,
    secure: true,
    auth: {
      user: 'presupuestossv2@tsh2000.com',
      pass: 'n73c8ub3gvbp'
    }
  };

  var transporter = nodemailer.createTransport(smtpConfig);

  var mailOptions = {
    from: ' "Sender" <presupuestossv2@tsh2000.com>',
    to: recipientAddress,
    subject: subject,
    text: 'Hello World',
    html: body,
    attachments: [
      {
        filename: pdfFileName + '.pdf',
        path: './' + pdfFileName + '.pdf',
        contentType: 'application/pdf'
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err)
      res.send({
        error: 500,
        message: 'Error: not able to send your email!'
      });
    fs.unlink('./' + pdfFileName + '.pdf', () => {
      res.send({
        error: 0,
        message: 'Your document has been sent! Thank you!'
      });
    });
  });
}
module.exports.sendMail = sendMail;

const nodeMailer = require("nodemailer");

exports.sendEmail = async (options) => {
  // const transporter = nodeMailer.createTransport({
  //   host: process.env.SMPT_HOST ,
  //   port: process.env.SMPT_PORT ,
  //   auth: {
  //     user: process.env.SMPT_MAIL,
  //     pass: process.env.SMPT_PASS,
  //   },
  //   service: process.env.SMPT_SERVICE,
  // });

  var transporter = nodeMailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "699f46731d62a6",
      pass: "a2d880b756b90c"
    }
  });

  const mailOptions = { 
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

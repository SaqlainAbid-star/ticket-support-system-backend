const nodemailer = require("nodemailer");

module.exports.sendEmail = async (req, res) => {
  try {
    const { customerEmail } = req.body;
    // let testAccount = nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      service: "gmail",
      auth: {
        user: "jamalisaqlain7@gmail.com",
        pass: "urgbklfjojnymore",
      },
    });
    const mailOptions = {
      from: "jamalisaqlain7@gmail.com",
      to: customerEmail,
      subject: "Ticket Reference Number",
      text: `Your tickey has been sent to the admin soon you will be guided by the admin. Your ticket reference number is ${referenceNum}. Please keep to private as it can be used to check your ticket status.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log("sendEmail error >> ", error);
  }
};

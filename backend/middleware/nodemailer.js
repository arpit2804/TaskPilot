const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "rupadhyay2674@gmail.com",
    pass: "12345678",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Rishi Upadhyay" <rupadhyay2674@gmail.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Reminder", // Subject line
    text: "You have an upcoming task", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

main().catch(console.error);

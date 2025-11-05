import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "YOUR_EMAIL@gmail.com",
    pass: "APP_PASSWORD", // App Password از Gmail
  },
});

transporter
  .sendMail({
    from: "YOUR_EMAIL@gmail.com",
    to: "YOUR_OTHER_EMAIL@gmail.com",
    subject: "Test Email",
    text: "سلام! این یک ایمیل تستی است.",
  })
  .then(() => console.log("Email sent"))
  .catch(console.error);

const controllerNewPassword = require("../controllers/ControllerNewPassword.js")
const ControllerGetUsuario = require("../controllers/ControllerGetUsuario");
const controllerPostUsuario = require("../controllers/controllerPostUsuario");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_NODEMAILER, PASS_EMAIL } = process.env;

const handlerGetUsuario = async (req, res) => {
  const { email } = req.body;
  try {
    const response = await ControllerGetUsuario(email);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerSuccessLogin = async (req, res) => {
  const { userId } = req.query;

  console.log(userId);

  try {
    res.status(200).json({ success: true, userId: userId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerPostUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const response = await controllerPostUsuario(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerSendEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const cookie = await req?.cookies?.resetPasswordToken;
    if (!cookie) {
      throw new Error("cookie not set");
    }
    const resetLink = `http://localhost:3002/usuario/resetPassword?resetToken=${cookie}`;
    // create nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_NODEMAILER,
        pass: PASS_EMAIL,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "newswaveresetpass@gmail.com",
      to: email,
      subject: "Reset Password",
      text: "Click on the link to reset your password.",
      html: `<p>Click on the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    // send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json(true);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerResetPas = async (req, res) => {
  const { userId } = req.user;
  const resetPasswordToken = req.cookies.resetPasswordToken;
  
  console.log(userId);
  try {
    if (userId) {
      res
        .status(200)
        .redirect(`http://localhost:5174/resetPassword?userId=${userId}&resetToken=${resetPasswordToken}`);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const handlerChangePassword = async (req, res) => {
  const { userId, newPassword } = req.body;
  const resetPasswordToken = req.cookies.resetPasswordToken;
  
console.log(userId, newPassword)
  try {
    const response = await controllerNewPassword(userId, newPassword,resetPasswordToken);
    res.clearCookie("resetPasswordToken", { httpOnly: true, sameSite: "Lax" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  handlerGetUsuario,
  handlerPostUsuario,
  handlerSuccessLogin,
  handlerSendEmail,
  handlerResetPas,
  handlerChangePassword,
};

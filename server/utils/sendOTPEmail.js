const transporter = require("../config/mail");

const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "email verification OTP",
      html: `
            <div style="font-family: Arial,sans-serif:">
            <h2>Email Varification</h2>
            <p>your OTP is:</p>
            <h1 style="color:blue;">${otp}</h1>
            <p>This OTP will expire in 5 minuts.</p>
            </div>
            `,
    };
    await transporter.sendMail(mailOptions);

    console.log("OTP sent to:", email);
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("Email not sent");
  }
};

module.exports = sendOTPEmail;

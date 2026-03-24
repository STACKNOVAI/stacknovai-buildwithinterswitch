const twilio = require("twilio"); //yet to install twilio package, run npm install twilio in terminal

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phoneNumber, otp) => {
  await client.messages.create({
    body: `Your CareLink verification code is: ${otp}. It expires in 10 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

module.exports = { sendOTP };
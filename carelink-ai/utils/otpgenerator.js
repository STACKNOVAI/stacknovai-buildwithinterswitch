const otpgenerator = require("otp-generator");
const bcrypt = require("bcryptjs")

const generateOtp = () => {
    const otp = otpgenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
    return otp;
}

const hashOtp = async (otp) => {
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    return hashedOtp;
}

const verifyOtp = async (otp, hashedOtp) => {
    const isMatch = await bcrypt.compare(otp, hashedOtp);
    return isMatch;
}


module.exports = { generateOtp, hashOtp, verifyOtp };
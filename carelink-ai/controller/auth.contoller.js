const patient = require("../models/patient.model");
const { generateOtp, hashOtp, verifyOtp } = require("../utils/otpgenerator");
const jwt = require("jsonwebtoken");

const patientRequestOTP = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const formattedPhone = phoneNumber.startsWith("0") ? "234" + phoneNumber.slice(1) : phoneNumber;
        const otp = generateOtp();
        const otpHash = await hashOtp(otp);

        const existingPatient = await patient.findOne({ phoneNumber: formattedPhone });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient with this phone number already exists, try again or login instead" });
        }

        const newPatient = await patient.create({
            phoneNumber: formattedPhone,
            auth: {
                otpHash,
                otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
                isVerified: false
            }
        });

        // DUMMY OTP — prints to terminal instead of sending SMS
        console.log(`OTP for ${formattedPhone}: ${otp}`);

        if (newPatient) {
            return res.status(200).json({ message: "Registration successful. Please verify your phone number with the OTP sent.", patientId: newPatient._id });
        } else {
            return res.status(400).json({ message: "Registration failed. Please try again." });
        }

    } catch (error) {
        console.error("Error in patient requestOTP:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const patientVerifyOTP = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        if (!phoneNumber || !otp) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }

        const formattedPhone = phoneNumber.startsWith("0") ? "234" + phoneNumber.slice(1) : phoneNumber;

        const existingPatient = await patient.findOne({ phoneNumber: formattedPhone });
        if (!existingPatient) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (new Date() > existingPatient.auth.otpExpiresAt) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        const isOtpValid = await verifyOtp(otp, existingPatient.auth.otpHash);
        if (!isOtpValid) {
            return res.status(400).json({ message: "Invalid OTP. Please try again." });
        }

        if (!existingPatient.auth.isVerified) {
            await patient.findOneAndUpdate(
                { phoneNumber: formattedPhone },
                { $set: { "auth.isVerified": true }, $unset: { "auth.otpHash": "", "auth.otpExpiresAt": "" } }
            );
        }

        const token = jwt.sign(
            { patientId: existingPatient._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error in patient verifyOTP:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

const patientLogin = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const formattedPhone = phoneNumber.startsWith("0") ? "234" + phoneNumber.slice(1) : phoneNumber;

        const existingPatient = await patient.findOne({ phoneNumber: formattedPhone });
        if (!existingPatient) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!existingPatient.auth.isVerified) {
            return res.status(400).json({ message: "Phone number not verified. Please verify your phone number to proceed." });
        }

        const otp = generateOtp();
        const otpHash = await hashOtp(otp);

        existingPatient.auth.otpHash = otpHash;
        existingPatient.auth.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
        await existingPatient.save();

        // DUMMY OTP — prints to terminal instead of sending SMS
        console.log(`OTP for ${formattedPhone}: ${otp}`);

        return res.status(200).json({ message: "OTP sent successfully. Please verify to login." });

    } catch (error) {
        console.error("Error in patient login:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};

module.exports = { patientRequestOTP, patientVerifyOTP, patientLogin };
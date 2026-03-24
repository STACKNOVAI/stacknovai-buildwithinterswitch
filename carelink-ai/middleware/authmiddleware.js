const jwt = require("jsonwebtoken");
const patient = require("../models/patient.model");

const authMiddleware = async (req, res, next) => {
    try {
        console.log(req.headers);

        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(400).json({ message: "Invalid token" });
        }

        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifiedToken);
        if (!verifiedToken) {
            return res.status(400).json({ message: "jwt malformed" });
        }

        const existingPatient = await patient.findOne({ phoneNumber: verifiedToken.phoneNumber });
        req.patient = existingPatient._id;
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { authMiddleware };
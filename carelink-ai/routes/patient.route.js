const express = require("express");
const patientRouter = express.Router();
const { patientRequestOTP, patientVerifyOTP, patientLogin } = require("../controller/auth.contoller");

patientRouter.post("/register", patientRequestOTP);
patientRouter.post("/verify", patientVerifyOTP);
patientRouter.post("/login", patientLogin);

module.exports = patientRouter;
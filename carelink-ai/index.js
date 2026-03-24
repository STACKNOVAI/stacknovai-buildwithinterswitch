const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./database/db.config");
const patientRouter = require("./routes/patient.route");
const cors = require("cors");

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/patient", patientRouter);

connectDB();

const port = 7050;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_consultation", (consultationId) => {
    socket.join(consultationId);
    console.log(`User joined consultation: ${consultationId}`);
  });

  socket.on("send_message", ({ consultationId, message }) => {
    io.to(consultationId).emit("new_message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`CareLink server running on port ${port}`);
});
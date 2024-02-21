import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { connectToMongoose } from "./mongooseConfig.js";

const app = express();

// 1. Creating server using http.
const server = http.createServer(app);

// 2. Create socket server.
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. Use socket events.

io.on("connect", (socket) => {
  console.log("Connection is established");

  socket.on("join", (data) => {
    socket.username = data;
  });
  socket.on("new_message", (message) => {
    let userMessage = {
      username: socket.username,
      message: message,
    };

    socket.broadcast.emit("broadcast_message", userMessage);
  });
  socket.on("disconnect", () => {
    console.log("Connection is disconnected");
  });
});

server.listen(5000, () => {
  console.log("App is listening on 5000");
  connectToMongoose();
});

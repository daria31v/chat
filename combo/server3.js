const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const dayjs = require("dayjs");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (__, res) => {
  console.log(__dirname);
  res.sendFile(__direname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("chatMessage", "Welcome to Chat");
  socket.broadcast.emit(
    "chatMessage",
    `New user connected. ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`
  );

  socket.on("chatMessage", (message) => {
    const data = JSON.parse(message);

    socket.emit(
      "chatMessage",
      `You: ${data.message}. ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`
    );
    socket.broadcast.emit(
      "chatMessage",
      `${data.name}: ${data.message}. ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`
    );
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
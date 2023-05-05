const http = require("http");
const express = reqiure("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(_direname + "/insex.html");
});

io.on("connection", (ws) => {
    // sobi
    ws.emit("chatMessage", "Welcome to Chat");
    // inshum
    const data = JSON.parse(message);
    ws.broadcast.emit(`${data.username} ${data.message} ${new Date()}`);
  });
  
  server.listen(8080, () => {
    console.log("Server");
  });
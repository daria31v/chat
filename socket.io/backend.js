const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "*",
  },
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

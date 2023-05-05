const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });

io.on("connection", (ws) => {
  console.log("new client connected");
  clients.push(ws);

  for (const client of clients) {
    if (client !== ws) {
      client.send("Welcome to chat");
    } else {
      client.send(`New user connected, ${new Date()}`);
    }
  }
  wss.on("message", (message) => {
    const data = JSON.parse(message.toString());
    for (client of clients){
        client.send(`${data.user}, ${data.message} , ${new Date()}`);
    }
  });
});

console.log("server started");

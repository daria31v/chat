const { WebSocketServer } = require("ws");
const dayjs = require("dayjs");
const wss = new WebSocketServer({ port: 9090 });

const clients = [];

wss.on("connection", (socket) => {
  
  clients.push(socket);
  for (const client of clients) {
    if (client === socket) {
      
      client.send("Welcome to chat");
    } else {
      client.send(`New user connected, ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`);
    }
  }
  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    
    for (const client of clients){
      if (client === socket){
        client.send(`You: ${data.message}. ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`);
      } else {
        client.send(`${data.name}: ${data.message}. ${dayjs().format("HH:mm:ss DD/MM/YYYY")}`);
    }
  }
  });
});
console.log("server started 9090");

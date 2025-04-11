const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
  },
});

let players = {};

io.on("connection", (socket) => {
  players[socket.id] = { x: 10, y: 10 };
  console.log("Player connected:", socket.id);

  socket.on("move", (pos) => {
    players[socket.id] = pos;
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
  });
});

setInterval(() => {
  io.emit("state", players);
}, 200);

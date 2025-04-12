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

const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');

// ✅ client 폴더를 정적 파일로 서빙!
app.use(express.static(path.join(__dirname, 'client')));

const io = require('socket.io')(http);

// 나머지 소켓 관련 코드 유지
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', (msg) => {
        console.log(msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// ✅ 서버 포트 설정
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


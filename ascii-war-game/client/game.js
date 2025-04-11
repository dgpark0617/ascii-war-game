const socket = io("https://your-server-name.up.railway.app");

let display = new ROT.Display({ width: 40, height: 20 });
document.getElementById("game").appendChild(display.getContainer());

let player = { x: 10, y: 10 };

function draw() {
  display.clear();
  display.draw(player.x, player.y, "@");
}

draw();

window.addEventListener("click", (e) => {
  let tileX = Math.floor(Math.random() * 40);
  let tileY = Math.floor(Math.random() * 20);
  player.x = tileX;
  player.y = tileY;
  socket.emit("move", player);
  draw();
});

socket.on("state", (players) => {
  display.clear();
  for (let id in players) {
    let p = players[id];
    display.draw(p.x, p.y, "@", id === socket.id ? "white" : "gray");
  }
});

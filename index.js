const express = require("express");
const app = express();
const http = require("http").createServer(app);
const socket = require("socket.io");
const jogodaVelha = require("./sockets/jogoDaVelha");

const PORT = 3000;

const io = socket(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

jogodaVelha(io);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/game.html");
});

app.listen(PORT, () => console.log("listening", PORT));

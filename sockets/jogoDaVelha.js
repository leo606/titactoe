const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const players = [
  { id: "x", symbol: "" },
  { id: "y", symbol: "" },
];

let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer;

function gameValidation() {
  let roundWon = false;

  winningConditions.forEach((condition) => {
    let a = gameState[condition[0]];
    let b = gameState[condition[1]];
    let c = gameState[condition[2]];

    if (a === "" || b === "" || c === "") {
      return;
    }

    if (a === b && b === c) {
      return (roundWon = true);
    }
  });

  return roundWon;
}

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (players.length < 2) {
      players.push(socket.id);
      if (!currentPlayer) currentPlayer = socket.id;
    }

    io.on("playerTurn", (clicked) => {
      console.log(clicked);
      if (socket.id !== currentPlayer) {
        return socket.emit("wrongTurn");
      }

      // verificar jogo
      const gameResult = gameValidation();
      if (gameResult) {
        return io.emit("gameState", gameResult);
      }

      // troca currentPlayer
      currentPlayer = players.find((id) => id !== socket.id);
    });
  });
};

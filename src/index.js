import React, { useState } from "react";
import ReactDOM from "react-dom";

const rowStyle = {
  display: "flex"
};

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "grey",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "black"
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "208px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexDirection: "column",
  border: "3px #eee solid"
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px"
};

const buttonStyle = {
  marginTop: "15px",
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px"
};

function Square(props) {
  return (
    <div onClick={props.onClick} className="square" style={squareStyle}>
      {props.value}
    </div>
  );
}

function Board() {
  const [Squares, setSquares] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);
  const [count, setCount] = useState(9);

  const handleClick = index => {
    const squares = [...Squares];
    if (winner(Squares) || squares[index]) return;
    squares[index] = xNext ? "X" : "0";
    setSquares(squares);
    setXNext(!xNext);
    setCount(count - 1);
  };

  const handleReset = () => {
    setSquares([]);
    setCount(9);
  };

  function winner(squares) {
    const winningrows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningrows.length; i++) {
      const [a, b, c] = winningrows[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
  }
  const winners = winner(Squares);
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>
        {winner(Squares) ? "game over " : `Next player: ${xNext ? "X" : "0"}`}
      </div>
      <div className="winner" style={instructionsStyle}>
        {winner(Squares)
          ? ` Winner is ${winners}`
          : count === 0
          ? "Draw Match"
          : ""}
      </div>
      <button style={buttonStyle} onClick={() => handleReset()}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square value={Squares[0]} onClick={() => handleClick(0, 0)} />
          <Square value={Squares[1]} onClick={() => handleClick(1)} />
          <Square value={Squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={Squares[3]} onClick={() => handleClick(3)} />
          <Square value={Squares[4]} onClick={() => handleClick(4)} />
          <Square value={Squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={Squares[6]} onClick={() => handleClick(6)} />
          <Square value={Squares[7]} onClick={() => handleClick(7)} />
          <Square value={Squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

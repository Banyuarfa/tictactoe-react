/* eslint-disable react/prop-types */
import { useState } from "react";

export default function TicTacToe() {
  function Square({ value, onSquareClick }) {
    return (
      <button onClick={onSquareClick} className="square">
        {value}
      </button>
    );
  }
  function Board({ history, isNext, squares, onPlay }) {
    function handleClick(i) {
      const nextSquares = squares.slice();
      if (squares[i] || calculateWinner(squares)) return;
      isNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

      onPlay(nextSquares);
    }
    const winner = calculateWinner(squares);
    let status = "";
    if (winner) {
      status = `Winner: ${winner}`;
    } else if (history.length === 10 && !winner) {
      status = "It's a tie!";
    } else {
      status = `Turn: ${isNext ? "X" : "O"}`;
    }

    return (
      <>
        <div className="board">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <h2>{status}</h2>
      </>
    );
  }

  function Game() {
    const [isNext, setIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setIsNext(!isNext);
    }

    function jumpTo(nextMove) {
      setCurrentMove(nextMove);
      setIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
      let description = move > 0 ? `Go to move ${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    return (
      <>
        <div className="game">
          <h1>TicTacToe Arfa Banyu</h1>
          <div className="tictactoe">
            <div className="board">
              <Board
                history={history}
                isNext={isNext}
                squares={currentSquares}
                onPlay={handlePlay}
              />
            </div>
            <div className="history">
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </>
    );
  }

  function calculateWinner(square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (square[a] === square[b] && square[b] === square[c]) {
        return square[a];
      }
    }

    return false;
  }
  return (
    <>
      <Game />
    </>
  );
}

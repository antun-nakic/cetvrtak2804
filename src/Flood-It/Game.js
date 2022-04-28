import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Board from "./Board.js";
import { colorList } from "./colorList.js";
import { colorList2 } from "./colorList.js";
import EndScreen from "./EndScreen.js";
import "./style.css";


var board = [
  [5, 0, 1, 3, 5, 2, 4, 3, 1, 2],
  [2, 0, 1, 2, 5, 2, 4, 1, 1, 2],
  [2, 2, 2, 1, 5, 2, 4, 2, 2, 0],
  [4, 2, 1, 1, 3, 2, 4, 4, 1, 2],
  [0, 2, 1, 0, 0, 0, 4, 5, 2, 1],
  [1, 4, 1, 2, 1, 4, 4, 3, 2, 3],
  [2, 0, 0, 4, 3, 2, 2, 2, 2, 0],
  [0, 5, 0, 4, 3, 1, 5, 2, 2, 3],
  [4, 3, 0, 0, 5, 5, 5, 3, 2, 4],
  [3, 0, 3, 5, 3, 2, 4, 3, 2, 3],
]; 

 const randomBoard = () => {
   let arr = [];
   for (let i = 0; i < 10; i++) {
     arr.push(new Array());
     for (let j = 0; j < 10; j++) {
       arr[i].push(randomIndex(nColors));
     }
   }
   return arr;
 };

 function randomIndex(n){
   return Math.floor(Math.random()*n)
 }

var nSquares = 9;
var nColors = 4;
var flooded = [[0,0]];
var colors = colorList.slice(0, nColors);
var bestScore = 20;

board = randomBoard();

function Game(props) {
  //const [color, setColor] = useState(0); <- ovaj je nepotreban
    const [test, setTest] = useState(1);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("game");

  // Za svako potopljeno polje potopi susjede
  function floodNeighbours(i, j, color) {
    if (j < nSquares && board[i][j + 1] == color) {
      if (
        !flooded.find((e) => {
          return e[0] == i && e[1] == j + 1;
        })
      ) {
        flooded.push([i, j + 1]);
        floodNeighbours(i, j + 1, color);
      }
    }
    if (i > 0 && board[i][j - 1] == color) {
      if (
        !flooded.find((e) => {
          return e[0] == i && e[1] == j - 1;
        })
      ) {
        flooded.push([i, j - 1]);
        floodNeighbours(i, j - 1, color);
      }
    }
    if (i < nSquares && board[i + 1][j] == color) {
      if (
        !flooded.find((e) => {
          return e[0] == i + 1 && e[1] == j;
        })
      ) {
        flooded.push([i + 1, j]);
        floodNeighbours(i + 1, j, color);
      }
    }

    if (i > 0 && board[i - 1][j] == color) {
      if (
        !flooded.find((e) => {
          return e[0] == i - 1 && e[1] == j;
        })
      ) {
        flooded.push([i - 1, j]);
        floodNeighbours(i - 1, j, color);
      }
    }
  }

  const changeColor = (e) => {
    var color = e.target.id;
    // SetColor se ne koristi, bagira jer je asinhron
    // setColor(color);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        flooded.filter((el) => {
          if (el[0] == i && el[1] == j) {
            board[i][j] = color;
            floodNeighbours(i, j, color);
          }
        });
      }
    }
    if (gameOver()) setGameState("menu");
    else setScore(score + 1);
  };

  function gameOver() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (board[0][0] != board[i][j]) return false;
      }
    }
    if(score<bestScore) bestScore=score;
    return true;
  }

  function startNewGame(sendScore = false) {
   
    if (sendScore == true) {
      props.dodajUHighscore("floodIt", {
        ime: props.username,
        rezultat: score,
      });
    } 
     board = randomBoard();
     setGameState("game");
     setScore(0);
     flooded = [[0,0]]
     floodOnStart();
  }

  function floodOnStart(){
    flooded = [[0, 0]];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        flooded.filter((el) => {
          if (el[0] == i && el[1] == j) {
            board[i][j] = board[0][0];
            floodNeighbours(i, j, board[0][0]);
          }
        });
      }
    }
  }
  // Flood on inital
  useEffect(() => {
    floodOnStart();
  }, []);

  function shuffle(){
    board = startNewGame();
  }

  return (
    <React.Fragment>
      {gameState == "menu" && (
        <EndScreen startNewGame={startNewGame} score={score}></EndScreen>
      )}

      <div className="title-wrap">
        <h1 className="score">Score: {score}</h1>

        <h1 className="score" style={{ color: "#D44D5C" }}>
          Best: {bestScore == 20 ? 0 : bestScore}
        </h1>
      </div>
      <div className="flood-wrap">
        <Board board={board}></Board>
        <div className="flood-btn-wrap">
          <button
            onClick={()=>{
              setTest(test+1);
              startNewGame();
            }}
            className="flood-btn shuffle"
          ></button>
          {colors.map((c, index) => {
            return (
              <button
                className="flood-btn"
                style={{ backgroundColor: c }}
                id={index}
                key={index}
                onClick={changeColor}
              ></button>
            );
          })}
        </div>{" "}
        <h1 className="flood-title" style={{ color: "slateblue" }}>
          You're playing: Flood It! 
        </h1> <a href="">by Alan</a>
      </div>
    </React.Fragment>
  );
}
export default Game;

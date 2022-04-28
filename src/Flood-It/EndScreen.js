import React from 'react'
import "./style.css"

function EndScreen(props) {
  return (
    <div id="myModal" className="my-modal">
        <div className="my-modal-content">
          <h1 className="endScore">Score: {props.score}</h1>
          <button
            onClick={() => {
              props.startNewGame();
            }}
            className="startNew"
          >
            Započni novu
          </button>
          <button
            onClick={() => {
              props.startNewGame(true);
            }}
            className="posaljiScore"
          >
            Pošalji score
          </button>
        </div>
      </div>
  )
}

export default EndScreen
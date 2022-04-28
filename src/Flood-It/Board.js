import React, { Component } from 'react';
import { colorList } from "./colorList.js";
import { colorList2 } from "./colorList.js";

// Ovo je glupa komponenta
function Board({board}){

    let arr = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // Boja
        let index = board[i][j];
        arr.push(
          <div
            key={10 * i + j}
            className="square"
            style={{
              backgroundColor: colorList[index]
            }}
          ></div>
        );
      }
    }
    return (
        <div className="boardWrap">
          {arr}
        </div>
    );
  

}
export default Board;

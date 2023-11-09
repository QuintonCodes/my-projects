import React from "react";
import "./Buttons.css";

function Buttons({ symbol, color, handleClick }) {
  return (
    <div
      className="button-wrapper"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </div>
  );
}

export default Buttons;

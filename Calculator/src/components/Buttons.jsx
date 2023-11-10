import React from "react";
import "./Buttons.css";

function Buttons({ symbol, color, handleClick, className }) {
  const buttonClass = `button-wrapper ${className || ""}`;

  return (
    <div
      className={buttonClass}
      style={{ backgroundColor: color }}
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </div>
  );
}

export default Buttons;

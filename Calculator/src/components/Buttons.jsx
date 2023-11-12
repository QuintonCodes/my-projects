import PropTypes from "prop-types";
import "./Buttons.css";

function Buttons({ color, className, handleClick, symbol }) {
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

Buttons.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  symbol: PropTypes.string.isRequired,
};

export default Buttons;

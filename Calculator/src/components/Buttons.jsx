import PropTypes from "prop-types";

function Buttons({ color, handleClick, symbol }) {
  return (
    <div
      className="items-center bg-[#5a5a5a] rounded-[25px] text-white cursor-pointer flex flex-[1] text-2xl h-20 justify-center m-1"
      style={{ backgroundColor: color }}
      onClick={() => handleClick(symbol)}
    >
      {symbol}
    </div>
  );
}

Buttons.propTypes = {
  color: PropTypes.string,
  handleClick: PropTypes.func,
  symbol: PropTypes.string.isRequired,
};

export default Buttons;

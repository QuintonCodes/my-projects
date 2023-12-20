import PropTypes from "prop-types";

function Input({ text, result }) {
  return (
    <div className="items-end text-white flex flex-col h-40 justify-end p-4">
      <div className="flex-[1] text-5xl">
        <h1>{result}</h1>
      </div>
      <div className="flex-[1] text-xl pt-5">
        <h3>{text}</h3>
      </div>
    </div>
  );
}

Input.propTypes = {
  text: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
};

export default Input;

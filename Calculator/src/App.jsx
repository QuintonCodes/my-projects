import React, { useState } from "react";
import { evaluate } from "mathjs";
import Buttons from "./components/Buttons";
import Input from "./components/Input";
import "./app.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (val) => {
    setText((text) => [...text, val + " "]);
  };

  const calcResult = () => {
    const input = text.join(""); // Removes commas

    setResult(evaluate(input));
  };

  const clear = () => {
    setText("");
    setResult("");
  };

  const buttonColor = "#f2a33c";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />

        <div className="row">
          <Buttons symbol="7" handleClick={addToText} />
          <Buttons symbol="8" handleClick={addToText} />
          <Buttons symbol="9" handleClick={addToText} />
          <Buttons symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="4" handleClick={addToText} />
          <Buttons symbol="5" handleClick={addToText} />
          <Buttons symbol="6" handleClick={addToText} />
          <Buttons symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="1" handleClick={addToText} />
          <Buttons symbol="2" handleClick={addToText} />
          <Buttons symbol="3" handleClick={addToText} />
          <Buttons symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="0" handleClick={addToText} />
          <Buttons symbol="." handleClick={addToText} />
          <Buttons symbol="=" handleClick={calcResult} />
          <Buttons symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <Buttons symbol="Clear" color="red" handleClick={clear} />
      </div>
    </div>
  );
}

export default App;

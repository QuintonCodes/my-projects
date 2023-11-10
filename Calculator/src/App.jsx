import React, { useState } from "react";
import * as math from "mathjs";
import Buttons from "./components/Buttons";
import Input from "./components/Input";
import "./app.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (val) => {
    if (val === "%") {
      const lastNumberIndex = findLastNumberIndex(text);
      if (lastNumberIndex !== -1) {
        const lastNumber = parseFloat(text.slice(lastNumberIndex).join(""));
        const percentage = lastNumber / 100;
        setText((text) => [
          ...text.slice(0, lastNumberIndex),
          ...percentage.toString().split(""),
          " ",
        ]);
      }
    } else if (val === ".") {
      const lastValue = text[text.length - 1];
      if (!isNaN(lastValue) && !lastValue.includes(".")) {
        setText((text) => [...text, val]);
      } else if (
        lastValue === undefined ||
        lastValue === "=" ||
        isNaN(lastValue)
      ) {
        setText((text) => [...text, "0" + val]);
      }
    } else {
      setText((text) => [...text, val]);
    }
  };

  const findLastNumberIndex = (text) => {
    for (let i = text.length - 1; i >= 0; i--) {
      const current = text[i];
      if (!isNaN(current) || current === ".") {
        return i;
      }
    }
    return -1;
  };

  const calcResult = () => {
    const input = text.join(""); // Removes commas

    setResult(math.evaluate(input));
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
          <Buttons
            symbol="Clear"
            color="red"
            handleClick={clear}
            className="wide-button"
          />
          <Buttons symbol="%" color={buttonColor} handleClick={addToText} />
          <Buttons symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="7" handleClick={addToText} />
          <Buttons symbol="8" handleClick={addToText} />
          <Buttons symbol="9" handleClick={addToText} />
          <Buttons symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="4" handleClick={addToText} />
          <Buttons symbol="5" handleClick={addToText} />
          <Buttons symbol="6" handleClick={addToText} />
          <Buttons symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="1" handleClick={addToText} />
          <Buttons symbol="2" handleClick={addToText} />
          <Buttons symbol="3" handleClick={addToText} />
          <Buttons symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Buttons symbol="0" handleClick={addToText} className="wide-button" />
          <Buttons symbol="." handleClick={addToText} />
          <Buttons symbol="=" color={buttonColor} handleClick={calcResult} />
        </div>
      </div>
    </div>
  );
}

export default App;

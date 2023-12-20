import { useState } from "react";
import * as math from "mathjs";
import Buttons from "./components/Buttons";
import Input from "./components/Input";

function App() {
  const [lastWasPercentage, setLastWasPercentage] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (val) => {
    if (val === "%") {
      setLastWasPercentage(true);
      let lastIndex = text.length - 1;
      while (lastIndex >= 0 && !isNaN(text[lastIndex])) {
        lastIndex--;
      }

      const number = text.slice(lastIndex + 1).join("");

      if (number) {
        const percentage = parseFloat(number) / 100;
        setText((text) => [
          ...text.slice(0, lastIndex + 1),
          ...percentage.toString().split(""),
          " ",
        ]);
      } else if (result) {
        setResult(result / 100);
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
    } else if (lastWasPercentage) {
      setLastWasPercentage(false);
    } else {
      setText((text) => [...text, val]);
    }
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
    <div className="items-center flex justify-center">
      <div className="bg-black rounded-2xl w-[400px]">
        <Input text={text} result={result} />

        <div className="flex">
          <Buttons
            symbol="Clear"
            color="red"
            handleClick={clear}
            className="flex-[2]"
          />
          <Buttons symbol="%" color={buttonColor} handleClick={addToText} />
          <Buttons symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="flex">
          <Buttons symbol="7" handleClick={addToText} />
          <Buttons symbol="8" handleClick={addToText} />
          <Buttons symbol="9" handleClick={addToText} />
          <Buttons symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="flex">
          <Buttons symbol="4" handleClick={addToText} />
          <Buttons symbol="5" handleClick={addToText} />
          <Buttons symbol="6" handleClick={addToText} />
          <Buttons symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="flex">
          <Buttons symbol="1" handleClick={addToText} />
          <Buttons symbol="2" handleClick={addToText} />
          <Buttons symbol="3" handleClick={addToText} />
          <Buttons symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="flex">
          <Buttons symbol="0" handleClick={addToText} className="wide-button" />
          <Buttons symbol="." handleClick={addToText} />
          <Buttons symbol="=" color={buttonColor} handleClick={calcResult} />
        </div>
      </div>
    </div>
  );
}

export default App;

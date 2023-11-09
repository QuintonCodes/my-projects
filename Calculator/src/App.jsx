import React, { useEffect, useRef, useState } from "react";
import "./app.css";

function App() {
  const screenRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("");
  const [previousValue, setPreviousValue] = useState("");
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    const removeListeners = initializeCalc();

    return () => {
      removeListeners();
    };
  }, []);

  const updateScreen = () => {
    screenRef.current.value = currentValue;
  };

  const handleNumberClick = (number) => {
    setCurrentValue(currentValue + number);
    updateScreen();
  };

  const handleOperatorClick = (op) => {
    if (currentValue !== "") {
      setPreviousValue(currentValue);
      setCurrentValue("");
      setOperator(op);
    }
  };

  const handleClear = () => {
    setCurrentValue("");
    setPreviousValue("");
    setOperator(null);
    updateScreen();
  };

  const handleEqualClick = () => {
    if (previousValue !== "" && operator !== null) {
      const num1 = parseFloat(previousValue);
      const num2 = parseFloat(currentValue);

      switch (operator) {
        case "+":
          setCurrentValue(num1 + num2);
          break;
        case "-":
          setCurrentValue(num1 - num2);
          break;
        case "*":
          setCurrentValue(num1 * num2);
          break;
        case "/":
          setCurrentValue(num1 / num2);
          break;
        case "%":
          setCurrentValue((num1 * num2) / 100);
        default:
          break;
      }

      setPreviousValue("");
      setOperator(null);
    }
    updateScreen();
  };

  const initializeCalc = () => {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const buttonValue = e.target.getAttribute("data-num");

        if (buttonValue === "=") {
          handleEqualClick();
        } else if (buttonValue === "C") {
          handleClear();
        } else {
          if (!isNaN(buttonValue) || buttonValue === ".") {
            handleNumberClick(buttonValue);
          } else {
            handleOperatorClick(buttonValue);
          }
        }
      });
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("click", (e) => {
          const buttonValue = e.target.getAttribute("data-num");

          if (buttonValue === "=") {
            handleEqualClick();
          } else if (buttonValue === "C") {
            handleClear();
          } else {
            if (!isNaN(buttonValue) || buttonValue === ".") {
              handleNumberClick(buttonValue);
            } else {
              handleOperatorClick(buttonValue);
            }
          }
        });
      });
    };
  };

  return (
    <>
      <form className="textarea">
        <input type="text" className="screen" id="txt" ref={screenRef} />
      </form>

      <div className="buttons">
        <button
          type="button"
          className="btn btn-clear"
          id="allcancel"
          onClick={handleClear}
        >
          AC
        </button>
        <button
          type="button"
          className="btn btn-clear"
          id="cancel"
          onClick={handleClear}
        >
          C
        </button>
        <button type="button" className="btn btn-yellow" data-num="%">
          %
        </button>
        <button
          type="button"
          className="btn btn-yellow"
          data-num="/"
          onClick={() => handleOperatorClick("/")}
        >
          /
        </button>

        <button
          type="button"
          className="btn btn-grey"
          data-num="7"
          onClick={() => handleNumberClick("7")}
        >
          7
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="8"
          onClick={() => handleNumberClick("8")}
        >
          8
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="9"
          onClick={() => handleNumberClick("9")}
        >
          9
        </button>
        <button
          type="button"
          className="btn btn-yellow"
          data-num="*"
          onClick={() => handleOperatorClick("*")}
        >
          *
        </button>

        <button
          type="button"
          className="btn btn-grey"
          data-num="4"
          onClick={() => handleNumberClick("4")}
        >
          4
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="5"
          onClick={() => handleNumberClick("5")}
        >
          5
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="6"
          onClick={() => handleNumberClick("6")}
        >
          6
        </button>
        <button
          type="button"
          className="btn btn-yellow"
          data-num="-"
          onClick={() => handleOperatorClick("-")}
        >
          -
        </button>

        <button
          type="button"
          className="btn btn-grey"
          data-num="1"
          onClick={() => handleNumberClick("1")}
        >
          1
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="2"
          onClick={() => handleNumberClick("2")}
        >
          2
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="3"
          onClick={() => handleNumberClick("3")}
        >
          3
        </button>
        <button
          type="button"
          className="btn btn-yellow"
          data-num="+"
          onClick={() => handleOperatorClick("+")}
        >
          +
        </button>

        <button
          id="zero"
          type="button"
          className="btn btn-grey"
          data-num="0"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>
        <button
          type="button"
          className="btn btn-grey"
          data-num="."
          onClick={() => handleNumberClick(".")}
        >
          .
        </button>
        <button
          type="button"
          className="btn btn-equal"
          onClick={handleEqualClick}
        >
          =
        </button>
      </div>
    </>
  );
}

export default App;

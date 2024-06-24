import { useState } from "react";
import { evaluate } from "mathjs";

const useCalculator = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const addToText = (value: string) => {
    setText((prev) => prev + value);
  };

  const clear = () => {
    setText("");
    setResult("");
  };

  const calcResult = () => {
    try {
      const evaluatedResult = evaluate(text);
      setResult(evaluatedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  return { text, result, addToText, clear, calcResult };
};

export default useCalculator;

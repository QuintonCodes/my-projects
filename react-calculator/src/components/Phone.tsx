import Buttons from "./Buttons";
import InputField from "./InputField";
import useCalculator from "../hooks/useCalculator";

const Phone = () => {
  const { text, result, addToText, clear, calcResult } = useCalculator();

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="h-[44rem] w-[23rem] border-solid border-[10px] border-black rounded-[4rem] relative bg-black/[0.94] z-10">
        <div className="flex flex-col h-full justify-between p-4">
          <InputField text={text} result={result} />

          <div className="w-full items-center">
            <div className="flex">
              <Buttons
                symbol="Clear"
                color="red"
                handleClick={clear}
                flex={2}
              />
              <Buttons symbol="%" color="orange" handleClick={addToText} />
              <Buttons symbol="/" color="orange" handleClick={addToText} />
            </div>
            <div className="flex">
              <Buttons symbol="7" handleClick={addToText} />
              <Buttons symbol="8" handleClick={addToText} />
              <Buttons symbol="9" handleClick={addToText} />
              <Buttons symbol="*" color="orange" handleClick={addToText} />
            </div>
            <div className="flex">
              <Buttons symbol="4" handleClick={addToText} />
              <Buttons symbol="5" handleClick={addToText} />
              <Buttons symbol="6" handleClick={addToText} />
              <Buttons symbol="-" color="orange" handleClick={addToText} />
            </div>
            <div className="flex">
              <Buttons symbol="1" handleClick={addToText} />
              <Buttons symbol="2" handleClick={addToText} />
              <Buttons symbol="3" handleClick={addToText} />
              <Buttons symbol="+" color="orange" handleClick={addToText} />
            </div>
            <div className="flex">
              <Buttons symbol="0" handleClick={addToText} flex={2} />
              <Buttons symbol="." handleClick={addToText} />
              <Buttons symbol="=" color="orange" handleClick={calcResult} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[44rem] w-[23rem] border-solid border-[10px] border-black rounded-[4rem] absolute before:content-[''] before:absolute before:border before:border-solid before:border-white/[0.2] before:rounded-[4rem] before:h-[45.5rem] before:w-[24.5rem] before:left-[-10px] before:top-[-10px] after:content-[''] after:absolute after:border after:border-solid after:border-black after:bg-black after:rounded-b-[20px] after:h-8 after:w-1/2 after:left-1/4 after:top-[-1px]"></div>
    </div>
  );
};

export default Phone;

interface InputFieldProps {
  text: string;
  result: string;
}

const InputField = ({ text, result }: InputFieldProps) => {
  return (
    <div className="items-end text-white flex flex-col h-40 justify-end p-4 pt-10">
      <div className="flex-[1] text-6xl">
        <h1>{result}</h1>
      </div>
      <div className="flex-[1] text-3xl pt-5">
        <h2>{text}</h2>
      </div>
    </div>
  );
};

export default InputField;

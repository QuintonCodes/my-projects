import React, { useEffect, useRef } from "react";
import { initializeCalc, removeEventListeners } from "./script";
import "./app.css";

function App() {
  const screenRef = useRef(null);

  useEffect(() => {
    const removeListeners = initializeCalc();

    return () => {
      removeEventListeners(removeListeners);
    };
  }, []);

  return (
    <>
      <form className="textarea">
        <input type="text" className="screen" id="txt" ref={screenRef} />
      </form>

      <div className="buttons">
        <button type="button" className="btn btn-clear" id="allcancel">
          AC
        </button>
        <button type="button" className="btn btn-clear" id="cancel">
          C
        </button>
        <button type="button" className="btn btn-yellow" data-num="%">
          %
        </button>
        <button type="button" className="btn btn-yellow" data-num="/">
          /
        </button>

        <button type="button" className="btn btn-grey" data-num="7">
          7
        </button>
        <button type="button" className="btn btn-grey" data-num="8">
          8
        </button>
        <button type="button" className="btn btn-grey" data-num="9">
          9
        </button>
        <button type="button" className="btn btn-yellow" data-num="*">
          *
        </button>

        <button type="button" className="btn btn-grey" data-num="4">
          4
        </button>
        <button type="button" className="btn btn-grey" data-num="5">
          5
        </button>
        <button type="button" className="btn btn-grey" data-num="6">
          6
        </button>
        <button type="button" className="btn btn-yellow" data-num="-">
          -
        </button>

        <button type="button" className="btn btn-grey" data-num="1">
          1
        </button>
        <button type="button" className="btn btn-grey" data-num="2">
          2
        </button>
        <button type="button" className="btn btn-grey" data-num="3">
          3
        </button>
        <button type="button" className="btn btn-yellow" data-num="+">
          +
        </button>

        <button id="zero" type="button" className="btn btn-grey" data-num="0">
          0
        </button>
        <button type="button" className="btn btn-grey" data-num=".">
          .
        </button>
        <button type="button" className="btn btn-equal">
          =
        </button>
      </div>
    </>
  );
}

export default App;

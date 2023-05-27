import React, { createContext, useState, useEffect } from "react";

export const MouseContext = createContext({
  cursorType: "",
  cursorChangeHandler: () => {},
});

const MouseContextProvider = (props) => {
  const [cursorType, setCursorType] = useState("");

  const cursorChangeHandler = (cursorType) => {
    setCursorType(cursorType);
  };

  useEffect(() => {
    // Update the document's cursor style based on the cursorType
    if (cursorType) {
      document.body.style.cursor = cursorType;
    } else {
      document.body.style.cursor = "auto";
    }
  }, [cursorType]);

  return (
    <MouseContext.Provider
      value={{
        cursorType: cursorType,
        cursorChangeHandler: cursorChangeHandler,
      }}
    >
      <div className={`cursor ${cursorType}`}></div> 
      {props.children}
    </MouseContext.Provider>
  );
};

export default MouseContextProvider;

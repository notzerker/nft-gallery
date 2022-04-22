import useStore from "../lib/store";
import React, { createContext, useState, useEffect } from "react";

let Context = createContext();

function Provider(props) {
  const dark = useStore((state) => state.dark);
  const setDark = useStore((state) => state.setDark);

  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("dark") == null) {
      localStorage.setItem("dark", dark);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("dark") == "true") {
      setDark();
    }
  }, []);

  const setDarkHandler = () => {
    setDark();
    if (localStorage) {
      if (dark == false) {
        localStorage.setItem("dark", true);
      } else {
        localStorage.setItem("dark", false);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        dark: dark,
        setDarkHandler: setDarkHandler,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

const Consumer = Context.Consumer;
export { Provider, Consumer, Context };

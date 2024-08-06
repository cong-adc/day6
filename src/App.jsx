import { createContext, useContext, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useMemo } from "react";

import ao from "./assets/ao.png";
const listSum1 = new Set([]);
const listSum2 = new Set([]);

const initState = { count: 0, total: 0 };

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "INCREMENT": {
      return { count: state.count + 1 };
    }
    case "DECREMENT": {
      return { count: state.count - 1 };
    }
    default: {
      throw new Error("Error");
    }
  }
}

export const ThemeContext = createContext("dark");

const Room = () => {
  const theme = useContext(ThemeContext);
  console.log("theme Room", theme);
  return <h1>Room is {theme}</h1>;
};

const Layout = () => {
  return (
    <div>
      Layout
      <Room />
    </div>
  );
};

const useWidownsWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleChange = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleChange);

    return () => window.removeEventListener("resize", handleChange);
  }, []);

  return width;
};

function App() {
  const [theme, setTheme] = useState("dark");
  const width = useWidownsWidth();

  console.log("width", width);

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const themeStore = JSON.parse(localStorage.getItem("theme"));

    setTheme(themeStore.theme || "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify({ theme }));
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Layout />
        {/* <img src={ao} /> */}
        <br />
        <button onClick={handleChangeTheme}>Update dark/light</button>
      </ThemeContext.Provider>
    </>
  );
}

export default App;

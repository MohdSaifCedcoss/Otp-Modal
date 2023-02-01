import React, { createContext, useState } from "react";
import "./App.css";
import Register from "./components/Register";
export const NUMBER = createContext({} as any);
function App() {
  // creating common state
  const [number, setNumber] = useState<number>();
  return (
    <div className="App">
      <NUMBER.Provider value={{ number, setNumber }}>
        <Register />
      </NUMBER.Provider>
    </div>
  );
}

export default App;

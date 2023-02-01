import React, { createContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import OtpLayout from "./components/OtpLayout";
import Register from "./components/Register";

export const NUMBER = createContext({} as any);
function App() {
  const [number, setNumber] = useState<Number>();
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Register />}></Route>
        <Route path="/modal" element={<OtpLayout />} />
      </>
    )
  );

  return (
    <div className="App">
      <NUMBER.Provider value={{ number, setNumber }}>
        <RouterProvider router={router}></RouterProvider>
      </NUMBER.Provider>
    </div>
  );
}

export default App;

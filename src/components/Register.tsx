import React, { useContext, useEffect } from "react";
import { NUMBER } from "../App";
import OtpLayout from "./OtpLayout";

const Register = () => {
  // Here using useContext to get the common state
  const USE_NUMBER = useContext(NUMBER);

  //This will generate a five digit random number and will set it to the context
  useEffect(() => {
    const num = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    USE_NUMBER.setNumber(num);
  }, []);

  return (
    <div>
      {/* Calling component which will show modal */}
      <OtpLayout />
    </div>
  );
};

export default Register;

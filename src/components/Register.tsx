import React, { useCallback, useContext, useEffect } from "react";
import { NUMBER } from "../App";
import OtpLayout from "./OtpLayout";

const Register = () => {
  const USE_NUMBER = useContext(NUMBER);
  useEffect(() => {
    const num = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    USE_NUMBER.setNumber(num);
  }, []);

  return (
    <div>
      <OtpLayout />
    </div>
  );
};

export default Register;

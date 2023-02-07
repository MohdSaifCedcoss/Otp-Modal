import React, { useRef, useState } from "react";
import NewLayout from "./NewLayout";

const Register = () => {
  const [digits, setdigits] = useState<Number>();
  const inputRef = useRef<HTMLInputElement>(null!);
  // This method will generate the otp acccording to the number of digits
  const generateNumber = () => {
    let max = 0;
    let min = 0;
    switch (digits) {
      case 4:
        max = 9999;
        min = 1000;
        break;
      case 5:
        max = 99999;
        min = 10000;
        break;
      case 6:
        max = 999999;
        min = 100000;
        break;
      case 7:
        max = 9999999;
        min = 1000000;
        break;
    }
    const num = Math.ceil(Math.random() * (max - min) + min);
    return num;
  };

  // for setting the digits
  const getDigits = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdigits(Number(e.target.value));
  };

  // For validating the data entered by the user
  const checkDigits = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (String(digits) === "" || isNaN(Number(digits))) {
      alert("Digits field cant be left empty and should have digits only !");
      inputRef.current.focus();
      return;
    } else if (Number(digits) < 4 || Number(digits) > 7) {
      alert("Number can be in range from 4 to 7");
      inputRef.current.focus();
      return;
    }
  };

  return (
    <div className="card shadow main_container">
      {/* Calling component which will show modal */}
      <form
        onSubmit={(e: React.SyntheticEvent) => checkDigits(e)}
        style={{ textAlign: "center" }}
      >
        <div className="input-group mb-3 digit_input">
          <input
            type="text"
            className="form-control"
            maxLength={1}
            ref={inputRef}
            autoFocus
            placeholder="Enter digits for OTP"
            aria-label="Enter digits for OTP"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => getDigits(e)}
            aria-describedby="basic-addon1"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Validate OTP
        </button>
      </form>
      {Number(digits) >= 4 && Number(digits) <= 7 ? (
        <NewLayout
          digit={digits as Number}
          generateNumber={generateNumber as any}
        />
      ) : null}
    </div>
  );
};

export default Register;

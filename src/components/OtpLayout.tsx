import React, { useContext, useEffect, useRef, useState } from "react";
import { NUMBER } from "../App";

const OtpLayout = () => {
  // Getting context for using it as common state
  const USE_NUMBER = useContext(NUMBER);

  // Declarations of all the refs which will be needed
  const inputOneRef = useRef<HTMLInputElement>(null!);
  const inputTwoRef = useRef<HTMLInputElement>(null!);
  const inputThreeRef = useRef<HTMLInputElement>(null!);
  const inputFourRef = useRef<HTMLInputElement>(null!);
  const inputFiveRef = useRef<HTMLInputElement>(null!);
  const modalDiv = useRef<HTMLDivElement>(null!);

  // Here state for storing the entered number
  const [numberOne, setNumberOne] = useState<string>("");
  const [numberTwo, setNumberTwo] = useState<string>("");
  const [numberThree, setNumberThree] = useState<string>("");
  const [numberFour, setNumberFour] = useState<string>("");
  const [numberFive, setNumberFive] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(5);

  // These states are for showing and hiding the status
  const [disable, setDisable] = useState<boolean>(true);
  const [show, setShow] = useState<string>("none");
  const [showSuccess, setShowSuccess] = useState<string>("none");

  // This state is for countdown timer
  const [countDown, setCountDown] = useState<number>(60);

  // This state is for storing the generated OTP in array format
  const [numberArray, setNumberArray] = useState<number[]>([]);

  useEffect(() => {
    // Converting OTP to array so that each digit can be matched seperately
    const arrayDigits = Array.from(String(USE_NUMBER.number), Number);
    setNumberArray(arrayDigits);
    modalDiv.current.addEventListener("shown.bs.modal", function () {
      inputOneRef.current.focus();
    });
    // This will start the timer
    let time = setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    if (countDown === 0) {
      setShowSuccess("none");
      clearTimeout(time);
      setDisable(false);
    }
  }, [countDown]);

  // This will check for input data is only number from 0-9 and no space and will shift the focus to next input
  const checkCharacter = (ref: any, nextRef: any, method: any) => {
    if (
      Number(ref.current.value) >= 0 &&
      Number(ref.current.value) <= 9 &&
      ref.current.value !== " "
    ) {
      method(ref.current.value);
      nextRef.current.focus();
    } else {
      method("");
    }
  };

  // This method will check for the last digit and match if the input data/mumbers matches with OTP or not
  const checkFiveCharacter = () => {
    if (
      Number(inputFiveRef.current.value) >= 0 &&
      Number(inputFiveRef.current.value) <= 9 &&
      inputFiveRef.current.value !== " "
    ) {
      setNumberFive(inputFiveRef.current.value);
      if (
        Number(numberOne) === numberArray[0] &&
        Number(numberTwo) === numberArray[1] &&
        Number(numberThree) === numberArray[2] &&
        Number(numberFour) === numberArray[3] &&
        Number(inputFiveRef.current.value) === numberArray[4]
      ) {
        setShow("none");
        inputFiveRef.current.blur();
        inputOneRef.current.style.border = "2px solid green";
        inputTwoRef.current.style.border = "2px solid green";
        inputThreeRef.current.style.border = "2px solid green";
        inputFourRef.current.style.border = "2px solid green";
        inputFiveRef.current.style.border = "2px solid green";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setShow("block");
        setShowSuccess("none");
        inputFiveRef.current.blur();
        inputOneRef.current.style.border = "2px solid red";
        inputTwoRef.current.style.border = "2px solid red";
        inputThreeRef.current.style.border = "2px solid red";
        inputFourRef.current.style.border = "2px solid red";
        inputFiveRef.current.style.border = "2px solid red";
      }
    } else {
      setNumberFive("");
    }
  };

  // This method will set the OTP when clicked on resend OTP
  const generateNumber = () => {
    if (attempts === 0) {
      let confirm = window.confirm(
        "All your attempts have been used ,,Click Ok to start again"
      );
      if (confirm === true) {
        window.location.reload();
      }
    }
    setDisable(true);
    setCountDown(60);
    setShowSuccess("block");
    setAttempts((prev) => prev - 1);
    const num = Math.ceil(Math.random() * (99999 - 10000) + 10000);
    USE_NUMBER.setNumber(num);
  };

  return (
    <div>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary position"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Validate OTP
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        ref={modalDiv}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Verify Email Address({USE_NUMBER.number})
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="head">Enter Your Code Here</p>
              <div className="input_container">
                <input
                  ref={inputOneRef}
                  type="text"
                  value={numberOne}
                  className="input"
                  onChange={() =>
                    checkCharacter(inputOneRef, inputTwoRef, setNumberOne)
                  }
                  maxLength={1}
                  autoFocus
                />
                <input
                  type="text"
                  value={numberTwo}
                  onChange={() =>
                    checkCharacter(inputTwoRef, inputThreeRef, setNumberTwo)
                  }
                  ref={inputTwoRef}
                  className="input"
                  maxLength={1}
                />
                <input
                  type="text"
                  value={numberThree}
                  onChange={() =>
                    checkCharacter(inputThreeRef, inputFourRef, setNumberThree)
                  }
                  ref={inputThreeRef}
                  className="input"
                  maxLength={1}
                />
                <input
                  type="text"
                  value={numberFour}
                  onChange={() =>
                    checkCharacter(inputFourRef, inputFiveRef, setNumberFour)
                  }
                  ref={inputFourRef}
                  className="input"
                  maxLength={1}
                />
                <input
                  type="text"
                  value={numberFive}
                  onChange={() => checkFiveCharacter()}
                  ref={inputFiveRef}
                  className="input"
                  maxLength={1}
                />
                <h6 className="resend_success" style={{ display: showSuccess }}>
                  One-Time Password sent succesffully!
                </h6>
                <h6 className="resend_alert" style={{ display: show }}>
                  Entered one time password is incorrect
                </h6>
                <div>
                  <span className="resend_class">
                    {" "}
                    <button
                      className="resend"
                      disabled={disable}
                      onClick={() => generateNumber()}
                    >
                      Resend OTP
                    </button>{" "}
                    <p className="attempts_class"> ({attempts} left)</p>
                    <span className="timer">{countDown} sec left</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpLayout;

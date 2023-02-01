import React, { useContext, useEffect, useRef, useState } from "react";
import { NUMBER } from "../App";

const OtpLayout = () => {
  const USE_NUMBER = useContext(NUMBER);

  const inputOneRef = useRef<HTMLInputElement>(null!);
  const inputTwoRef = useRef<HTMLInputElement>(null!);
  const inputThreeRef = useRef<HTMLInputElement>(null!);
  const inputFourRef = useRef<HTMLInputElement>(null!);
  const inputFiveRef = useRef<HTMLInputElement>(null!);

  const modalDiv = useRef<HTMLDivElement>(null!);

  const [numberOne, setNumberOne] = useState<string>("");
  const [numberTwo, setNumberTwo] = useState<string>("");
  const [numberThree, setNumberThree] = useState<string>("");
  const [numberFour, setNumberFour] = useState<string>("");
  const [numberFive, setNumberFive] = useState<string>("");
  const [attempts, setAttempts] = useState<number>(5);

  const [disable, setDisable] = useState<boolean>(true);
  const [show, setShow] = useState<string>("none");
  const [showSuccess, setShowSuccess] = useState<string>("none");

  const [countDown, setCountDown] = useState<number>(60);

  const [numberArray, setNumberArray] = useState<number[]>([]);
  useEffect(() => {
    const arrayDigits = Array.from(String(USE_NUMBER.number), Number);
    setNumberArray(arrayDigits);
    modalDiv.current.addEventListener("shown.bs.modal", function () {
      inputOneRef.current.focus();
    });
    setTimeout(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    if (countDown === 0) {
      setCountDown(60);
      setShowSuccess("none");
      setDisable(false);
    }
  }, [countDown]);

  const checkFirstCharacter = () => {
    if (
      Number(inputOneRef.current.value) >= 0 &&
      Number(inputOneRef.current.value) <= 9
    ) {
      setNumberOne(inputOneRef.current.value);
      inputTwoRef.current.focus();
    } else {
      setNumberOne("");
    }
  };

  const checkSecondCharacter = () => {
    if (
      Number(inputTwoRef.current.value) >= 0 &&
      Number(inputTwoRef.current.value) <= 9
    ) {
      setNumberTwo(inputTwoRef.current.value);
      inputThreeRef.current.focus();
    } else {
      setNumberTwo("");
    }
  };

  const checkThirdCharacter = () => {
    if (
      Number(inputThreeRef.current.value) >= 0 &&
      Number(inputThreeRef.current.value) <= 9
    ) {
      setNumberThree(inputThreeRef.current.value);
      inputFourRef.current.focus();
    } else {
      setNumberThree("");
    }
  };

  const checkFourCharacter = () => {
    if (
      Number(inputFourRef.current.value) >= 0 &&
      Number(inputFourRef.current.value) <= 9
    ) {
      setNumberFour(inputFourRef.current.value);
      inputFiveRef.current.focus();
    } else {
      setNumberFour("");
    }
  };

  const checkFiveCharacter = () => {
    if (
      Number(inputFiveRef.current.value) >= 0 &&
      Number(inputFiveRef.current.value) <= 9
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

  const generateNumber = () => {
    setDisable(true);
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
                  onChange={() => checkFirstCharacter()}
                  maxLength={1}
                  autoFocus
                />
                <input
                  type="text"
                  value={numberTwo}
                  onChange={() => checkSecondCharacter()}
                  ref={inputTwoRef}
                  className="input"
                  maxLength={1}
                />
                <input
                  type="text"
                  value={numberThree}
                  onChange={() => checkThirdCharacter()}
                  ref={inputThreeRef}
                  className="input"
                  maxLength={1}
                />
                <input
                  type="text"
                  value={numberFour}
                  onChange={() => checkFourCharacter()}
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

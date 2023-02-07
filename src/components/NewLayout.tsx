import React, { useContext, useEffect, useRef, useState } from "react";
import { NUMBER } from "../App";
type propTypes = {
  digit: Number;
  generateNumber: any;
};

const NewLayout = (props: propTypes) => {
  // getting context
  const USE_NUMBER = useContext(NUMBER);
  // This is for referencing the modal div
  const modalDiv = useRef<HTMLDivElement>(null!);

  // States which will be used in application
  const [refs, setRefs] = useState<any>([]);
  const [showError, setShowError] = useState<string>("none");
  const [showSuccess, setShowSuccess] = useState<string>("none");
  const [showVerifified, setShowVerified] = useState<string>("none");
  const [showLoader, setShowLoader] = useState<string>("none");
  const [borderColor, setBorderColor] = useState<string>("black");
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [attempts, setAttempts] = useState<number>(4);
  const [countdown, setCountdown] = useState<number>(59);

  // This will convert the generated OTP to array
  const arrayDigits = Array.from(String(USE_NUMBER.number), Number);

  // This useEffect will make the dynamic input boxes on the basis of digits
  useEffect(() => {
    USE_NUMBER.setNumber(props.generateNumber());
    if (refs.length !== 0) {
      refs.length = 0;
    }
    modalDiv.current.addEventListener("shown.bs.modal", function () {
      refs[0].current.focus();
    });
    for (let i = 0; i < Number(props.digit); i++) {
      // creating refs
      refs.push(React.createRef());
      setRefs([...refs]);
    }
  }, [props.digit]);

  // This useEffect will start the timer
  useEffect(() => {
    let time = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    if (countdown === 50) {
      clearTimeout(time);
      setShowSuccess("none");
      setDisableButton(false);
    }
  }, [countdown]);

  // This is for getting the input
  const getInput = (currRef: any, e: any, index: any) => {
    if (
      currRef.current.value >= 0 &&
      currRef.current.value <= 9 &&
      currRef.current.value !== " "
    ) {
      if (currRef.current.value !== "") {
        if (index !== refs.length - 1) refs[index + 1].current.focus();
      }
    } else {
      currRef.current.value = "";
    }
    if (checkOTP()) {
      refs[index].current.blur();
      setBorderColor("green");
      setShowLoader("inline");
      setShowVerified("inline");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else if (checkOTP() === false) {
      setBorderColor("red");
      setShowSuccess("none");
      setShowError("inline");
    }
  };

  // This function for focussing the previous child when backspace is clicked
  const checkBackspace = (event: any, currentRef: any, index: any) => {
    let key = event.key;
    if (key === "Backspace" || key === "Delete") {
      if (currentRef.current.value === "") {
        if (index !== 0) refs[index - 1].current.focus();
      }
    }
  };

  // This function will match the OTP
  const checkOTP = () => {
    // if (showError === "inline") {
    //   setShowError("none");
    // }
    let check = false;
    for (let i = 0; i < refs.length; i++) {
      if (String(refs[i].current.value) === "") {
        // if (i === Number(refs.length - 1)) {
        check = true;
        // }
      }
    }
    if (check === true) {
      setShowError("none");
      setBorderColor("black");
      return;
    }
    for (let i = 0; i < refs.length; i++) {
      if (Number(arrayDigits[i]) === Number(refs[i].current.value)) {
        continue;
      } else if (Number(arrayDigits[i]) !== Number(refs[i].current.value)) {
        return false;
      }
    }
    return true;
  };

  // This function will resend the OTP
  const resendOTP = () => {
    if (attempts === 0) {
      let confirm = window.confirm(
        "All your attempts have been used ,,Click Ok to start again"
      );
      if (confirm === true) {
        window.location.reload();
      }
      return;
    }
    for (let i = 0; i < refs.length; i++) {
      refs[i].current.value = "";
    }
    refs[0].current.focus();
    setBorderColor("black");
    setShowSuccess("inline");
    setDisableButton(true);
    setShowError("none");
    setCountdown(59);
    setAttempts((prev) => prev - 1);
    USE_NUMBER.setNumber(props.generateNumber());
  };

  return (
    <div>
      <div
        ref={modalDiv}
        className="modal fade"
        id="exampleModal"
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
              {refs.map((item: any, index: number) => (
                <span key={index}>
                  <input
                    type="text"
                    className={`input`}
                    style={{ border: `2px solid ${borderColor}` }}
                    ref={item}
                    onKeyDown={(event: any) =>
                      checkBackspace(event, item, index)
                    }
                    onChange={(e: any) => getInput(item, e, index)}
                    maxLength={1}
                  />
                </span>
              ))}
              <div
                className="spinner-border loader"
                role="status"
                style={{ display: showLoader }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <br />
              <strong className="resend_alert" style={{ display: showError }}>
                Entered One-Time Password is incorrect!
              </strong>
              <strong
                className="resend_success"
                style={{ display: showVerifified }}
              >
                OTP Verified !
              </strong>
              <strong
                className="resend_success"
                style={{ display: showSuccess }}
              >
                OTP has been sent Succesfully !
              </strong>
              <span className="resend_class">
                {" "}
                <button
                  className="resend"
                  style={{
                    color:
                      disableButton === true
                        ? `lightgray`
                        : `rgb(19, 126, 247)`,
                  }}
                  disabled={disableButton}
                  onClick={() => resendOTP()}
                >
                  Resend OTP
                </button>
                <p className="attempts_class"> ({attempts} left)</p>
                <span className="timer">
                  00:{countdown < 10 ? `0${countdown}` : <>{countdown} </>} sec
                  left
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLayout;

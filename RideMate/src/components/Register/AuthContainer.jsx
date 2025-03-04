import React, { useState } from "react";
import "./Register.css";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Overlay from "./Overlay";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContainer = () => {
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const toggleRightPanel = (isActive) => {
    setRightPanelActive(isActive);
  };

  return (
    <div
      className={`auth-container ${isRightPanelActive ? "right-panel-active" : ""}`}
      data-testid="auth-container"
    >
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SignUpForm />
      <SignInForm />
      <Overlay toggleRightPanel={toggleRightPanel} />
    </div>
  );
};

export default AuthContainer;

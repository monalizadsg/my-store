import React, { createContext, useState } from "react";

export const ToastContext = createContext();

const ToastContextProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("success");

  const showToast = (msg, msgStatus) => {
    setIsOpen(true);
    setMessage(msg);
    setMessageStatus(msgStatus);
  };

  const closeToast = () => {
    setIsOpen(false);
    setMessage("");
  };

  return (
    <ToastContext.Provider
      value={{ isOpen, message, messageStatus, showToast, closeToast }}
    >
      {props.children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;

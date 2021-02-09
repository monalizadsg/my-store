import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { ToastContext } from "../global/ToastContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Toast = () => {
  const { message, isOpen, messageStatus, closeToast } = useContext(
    ToastContext
  );

  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={closeToast}>
      <Alert onClose={closeToast} severity={messageStatus}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;

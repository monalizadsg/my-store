import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = (props) => {
  return (
    <div
      style={{
        zIndex: "1000",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.isLoading && <CircularProgress color='primary' />}
    </div>
  );
};

export default Loading;

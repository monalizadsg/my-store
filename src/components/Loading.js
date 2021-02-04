import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = (props) => {
  return (
    <div
      style={{
        zIndex: "99",
        width: "100%",
      }}
    >
      {props.isLoading && <CircularProgress color='primary' />}
    </div>
  );
};

export default Loading;

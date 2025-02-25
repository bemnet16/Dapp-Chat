import React from "react";

import style from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <div className={style.Error}>
      <div className={style.Error_box}>
        <h1>Please Fix This Error & Reload Browser</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;

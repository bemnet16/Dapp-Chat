import React, { useState } from "react";
import Image from "next/image";

import style from "./Loader.module.css";
import images from "../../assets";

const Loader = () => {
  return (
    <div className={style.Loader}>
      <div className={style.Loader_box}>
        <Image src={images.loader} alt="loader" width={100} height={100} />
      </div>
    </div>
  );
};

export default Loader;

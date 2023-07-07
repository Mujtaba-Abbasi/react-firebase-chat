import React from "react";
import img from "/images/img.png";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="Type some message here..." />
      <div className="send">
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <img alt="" src={img} />
        </label>
        <button>Send</button>
      </div>
    </div>
  );
};

export default Input;

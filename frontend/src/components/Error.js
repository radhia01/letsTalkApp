import React, { useState } from "react";
import { useEffect, usestate } from "react";
import "./style.css";
function Error({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  return show ? <div className="error">{message}</div> : null;
}

export default Error;

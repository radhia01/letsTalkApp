import React from "react";
import { useEffect, useState } from "react";
function Alert({ message }) {
  const [show, setshow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setshow(false);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return show ? <div className="alert">{message}</div> : null;
}

export default Alert;

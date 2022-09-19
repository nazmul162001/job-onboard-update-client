import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
const usePasswordToggle = () => {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(FaEyeSlash);
    const passwordTogle = () => {
      if (type === "password") {
        setIcon(FaEye);
        setType("text");
      } else {
        setIcon(FaEyeSlash);
        setType("password");
      }
    };
    return[passwordTogle,type,icon]
}

export default usePasswordToggle
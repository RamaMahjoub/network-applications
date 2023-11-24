import { useState } from "react";

const usePasswordToggle = () => {
  const [showPassword, setShow] = useState<boolean>(false);

  const handleShow = () => {
    setShow((pre) => !pre);
  };

  return {
    showPassword,
    handleShow,
  };
};

export default usePasswordToggle;

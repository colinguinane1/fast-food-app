import React from "react";

interface BackdropProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-3xl bg-black opacity-50 "
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;

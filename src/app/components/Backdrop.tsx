import React from "react";

interface BackdropProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black opacity-75 backdrop-blur-3xl z-10"
      style={{ backdropFilter: "blur(20px)" }}
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;

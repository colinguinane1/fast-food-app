const Backdrop = ({ onClick }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50"
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;

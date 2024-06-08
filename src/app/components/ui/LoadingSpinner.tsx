import { Oval } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <div className="w-screen bg-transparent h-screen absolute top-0 flex flex-col items-center justify-center">
      <Oval
        height={120}
        width={120}
        color="#ffffff"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
      <h1 className="text-white font-extrabold py-4 text-2xl">Loading...</h1>
    </div>
  );
};

export default LoadingSpinner;

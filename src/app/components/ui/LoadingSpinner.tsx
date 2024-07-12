import { Oval } from "react-loader-spinner";
const LoadingSpinner = () => {
  return (
    <div className="w-screen backdrop-blur-3xl -mt-20 inset-0 bg-transparent h-screen top-0 flex flex-col items-center justify-center">
      <Oval
        height={100}
        width={100}
        color="#ffffff"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94ddd"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <h1 className="text-transparent   bg-clip-text bg-gradient-to-r from-green-600 to-green-500 font-semibold text-2xl py-4">
        Loading deliciousness...
      </h1>
    </div>
  );
};

export default LoadingSpinner;

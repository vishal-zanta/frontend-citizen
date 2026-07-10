import clsx from "clsx";
import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderErrWrapperProps {
  isLoading: boolean;
  error?: any;
  children: React.ReactNode;
  loaderClassName?:string
}

const LoaderErrWrapper: React.FC<LoaderErrWrapperProps> = ({ isLoading, error, children,loaderClassName }) => {
  if (isLoading) {
    return (
      <div className={clsx("flex items-center justify-center h-full py-4", loaderClassName)}>
        <ClipLoader color="#0A5ADB" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-40">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderErrWrapper;
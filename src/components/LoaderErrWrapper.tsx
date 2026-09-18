import clsx from "clsx";
import React from "react";
import { ClipLoader } from "react-spinners";

interface LoaderErrWrapperProps {
  isLoading: boolean;
  error?: any;
  children: React.ReactNode;
  loaderClassName?: string;
  loadingText?: string;
}

const LoaderErrWrapper: React.FC<LoaderErrWrapperProps> = ({
  isLoading,
  error,
  children,
  loaderClassName,
  loadingText,
}) => {
  if (isLoading) {
    return (
      <div
        className={clsx(
          "flex flex-col gap-2 items-center justify-center h-full py-8 min-h-40",
          loaderClassName,
        )}
      >
        <ClipLoader color="#0A5ADB" size={32} />
        {loadingText && (
          <p className="text-xs text-muted-foreground font-medium">{loadingText}</p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-40">
        <p className="text-red-500 text-lg font-semibold">
          {error?.message || error || "Something went wrong"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoaderErrWrapper;

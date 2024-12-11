/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";

const UseCustomToast = (promise: any, loadingMessage: string) => {
  toast.promise(
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      try {
        const result = await promise;
        if (result?.data?.success === true) {
          resolve(result?.data?.message);
        } else {
          reject(
            new Error(
              result?.error?.data?.message ||
                "Something went wrong please try again"
            )
          );
        }
      } catch (error) {
        reject(error);
      }
    }),
    {
      loading: loadingMessage || "Loading...",
      success: (message: any) => {
        return message;
      },
      error: (error) => {
        return error.message;
      },
    },
    {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    }
  );

  return promise;
};

export default UseCustomToast;

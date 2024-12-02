import { RouterProvider } from "react-router-dom";
import { router } from "./routers/MainRouter";
import ReactPixel from "react-facebook-pixel";
import { useGetConfigQuery } from "./store/services/configApislice";
import { useEffect } from "react";

function App() {
  const { data, isError, isLoading } = useGetConfigQuery({});
  useEffect(() => {
    if (!isLoading && !isError && data) {
      if (data?.data?.fbPixelId) {
        ReactPixel.init(data?.data?.fbPixelId);
        ReactPixel.pageView(); // For tracking page view
      }
    }
  }, [data, isError, isLoading]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

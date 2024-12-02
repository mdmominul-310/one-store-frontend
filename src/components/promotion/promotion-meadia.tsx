import { useGetPromotionQuery } from "@/store/services/promotionApiSlice";
import ReactPlayer from "react-player";

const PromotionMeadia = () => {
  const { data, isLoading } = useGetPromotionQuery({});
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="mb-16">
      <div className="lg:grid lg:grid-cols-2 w-full gap-4">
        {data?.data?.map((item: { title: string; id: string; url: string }) => (
          <div key={item.id} className=" lg:h-[400px] my-4">
            <h1>{item.title}</h1>
            <ReactPlayer
              url={item.url}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionMeadia;

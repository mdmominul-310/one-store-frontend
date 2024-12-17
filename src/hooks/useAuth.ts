import { useAppSelector } from "@/store/app/hooks";

const useAuth = () => {
  const userData = useAppSelector(
    (state) => state?.local?.userReducer?.userInfo
  );

  return { user: userData?.user, token: userData?.token };
};
export default useAuth;

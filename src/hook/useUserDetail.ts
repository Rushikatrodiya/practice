import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import { IUser } from "../services/apitype";
import { Iapiresponse } from "../types/type";

const useUserDetail = (username: string) => {
  const api = new API<IUser>(`${username}`);

  const { data, status } = useQuery<Iapiresponse<IUser>, Error>({
    queryKey: ["userDetail", username],
    queryFn: () => api.getOne(),
    staleTime: 10 * 1000,
  });

  return {
    status,
    user: data?.data || null,
  };
};

export default useUserDetail;

import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import { Ifriend } from "../services/apitype";
import { Iapiresponse } from "../types/type";

const useUserFriends = (username: string) => {
  const api = new API<Ifriend>(`${username}/friends`);
  const { data, status } = useQuery<Iapiresponse<Ifriend[]>, Error>({
    queryKey: ["userFriends", username],
    queryFn: () => api.getAll(),
    staleTime: 10 * 1000,
  });

  const dataList: Ifriend[] = data?.data || [];
  console.log(dataList);

  return {
    status,
    dataList,
  };
};

export default useUserFriends;
import { useQuery } from "@tanstack/react-query";
import API from "../services/api";
import { IUser } from "../services/apitype";
import { Iapiresponse } from "../types/type";
import { useState } from "react";

const useUserList = () => {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const api = new API<IUser>("");
  const { data, isFetching, isLoading, error } = useQuery<
    Iapiresponse<IUser[]>,
    Error
  >({
    queryKey: ["users", page],
    queryFn: () => api.getAll(page),
    staleTime: 10 * 1000,
    placeholderData: (prev) => prev,
  });

  const dataList: IUser[] = data?.data || [];
  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 1));
    console.log(dataList);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
    console.log(dataList);
  };

  return {
    page,
    searchValue,
    setSearchValue,
    isFetching,
    isLoading,
    error,
    handlePrev,
    handleNext,
    dataList,
  };
};

export default useUserList;
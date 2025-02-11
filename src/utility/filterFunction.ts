import { IUser } from "../services/apitype";

export const filteredData = (dataList:IUser[] , searchValue:string) => dataList.filter((item) =>
    item.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  
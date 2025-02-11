import { IUser } from "../services/apitype";

export type IuserDetailProp = {
  user: IUser;
  backbutton: () => void;
};

export type Iapiresponse<T> = {
  data: T;
};
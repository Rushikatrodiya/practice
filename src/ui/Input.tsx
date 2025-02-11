import clsx from "clsx";
import { FC, InputHTMLAttributes } from "react";

export type IInputProps = InputHTMLAttributes<HTMLInputElement> & {
  color?: string;
};

const Input: FC<IInputProps> = (props) => {
  const { className, color, ...other } = props;
  const inputClass = clsx();

  return (
    <input
      placeholder="Search........"
      className={`"w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
      placeholder="UI Kits, Dashboards..."  ${inputClass}`}
      {...other}
    />
  );
};

export default Input;
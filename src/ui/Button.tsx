import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
export type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: string;
};
const Button = (props: IButtonProps) => {
  const { className, children, color, ...other } = props;
  const btnClasses = clsx(
    color === "blue" &&
      "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm  text-center me-2 mb-2",
    color === "green" &&
      "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  );
  return (
    <button className={`underline p-3 ${btnClasses}`} {...other}>
      {children}
    </button>
  );
};
export default Button;
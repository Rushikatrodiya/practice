import React, { TableHTMLAttributes } from "react";
import Button from "./Button";

type TableProps<T> =  TableHTMLAttributes<HTMLTableElement>
& {
  data: T[];
  columns: { header: string; render: (row: T) => React.ReactNode }[];
  type: string;
  page?:number
  handleNext?: () => void;
  handlePrev?: () => void
};

const Table = <T,>(props: TableProps<T>) => {
  const { data, columns, type , handleNext , handlePrev , page } = props

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-2xl">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{col.render(row)}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {type === "list" && (
        <>
          <Button
            onClick={handlePrev}
            disabled={page == 1}
            color="blue"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={data.length <= 0}
            className="bg-amber-100"
            color="blue"
          >
            Next
          </Button>
        </>
      )}
    </>
  );
};

export default Table;
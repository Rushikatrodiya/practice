import React from "react";

type TableProps<T> = {
  data: T[];
  columns: { header: string; render: (row: T) => React.ReactNode }[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => {
  return (
    <table border={1} cellPadding={5} cellSpacing={0} style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
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
  );
};

export default Table;

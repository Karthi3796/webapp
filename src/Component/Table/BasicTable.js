import React, { useEffect, useMemo } from "react";
import { ThemeContext } from "../../App";
import { useContext } from "react";
// import { useFilters, useTable } from "react-table";
import { Cell } from "recharts";
import datas from "../Daily/SourceData.json";
import { COLUMNS } from "./columns";
import "./table.css";
// import Report from "../../Component/Report/Report";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
const BasicTable = ({ value_Application, selectedOption }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // console.log(value_Application,value_Week_DD)
    if (value_Application !== "" || value_Application !== undefined) {
      setFilter("Application", value_Application);

      // setFilter("Month",value_Month)
      // setFilter("Year",value_Year)
      // setFilter("Date",dates)
    }
    // if(selectedOption.name==="Month"){
    //   selectedOption.value.map((d)=>{
    //     setFilter("Month",d)
    //   })
    // }
  }, [value_Application, selectedOption]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => datas, []);

  //     const [pdfData, setpdfData] = useState();
  //  const tableInstance = (e) => {
  //    setpdfData(e.target.value);
  //  };

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: ColumnFilter },
      //  defaultColumn
    },
    useFilters,
    useGlobalFilter
  );

  // const csvReport = {
  //     filename: "FinalR",
  //     headers: columns,
  //     data:  data

  // }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    state,
    setGlobalFilter,
  } = tableInstance;
  // console.log(getTableProps);

  const { globalFilter } = state;

  return (
    <>
      {selectedOption !== "" && value_Application !== "" ? (
        <>
          <div
            className={theme === "light" ? "Report_Excel" : "Report_Excel-dark"}
          >
            <div>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Report Download"
              />
            </div>
            <table
              className="mc--table-container"
              // style={{ width: "800px", maxHeight: "20%", overflowY: "scroll" }}
              id="table-to-xls"
              {...getTableProps()}
            >
              <thead className="mc--th">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="mc--tr">
                    {headerGroup.headers.map((columns) => (
                      <td
                        className="mc--td-header"
                        {...columns.getHeaderProps()}
                      >
                        {columns.render("Header")}
                      </td>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="mc--tr">
                      {row.cells.map((cell) => {
                        return (
                          <td className="mc--td" {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default BasicTable;

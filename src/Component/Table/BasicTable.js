import React, { useEffect, useMemo } from "react";
import { ThemeContext } from "../../App";
import { useContext } from "react";
// import { useFilters, useTable } from "react-table";
import { Cell } from "recharts";
import datas from '../Daily/SourceData.json';
import { COLUMNS } from "./columns";
import './table.css';
// import Report from "../../Component/Report/Report";
import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useTable, useFilters, useGlobalFilter } from 'react-table'
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
const BasicTable = ({value_Application,value_Week_DD, value_Month={value_Month}, value_Year={value_Year} }) => {

  const {theme} = useContext(ThemeContext)

    useEffect(()=>{
        // console.log(value_Application,value_Week_DD)
        if((value_Application!==""||value_Application!==undefined)&&(value_Week_DD!==""||value_Week_DD!==undefined)||(value_Application!==""||value_Application!==undefined)&&(value_Month!==""||value_Month!==undefined)|| (value_Application!==""||value_Application!==undefined)&&(value_Year!==""||value_Year!==undefined)){
            setFilter("Application",value_Application)
            setFilter("Week",value_Week_DD)
            setFilter("Month",value_Month)
            setFilter("Year",value_Year)
            // setFilter("Date",dates)
        }

    },[value_Application,value_Week_DD])

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => datas, [])
    

//     const [pdfData, setpdfData] = useState();
//  const tableInstance = (e) => {
//    setpdfData(e.target.value);
//  };


   const tableInstance =  useTable({
       columns,
       data,
       defaultColumn:{Filter:ColumnFilter}
      //  defaultColumn
    },
    useFilters,
    useGlobalFilter
    )

    // const csvReport = {
    //     filename: "FinalR",
    //     headers: columns,
    //     data:  data

    // }

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,setFilter, state, setGlobalFilter} = tableInstance
    // console.log(getTableProps);

  const { globalFilter} = state

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: ColumnFilter
  //   }),
  //   []
  // )
   
    // console.log(columns);\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // console.log(setFilter);
    return(
      <>
       {(value_Year!==''&& value_Application!=="") || (value_Week_DD!==''&& value_Application!=="") || (value_Month!=='' && value_Application!=="")?
        (<>
        <div className={theme==="light"?'Report_Excel':'Report_Excel-dark'}>
        <div>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Report Download"/>
                    </div>
        <table style={{width:"800px"}} id="table-to-xls" {...getTableProps()}>
       
        
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((columns)=>(
                    <th style={{minWidth: "20px"}} {...columns.getHeaderProps()}>{columns.render('Header')}
                       
                  {/* <div>{columns.canFilter ? columns.render('Filter') : null}</div> */}
                    </th>
                    ))}
                   
                </tr>

                ))}
                    

            </thead>
            <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        </table>

        </div>
        <div>
            {/* <CSVLink {...csvReport}>CSV Download</CSVLink> */}
            {/* <Report /> */}
        </div>
        

        </> )  : ""}
        </>
    )
    
}



export default BasicTable;
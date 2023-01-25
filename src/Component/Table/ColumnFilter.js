import React from "react";
import { TextField } from "@mui/material";
import { InputAdornment } from "@mui/material/InputAdornment";

export function ColumnFilter({
  column: {
    filterValue,
    setFilter,
  },
}) {
  return (
    <span>
      <TextField 
      size="small"
      variant="outlined" 
      
      placeholder="Search"
      style={{backgroundColor: 'white',padding:0,display:"flex",height:"25px",justifyContent:"center",border:"1px solid gray",borderRadius:"5px"}}
        
      value={filterValue ||""}
        onChange={(e) => {
            console.log(filterValue)
            setFilter(e.target.value || undefined)}}
      />
    </span>

    

    
  );
};



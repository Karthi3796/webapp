import React, { useState } from "react";
import { useContext } from "react";
import "./Home.css";
import Header from "../../Component/header/Header";
import Features from "../../Component/features/Features";
import { ThemeContext } from "../../App";
import PersistentDrawerLeft from "../../Component/Test/Test";
import BasicTable from "../../Component/Table/BasicTable";
import LinegraphCustomRange from "../../Component/LineChart/LineChart";
import StackedChart from "../../Component/StackedChart/StackedChart";
import FourBlockChart from "../../Component/FourBlockerChart/FourBlockChart";
import Navbar from "../../Component/Navbar/Navbar";
import ChartTest from "../../Component/ChartTest/ChartTest";
import DateChart from "../../Component/DateChart/DateChart";
import CustomChart from "../../Component/CustomChart/CustomChart";


function Home() {
  const { theme } = useContext(ThemeContext);

  const [selectedOption, setSelectedOption] = useState({name:"",value:[]});
  // const [selectedOption, setSelectedOption] = useState({name:"Year",value:["2022"]});
  const [value_Application, setValue_Application] = useState("");
  const [selectedOptions, setSelectedOptions] = useState("");
  const [value_Week_DD, setValue_Week] = useState("");
  const [dates, setDates] = useState({ from: "", to: "" });
  console.log(typeof(dates.from))
  const [value_Month, setValue_Month] = useState("");
  const [value_Year, setValue_Year] = useState("");
  const [value_Module, setValue_Module] = useState("");
  const [open, setOpen] = useState(false);
  const [graphselected, setgraphSelected] = useState("");

  return (
    <div className={theme === "light" ? "Maincontainer" : "Maincontainer-dark"}>
      {/* <PersistentDrawerLeft
        value_Application={value_Application}
        setValue_Application={setValue_Application}
        value_Week_DD={value_Week_DD}
        setValue_Week={setValue_Week}
        value_Month={value_Month}
        setValue_Month={setValue_Month}
        value_Year={value_Year}
        setValue_Year={setValue_Year}
        dates={dates}
        setDates={setDates}
        open={open}
        setOpen={setOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOptions = {selectedOptions}
        setSelectedOptions = {setSelectedOptions}
      /> */}
        <div className="Inner">
        <Navbar 
       value_Application={value_Application}
       setValue_Application={setValue_Application}
       value_Week_DD={value_Week_DD}
       setValue_Week={setValue_Week}
       value_Month={value_Month}
       setValue_Month={setValue_Month}
       value_Year={value_Year}
       setValue_Year={setValue_Year}
       dates={dates}
       setDates={setDates}
       open={open}
       setOpen={setOpen}
       selectedOption={selectedOption}
       setSelectedOption={setSelectedOption}
       selectedOptions = {selectedOptions}
       setSelectedOptions = {setSelectedOptions}
/>
      <div
        className={
          open ||
          value_Application ||
          value_Week_DD ||
          value_Month ||
          value_Year
            ? "header-bg--closed"
            : "header-bg"
        }
      >
        <Header open={open} setOpen={setOpen} />
        <Features data-aos="fade-up" />
        </div>

      {open!=="" ?
      (<div className="GraphLayout"> 
           <StackedChart
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            value_Application={value_Application}
            setValue_Application={setValue_Application}
            selectedOptions = {selectedOptions}
            setSelectedOptions = {setSelectedOptions}
           />
            <LinegraphCustomRange 
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        value_Application={value_Application}
        setValue_Application={setValue_Application}
        /> 
        <FourBlockChart
       selectedOption={selectedOption}
       setSelectedOption={setSelectedOption}
       value_Application={value_Application}
       setValue_Application={setValue_Application}
        />

          <div className="ThirdRow">
            {/* <ChartTest /> */}
            {/* <CustomChart 
           dates={dates}
           value_Application={value_Application}
            /> */}
       
        {/* <BasicTable
          value_Application={value_Application}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          dates={dates}
        /> */}

        </div>
        
        </div>):""}
        </div>
  
    </div>
    
  );
}

export default Home;

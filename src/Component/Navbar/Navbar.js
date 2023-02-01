import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import { Week, Month, Year, Application } from "../SideNavbar/Input";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import Select from 'react-select';
import { components } from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import { DatePicker } from "antd";
import moment from "moment";
import { useEffect } from "react";

const { RangePicker } = DatePicker;

function Navbar({
    value_Application,
    setValue_Application,
    value_Week_DD,
    setValue_Week,
    value_Month,
    setValue_Month,
    value_Year,
    setValue_Year,
    dates,
    setDates,
    open,
    setOpen,
    selectedOption,
    setSelectedOption,
  }) {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

    const open_close_func = () => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      };
    
      const { theme, toggleTheme } = useContext(ThemeContext);
    
      const [isExpanded, setExpendState] = useState(false);
    
      const [dropdownvalue,setDropDownValue] = useState("");
      console.log(dropdownvalue)
    
      const handlechange_Week = (e) => {
        setValue_Week(e.target.value);
      };
    
      //  const [value_Month, setValue_Month] = useState();
      const handlechange_Month = (e) => {
        setValue_Month(e.target.value);
      };
    
      // Mothly
    
      //  const handlechange = (e) => {
      //    setSelect(e.target.value);
      //  };
    
      //Yearly
    
      //  const [value_Year, setValue_Year] = useState();
      const handlechange_Year = (e) => {
        setValue_Year(e.target.value);
      };
    
      // Application
    
      const [value_Application_1, setValue_Application_1] = useState();
      const handlechange_Application = (e) => {
        setValue_Application_1(e.target.value);
        // setValue_Application(value_Application_1)
        // console.log(e.target.value);
      };
    
      // Date
      let value1 = 0;
      let value2 = 0;
      const [selected, setSelected] = useState("");
    
      const changeHandler = (e) => {
        setDates({ from: "", to: "" });
        setSelected(e.target.value);
        setValue_Week("");
        setValue_Year("");
        setValue_Month("");
        setValue_Application("");
        setValue_Application_1("");
      };
      // console.log(selected);
      // Clear reset button
    
      const clearInput = (e) => {
        setDates({ from: "", to: "" });
        //  setSelect("");
        setValue_Week("");
        setValue_Year("");
        setValue_Month("");
        setValue_Application("");
        setValue_Application_1("");
        setDropDownValue("");
        // setSelected("");
      };
    
      // const openClose = (e) =>{
      //   handleDrawerOpen("");
      //   handleDrawerClose("");
    
      // }
    
      const GenerateInput = (e) => {
        // alert('sss')
    
        setValue_Application(value_Application_1);
        if(dropdownvalue==="Custom Range"){
          getDateRange()
        }
      };
    
      // let change_Axis_Color  = [];
      // if( theme==="light"?'Utlity':'Utlity-dark'){
      //   if( theme === 'dark'){
      //     change_Axis_Color = Drawer.sx.backgroundColor = 'black';
      //   }
      // }
    
// ########## LastMonth #################### //

function getPreviousMonth() {
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let month = currentMonth - 1;
  let year = currentYear;
  if (month < 0) {
      month = 11;
      year--;
  }
  let monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month, 1));
  return { name: "Month", value: [monthName.toString()], Year: [(currentMonth === 0 ? currentYear-1 : currentYear ).toString()], option: "LastMonth"};
}
console.log(getPreviousMonth());





// ########## Last6Month #################### //

const getLast6Months = () => {
  let date = new Date();
  let currentMonth = date.getMonth();
  let currentYear = date.getFullYear();
  let last6Months = [];
  let last6MonthsYear = [];
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  for (let i = 0; i < 5; i++) {
    let monthIndex = (currentMonth - i + 12) % 12;
    last6Months.push(monthNames[monthIndex]);
    last6MonthsYear.push(String(currentYear - (currentMonth - monthIndex < 0 ? 1 : 0)));
  }
  return {name:"Month",value:last6Months.reverse(),Year:last6MonthsYear.reverse(), option: "Last5Month"};
}
console.log(getLast6Months());


// ##############################################

// ########## ThisYear #################### //
const getCurrentYear = () => {
  let date = new Date();
  let currentYear = date.getFullYear();
  let thisYear = date.getFullYear();
  // return [currentYear.toString()];
  return {name: "Year", value: [currentYear.toString()], Year: [thisYear.toString()], option: "ThisYear"};
}
console.log(getCurrentYear());


// ########## LastYear #################### //
const getPreviousYear = () => {
  let date = new Date();
  let previousYear = (date.getFullYear() - 1).toString();
  let thisYear = date.getFullYear();
  // return [previousYear];
  return {name: "Year", value: [previousYear.toString()], Year: [previousYear.toString()], option: "LastYear"};
}

// ########## This Week #################### //
const getWeek = () => {
  var d = new Date();
  d.setHours(0,0,0);
  d.setDate(d.getDate()+4-(d.getDay()||7));
  var yearStart = new Date(d.getFullYear(),0,1);
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return {week:weekNo,year:d.getFullYear()};
}
const getCurrentWeek = () => {
  let week = getWeek();
  return {name:"Week", value:[week.week.toString()], Year:[week.year.toString()], option: "ThisWeek"};
}
console.log(getCurrentWeek());



// ########## LastWeek #################### //

const getLastWeek = () => {
  let date = new Date();
  let lastWeek = getWeek() - 1;
  let thisYear = date.getFullYear();
  return {name: "Week", value: [lastWeek.toString()], Year: [thisYear.toString()], option: "LastWeek"};
}
console.log(getLastWeek());


// ########## Last6Year #################### //

const getLast6Years = () => {
  let currentYear = new Date().getFullYear();
  let last6Years = [];
  for (let i = 0; i < 5; i++) {
    last6Years.push(currentYear - i);
  }
  return { name: "Year", value: last6Years.reverse().map(year => year.toString()), Year: last6Years.map(year => year.toString()), option: "Last5Year"};
}
console.log(getLast6Years());

// ########## ThisMonth #################### //
const getThisMonth = () => {
  let date = new Date();
  let thisMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  let thisYear = date.getFullYear();
  return {name: "Month", value: [thisMonthName], Year: [thisYear.toString()], option: "ThisMonth"};
}
console.log(getThisMonth());


// ########## This Quater #################### //
const getCurrentQuarterName = () => {
  let date = new Date();
  let thisYear = date.getFullYear();
  let currentQuarter = Math.floor((date.getMonth() + 3) / 3);
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let startMonth = (currentQuarter - 1) * 3;
  let endMonth = startMonth + 2;
  let currentQuarterMonths = monthNames.slice(startMonth, endMonth + 1);
  return {name: "Month", value: currentQuarterMonths , Year: [thisYear.toString()], option: "ThisQuarter"};
}
console.log(getCurrentQuarterName());


// ########## LastQuarter #################### //

const getPreviousQuarterName = () => {
  let date = new Date();
  let currentYear = date.getFullYear();
  let currentQuarter = Math.floor((date.getMonth() + 3) / 3);
  let previousQuarter = currentQuarter - 1;
  if (previousQuarter === 0) {
    previousQuarter = 4;
  }
  let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let startMonth = (previousQuarter - 1) * 3;
  let endMonth = startMonth + 2;
  let previousQuarterMonths = monthNames.slice(startMonth, endMonth + 1);
  let previousQuarterYear = currentYear - (endMonth === 11 ? 1 : 0);
  return {name: "Month", value: previousQuarterMonths, Year: [previousQuarterYear.toString()], option: "LastQuarter"};
} 

const  getDateRange = () => {
  return selectedOption

}
console.log(dates.from)
console.log(dates.to)

useEffect (()=>{
 setSelectedOption({name: "Custom Range", value: ['1','2'], Year: [], option: "today", fromDate: dates.from, toDate: dates.to })
},[dates])

console.log(selectedOption)


console.log(getPreviousQuarterName());
    
      const handleSelected = (event) => {
        setDropDownValue(event.target.value)
        if (event.target.value === "Previous Month")
        setSelectedOption(getPreviousMonth());
        else if (event.target.value === "Today") setSelectedOption(getToday());
        else if (event.target.value === "Yesterday") setSelectedOption(getYesterday());
        else if (event.target.value === "Previous Year")
        setSelectedOption(getPreviousYear());
        else if (event.target.value === "Current Week")
        setSelectedOption(getCurrentWeek());
        else if (event.target.value === "Last Week") setSelectedOption(getLastWeek());
        else if (event.target.value === "Last 6Years") setSelectedOption(getLast6Years());
        else if (event.target.value === "Current Month")
        setSelectedOption(getThisMonth());
        else if (event.target.value === "Current Year")
        setSelectedOption(getCurrentYear());
        else if (event.target.value === "Last 6Months")
        setSelectedOption(getLast6Months());
        else if (event.target.value === "Current Quater")
        setSelectedOption(getCurrentQuarterName());
        else if (event.target.value === "Last Quater")
        setSelectedOption(getPreviousQuarterName());
        // else if (event.target.value === "Custom Range") setSelectedOption(getDateRange());
      };


// ########## Today #################### //
const getToday = () => {
  let date = new Date();
  let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  let formattedDate = today[0] + "-" + (today[1] < 10 ? "0" + today[1] : today[1]) + "-" + (today[2] < 10 ? "0" + today[2] : today[2]);
  return { name: "Today", value: [formattedDate], Year: today[0].toString(), option: "Today" };
};
console.log(getToday());


// ########## Yesterday #################### //
const getYesterday = () => {
  let date = new Date();
  date.setDate(date.getDate() - 1);
  let yesterday = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  let formattedDate = yesterday[0] + "-" + (yesterday[1] < 10 ? "0" + yesterday[1] : yesterday[1]) + "-" + (yesterday[2] < 10 ? "0" + yesterday[2] : yesterday[2]);
  return { name: "Yesterday", value: [formattedDate], Year: yesterday[0].toString(), option: "Yesterday" };
};
console.log(getYesterday());
    
      // ########## END #################### //
      const options = [
        { value: 'all', label: 'All' },
        { value: 'Stacked100%', label: 'Stacked100%' },
        { value: 'Trend Chart', label: 'Trend Chart' },
        { value: 'Utilization Chart', label: 'Utilization Chart' },
        { value: 'Unused Chart', label: 'Unused Chart' }
      ];

      const [selectedOptions, setSelectedOptions] = useState([]);

      const handleChange = (selectedOption) => {
        if(selectedOption.some(({value})=> value === 'all')) {
          setSelectedOptions(options.slice(1));
        }else {
          setSelectedOptions(selectedOption);
        }
      };
    
      const Option = (props) => (
        <components.Option {...props}>
          <div style={{display: "flex", flexDirection: "column"}}>
            {props.label}
          </div>
        </components.Option>
      );

	return (
		<header>
		          <div className="nav-brand">
            <img src="icon/mavenberg.png" alt="" srcset="" />
          </div>
			<nav ref={navRef}>
            <div className="Application-dropdown1">
              <select
               className={
                theme === "light" ? "form-controlexe" : "form-controlexe-dark"
              }
                value={dropdownvalue}
                onChange={(event) => {
                  handleSelected(event);
                }}
              >
                <option value="Today">Today</option>
                <option value="Current Week">This Week</option>
                <option value="Current Month">This Month</option>
                <option value="Current Year">This Year</option>
                <option value="Current Quater">This Quarter</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last Week">Last Week</option>
                <option value="Previous Month">Last Month</option>
                <option value="Previous Year">Last Year</option>
                <option value="Last Quater">Last Quarter</option>
                <option value="Last 6Months">Last 5 Month</option>
                <option value="Last 6Years">Last 5 Year</option>
                <option value="Custom Range">Custom Range</option>

              </select>
            </div>
{ dropdownvalue === "Custom Range" ?
            (<div className="Make">
                  <RangePicker
                    className="DatePicker"
                    onChange={(values) => {
                      if (values != null) {
                        value1 = moment(values.at(0)).format("M/D/YYYY");

                        value2 = moment(values.at(1)).format("M/D/YYYY");

                        setDates({ from: value1, to: value2 });
                      } else {
                        setDates({ from: "", to: "" });
                      }
                    }}
                  />
                </div>): ""}
			<div className="Application">
            <div className="Application-dropdown">
              <select
                value={value_Application_1}
                className={
                  theme === "light" ? "form-controlexe" : "form-controlexe-dark"
                }
                //  className="form-controlexe"
                onChange={handlechange_Application}
              >
                <option selected>Application</option>
                {Application.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
    {/* <div>    
    <Multiselect
  displayValue="key"
  onKeyPressFn={function noRefCheck(){}}
  onRemove={function noRefCheck(){}}
  onSearch={function noRefCheck(){}}
  onSelect={function noRefCheck(){}}
  options={[
    {
      cat: 'Group 1',
      key: 'Option 1'
    },
    {
      cat: 'Group 1',
      key: 'Option 2'
    },
    {
      cat: 'Group 1',
      key: 'Option 3'
    },
    {
      cat: 'Group 2',
      key: 'Option 4'
    },
    {
      cat: 'Group 2',
      key: 'Option 5'
    },
    {
      cat: 'Group 2',
      key: 'Option 6'
    },
    {
      cat: 'Group 2',
      key: 'Option 7'
    }
  ]}
  showCheckbox
/>
</div>  */}
<button className="Resetbtn" onClick={clearInput}>
                {" "}
                Reset{" "}
</button>
<button className="Generate" onClick={GenerateInput}>
                {" "}
                Generate{" "}
</button>
           

<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
</button>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;

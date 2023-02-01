import React, { useState, useContext } from "react";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Features from "../../Component/features/Features";
import "antd/dist/antd.min.css";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import WeekPicker from "../WeekPicker/WeekPicker";

import { DatePicker } from "antd";
import moment from "moment";
import { Week, Month, Year, Application } from "../SideNavbar/Input";
import "./Test.css";

import { ThemeContext } from "../../App";

const drawerWidth = 240;
const { RangePicker } = DatePicker;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({
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
  // const theme = useTheme();

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

    // setSelected("");
  };

  // const openClose = (e) =>{
  //   handleDrawerOpen("");
  //   handleDrawerClose("");

  // }

  const GenerateInput = (e) => {
    // alert('sss')

    setValue_Application(value_Application_1);
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
    let monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      new Date(year, month, 1)
    );
    return {
      name: "Month",
      value: [monthName.toString()],
      Year: [(currentMonth === 0 ? currentYear - 1 : currentYear).toString()],
    };
  }
  console.log(getPreviousMonth());

  // ########## Last6Month #################### //

  const getLast6Months = () => {
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();
    let last6Months = [];
    let last6MonthsYear = [];
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let i = 0; i < 6; i++) {
      let monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(monthNames[monthIndex]);
      last6MonthsYear.push(
        String(currentYear - (currentMonth - monthIndex < 0 ? 1 : 0))
      );
    }
    return {
      name: "Month",
      value: last6Months.reverse(),
      Year: last6MonthsYear.reverse(),
    };
  };
  console.log(getLast6Months());

  // ##############################################

  // ########## ThisYear #################### //
  const getCurrentYear = () => {
    let date = new Date();
    let currentYear = date.getFullYear();
    let thisYear = date.getFullYear();
    // return [currentYear.toString()];
    return {
      name: "Year",
      value: [currentYear.toString()],
      Year: [thisYear.toString()],
    };
  };
  console.log(getCurrentYear());

  // ########## LastYear #################### //
  const getPreviousYear = () => {
    let date = new Date();
    let previousYear = (date.getFullYear() - 1).toString();
    let thisYear = date.getFullYear();
    // return [previousYear];
    return {
      name: "Year",
      value: [previousYear.toString()],
      Year: [previousYear.toString()],
    };
  };

  // ########## This Week #################### //
  const getWeek = () => {
    var d = new Date();
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return { week: weekNo, year: d.getFullYear() };
  };
  const getCurrentWeek = () => {
    let week = getWeek();
    return {
      name: "Week",
      value: [week.week.toString()],
      Year: [week.year.toString()],
    };
  };
  console.log(getCurrentWeek());

  // ########## LastWeek #################### //

  const getLastWeek = () => {
    let date = new Date();
    let lastWeek = getWeek() - 1;
    let thisYear = date.getFullYear();
    return {
      name: "Week",
      value: [lastWeek.toString()],
      Year: [thisYear.toString()],
    };
  };
  console.log(getLastWeek());

  // ########## Last6Year #################### //

  const getLast6Years = () => {
    let currentYear = new Date().getFullYear();
    let last6Years = [];
    for (let i = 0; i < 6; i++) {
      last6Years.push(currentYear - i);
    }
    return {
      name: "Year",
      value: last6Years.reverse().map((year) => year.toString()),
      Year: last6Years.map((year) => year.toString()),
    };
  };
  console.log(getLast6Years());

  // ########## ThisMonth #################### //
  const getThisMonth = () => {
    let date = new Date();
    let thisMonthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(date);
    let thisYear = date.getFullYear();
    return {
      name: "Month",
      value: [thisMonthName],
      Year: [thisYear.toString()],
    };
  };
  console.log(getThisMonth());

  // ########## This Quater #################### //
  const getCurrentQuarterName = () => {
    let date = new Date();
    let thisYear = date.getFullYear();
    let currentQuarter = Math.floor((date.getMonth() + 3) / 3);
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let startMonth = (currentQuarter - 1) * 3;
    let endMonth = startMonth + 2;
    let currentQuarterMonths = monthNames.slice(startMonth, endMonth + 1);
    return {
      name: "Month",
      value: currentQuarterMonths,
      Year: [thisYear.toString()],
    };
  };
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
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let startMonth = (previousQuarter - 1) * 3;
    let endMonth = startMonth + 2;
    let previousQuarterMonths = monthNames.slice(startMonth, endMonth + 1);
    let previousQuarterYear = currentYear - (endMonth === 11 ? 1 : 0);
    return {
      name: "Month",
      value: previousQuarterMonths,
      Year: [previousQuarterYear.toString()],
    };
  };
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
  };

  // ########## Today #################### //
  const getToday = () => {
    let date = new Date();
    let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    return today.map((elem) => elem.toString());
  };
  console.log(getToday());

  // ########## Yesterday #################### //
  const getYesterday = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  };
  console.log(getYesterday());

  // ########## END #################### //

  return (
    // <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'}>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            backgroundColor: "transperent !important",
            color: theme === "light" ? "black !important" : "white !important",
          }}
        >
          {/* <IconButton
            sx={{ color: "#757470" }}
            // color="blue"
            aria-label="open drawer"
            onClick={open_close_func}
            // sx={{backgroundColor:"transperent !important",color:theme==="light"?"black !important":"white !important"}}
            edge="start"
            // sx={{ mr: 1, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography variant="h6" noWrap component="div" className="Heading">
            License Report
          </Typography>

          <div className="switch">
            {theme === "light" ? (
              <IconButton sx={{ color: "#757470" }}>
                <LightModeOutlinedIcon
                  onClick={toggleTheme}
                  checked={theme === "dark"}
                />
              </IconButton>
            ) : (
              <IconButton sx={{ color: "#757470" }}>
                <DarkModeOutlinedIcon
                  onClick={toggleTheme}
                  checked={theme === "dark"}
                />
              </IconButton>
            )}
            {/* <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} /> */}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        hideBackdrop
        // BackdropProps={{ invisible: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: theme === "dark" ? "black" : "#ffff",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        {/* {console.log(theme)} */}
        <DrawerHeader>
          <div className="nav-brand">
            <img src="icon/mavenberg.png" alt="" srcset="" />
          </div>
          {/* <IconButton className='BBt' onClick={handleDrawerClose} sx={{color:"#757470"}}>
        
            {theme.direction === 'ltr' ? <ArrowLeftIcon /> : <ArrowLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />

        <div className="Sidebar">
          <IconButton
            className="Backbutton"
            onClick={() => setSelected("")}
            sx={{ color: "#757470" }}
          >
            {theme.direction === "ltr" ? <ArrowLeftIcon /> : <ArrowLeftIcon />}
          </IconButton>
          <div className="Application">
            <div className="Application-dropdown">
              <select
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
                <option value="Last 6Months">Last 6 Month</option>
                <option value="Last 6Years">Last 6 Year</option>
                <option value="Last 6Years">Custom Range </option>
              </select>
            </div>
          </div>
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
          <div className="Application">
            <div className="Application-dropdown"></div>
          </div>

          <div className="ButtonInput">
            <div className="Reset">
              <button className="Resetbtn" onClick={clearInput}>
                {" "}
                Reset{" "}
              </button>
              <button className="Generate" onClick={GenerateInput}>
                {" "}
                Generate{" "}
              </button>
            </div>{" "}
          </div>
        </div>
      </Drawer>

      {/* <Main open={open}>
      
      </Main> */}
    </Box>

    // </ReactSwitch>
  );
}

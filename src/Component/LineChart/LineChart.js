import "./LineChart.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { useRef } from 'react';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartPluginStacked100 from "chartjs-plugin-stacked100";
import "chart.js/auto"
// import App1 from './label';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js';
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { Colors } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { LineChart } from "recharts";
import { color } from "@mui/system";
import { FaRandom } from "react-icons/fa";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    ChartPluginStacked100
);

const LinegraphCustomRange = ({ value_Application,selectedOption})=>{

  // Variable decleration

  let PlotUserListObject = {};   // The object to collect the set of users against the label

  //PlotUserListObject Example: {module1:{
  //                                      xLabel1: [set of users], 
  //                                      xLabel2: [set of users], 
  //                                      },
  //                             module2:{
  //                                      xLabel1: [set of users], 
  //                                      xLabel2: [set of users], 
  //                                      } 
  //                             }   

  let startDateTime     = null; // The starting date and time for the selected date range option
  let endDateTime       = null; // The end date and time for the selected date range option
  let label             = null; // Selected label for plotting in x axis

  //Options:
  // Label : Hours
  const OptionToday= "Today"
  const OptionYesterday= "Yesterday"
  // Label : Days of the week
  const OptionThisWeek= "ThisWeek"
  const OptionLastWeek= "LastWeek"
  // Label : Weeks of the month
  const OptionThisMonth= "ThisMonth"
  const OptionLastMonth= "LastMonth"
  // Label : Months of the year
  const OptionLastYear= "LastYear"
  const OptionThisYear= "ThisYear"
  const OptionLastQuarter= "LastQuarter"
  const OptionThisQuarter= "ThisQuarter"
  const OptionLast5Month= "Last5Month"
  // Label : Years
  const OptionLast5Year= "Last5Year"

  // Labels:

  let hoursOfTheDay = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14',
  '15','16','17','18','19','20','21','22','23'];

  let DaysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let WeeksOfTheMonth = ['1','2','3','4','5'];

  let monthOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", 
   "September", "October", "November", "December"];

  let Quarter1 = ["January", "February", "March"];
  
  let Quarter2 = ["April", "May", "June"];

  let Quarter3 = ["July", "August", "September"];

  let Quarter4 = ["October", "November", "December"];

  // Gets the week number when
  // input:
  //      dt : Date object;
  // Return:
  //      weekNumber: Number;
  function getWeek(dt){
    let startDate = new Date(dt.getFullYear(), 0, 1);
    var days = Math.floor((dt - startDate) /
        (24 * 60 * 60 * 1000));
    return Math.floor(days / 7);
  }

  // Get the week number for the first day of the month of the given date
  // input:
  //      dt : Date object;
  // Return:
  //      WeekNumber: Number;
  function getStartingWeekOfTheMonth(dt)
  {
    let firestDateOfTheMonth= new Date(dt.getFullYear(), dt.getMonth(),1);
    return getWeek(firestDateOfTheMonth);
  }

  // Getting today's date
  const today = new Date();
  // Setting the start time of the day (Hours, Minutes, Seconds, MicroSeconds)
  today.setHours(0,0,0,0);


  // Calculation of start and end Date time and label selection based on the slected option

  if (selectedOption.option == OptionToday )
  {

    // Calculating start date time
    startDateTime= new Date(today.valueOf());

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setDate(endDateTime.getDate()+1);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label = hoursOfTheDay
  }

  else if (selectedOption.option == OptionYesterday)
  {
     // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setDate(startDateTime.getDate()-1);

    // Calculating end date time
    endDateTime= new Date(today.valueOf());
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

     // Choosing the label
    label = hoursOfTheDay;
  }

  else if (selectedOption.option == OptionThisWeek)
  {
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setDate(startDateTime.getDate()-startDateTime.getDay());

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setDate(endDateTime.getDate() + 7);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= DaysOfTheWeek
  }

  else if (selectedOption.option == OptionLastWeek)
  {
   // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setDate(startDateTime.getDate()-startDateTime.getDay());
    startDateTime.setDate(startDateTime.getDate()-7);

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setDate(endDateTime.getDate() + 7);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= DaysOfTheWeek;
  }

  else if (selectedOption.option == OptionThisMonth)
  { 
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setDate(1);

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setMonth(endDateTime.getMonth() + 1);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= WeeksOfTheMonth;
  }

  else if (selectedOption.option == OptionLastMonth)
  {
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setDate(1);
    startDateTime.setMonth(startDateTime.getMonth()-1);

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setMonth(endDateTime.getMonth() + 1);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= WeeksOfTheMonth;
  }

  else if (selectedOption.option == OptionLastYear)
  {
    // Calculating start date time
    startDateTime = new Date(today.getFullYear()-1,0,1,0,0,0,0);

    // Calculating end date time
    endDateTime = new Date(today.getFullYear(),0,1,0,0,0,0);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= monthOfTheYear;
  }

  else if (selectedOption.option == OptionThisYear)
  {
    // Calculating start date time
    startDateTime = new Date(today.getFullYear(),0,1,0,0,0,0);
    
    // Calculating end date time
    endDateTime = new Date(today.getFullYear()+1,0,1,0,0,0,0);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    label= monthOfTheYear
  }

  else if (selectedOption.option == OptionLastQuarter)
  { 
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    let currentQuarter = Math.floor(startDateTime.getMonth()/3);
    startDateTime.setMonth(currentQuarter * 3);
    startDateTime.setMonth(startDateTime.getMonth()-3);

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setMonth(endDateTime.getMonth()+3);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    let currentMonth = today.getMonth();
    if (currentMonth<3)
    {
      label = Quarter4;
    }
    else if (currentMonth <6)
    {
      label = Quarter1;
    }
    else if (currentMonth <9)
    {
      label = Quarter2;
    }
    else if (currentMonth <12)
    {
      label = Quarter3;
    }
  }

  else if (selectedOption.option == OptionThisQuarter)
  {
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    let currentQuarter = Math.floor(startDateTime.getMonth()/3);
    startDateTime.setMonth(currentQuarter * 3);
    startDateTime.setMonth(startDateTime.getMonth());

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setMonth(endDateTime.getMonth()+3);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Choosing the label
    let currentMonth = today.getMonth();
    if (currentMonth<3)
    {
      label = Quarter1;
    }
    else if (currentMonth <6)
    {
      label = Quarter2;
    }
    else if (currentMonth <9)
    {
      label = Quarter3;
    }
    else if (currentMonth <12)
    {
      label = Quarter4;
    }
  }

  else if (selectedOption.option == OptionLast5Month)
  {
    // Calculating start date time
    startDateTime = new Date(today.valueOf());
    startDateTime.setMonth(startDateTime.getMonth()-4);

    // Calculating end date time
    endDateTime = new Date(startDateTime.valueOf());
    endDateTime.setMonth(endDateTime.getMonth()+5);
    endDateTime.setSeconds(-1);

     // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Building the label
    let currentMonth = today.getMonth();
    label = [];
    for (let months=0; months < 5; months++)
    {
      let value = currentMonth-months;
      if (value<0)
      {
        value = monthOfTheYear.length + currentMonth-months;
      }
      label.push(monthOfTheYear[value]);
    }
    label = label.reverse();
  }

  else if (selectedOption.option == OptionLast5Year)
  {
    // Calculating start date time
    startDateTime = new Date(today.getFullYear()-4,0,1,0,0,0);

    // Calculating end date time
    endDateTime = new Date(today.getFullYear()+1,0,1,0,0,0);
    endDateTime.setSeconds(-1);

    // Writting to the console, the start and end date time
    console.log(startDateTime);
    console.log(endDateTime);

    // Building the label
    let currentyear = today.getFullYear();
    label= [];
    for (let years = 0; years < 5; years++)
    {
      label.push((currentyear-years).toString());
    }
    label = label.reverse();
  }

  // Check if the selected options in not empty
  if(selectedOption.option !== undefined )
  {
    // Iterating the elements in data json file
    datas.forEach( (row) => 
    {
      // combaining date and time
      let foundDate = row.Date.split("-");
      let foundTime = row.Time.split(":");
      let foundDateTime = new Date(foundDate[0], foundDate[1]-1, foundDate[2], foundTime[0], 
         foundTime[1], foundTime[2]);
      
      // Check if the Applicaton matches and if (tomorrow > foundDateTime > today) 
      if(row.Application === value_Application && foundDateTime >= startDateTime && foundDateTime <= 
         endDateTime)
      {
        // Vaiable to map the row's DateTime to the elements in the label
        var xLabelMatch = null;

        // Mapping the Row's DateTime to the elements in the label based on the selected option
        if (selectedOption.option == OptionToday || selectedOption.option == OptionYesterday )
        {
          // Mapping to the Hours value of the Row's time.
          xLabelMatch  = foundTime[0].toString();
        }
        else if (selectedOption.option == OptionThisWeek || selectedOption.option == OptionLastWeek)
        {
          // Mapping to the week of the day by using the Day of the date as index value
          // getDay() => {0: sunday, .. 6: Saturday}
          xLabelMatch = label[Number(foundDateTime.getDay())];
        }
        else if (selectedOption.option == OptionThisMonth || selectedOption.option == OptionLastMonth)
        {
          // Mapping  the week of the date to week of the month
          // ["1","2","3","4","5"]
          xLabelMatch = getWeek (new Date(foundDateTime)) - getStartingWeekOfTheMonth(new 
            Date(foundDateTime)) + 1;
        }
        else if (selectedOption.option == OptionLastYear || selectedOption.option == OptionThisYear  ||   
            selectedOption.option == OptionThisQuarter || selectedOption.option == OptionLastQuarter|| 
            selectedOption.option == OptionLast5Month)
        {
          // Mapping the date to the month of the year using the month number as index
          xLabelMatch = monthOfTheYear[Number(foundDate[1])-1];
        }
        else if (selectedOption.option == OptionLast5Year)
        {
          // Mapping the date to the last five years
          label = label.reverse();
          xLabelMatch = label[today.getFullYear()-foundDate[0]];
          label = label.reverse();
        }

        // check if the PlotUserListObject has the row's module object already, if not adds the new key 
        // pointing to an object and creates an object with the xLabelMatch pointing to a list with the
        // found user as the element
        if (!(row.Module in PlotUserListObject))
        {
          PlotUserListObject[row.Module] = {};
          PlotUserListObject[row.Module][xLabelMatch] =  [row.User];
        }
        // if the PlotUserListObject has the row's module object already
        else
        {
          // Checks if the xLabelMatch object is already present with in the row's module object,
          // if not, creates an object with the xLabelMatch pointing to a list with the
          // found user as the element.
          if (! ( xLabelMatch in PlotUserListObject[row.Module] ))
          {
            PlotUserListObject[row.Module][xLabelMatch] = [row.User];
          }
          // if the xLabelMatch object is already present with in the row's module object,
          // and if the user is not already present in the row pointed by the xLableMatch of the 
          // row's module object
          else if (!(PlotUserListObject[row.Module][xLabelMatch].includes(row.User)))
          {
            PlotUserListObject[row.Module][xLabelMatch].push(row.User);
          }
        }
      }
    })
  } // PlotUserListObject obtained

// Plot data initializaton
const plotData = {
  labels : label,
  gridLines: { drawOnChartArea: false},
  datasets: []
};

// Populating the datasets list in the plotData
// by building and pusing the plot objects using the PlotUserListObject data
for (const module in PlotUserListObject)
{
  let data = []

  for (const xLabel of plotData.labels )
  {
    if (PlotUserListObject[module][xLabel] !== undefined)
    {
      data.push(PlotUserListObject[module][xLabel] .length)
    }
    else
    {
      data.push(0)
    }
  }

  plotData.datasets.push({
    data: data,
    gridLines:{ drawOnChartArea: false },
    label : module,
    // backgroundColor: "#25ccdd",
    backgroundColor: color(1),
    // backgroundColor: "#" + randomColor, 
    tension: 0.1
  })
}

// Plot options customization

const {theme} = useContext(ThemeContext)
       
const option_WeekFirst = {

    tooltips: {
          enabled: false, 
          mode: 'index',
          intersect: true
       },
    hover: {
          mode: 'index',
          intersect: true
       },

    colors: {
          enabled: false
        },

    indexAxis: "x",
        
    elements: {
      bar: {
         borderWidth: 1,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: 
          {
            // stacked: true,
            ticks: {
              color: "black"
            },
            grid: {
              display: false
          }
          },
        
        y:
          {
            beginAtZero: true,
            grid:{
                display: false
            },
  
          },
        },
        plugins: {
          anchor:"end",
          align:"top",
          plugins: [ChartDataLabels],
          datalabels: {
            formatter: (value, context) =>{
                          },
            anchor: 'middle',
            align:'inside',
            color: "black",
            display: true,
            font:{
              size:"12",
            }
            
          },
          legend: {
             display: true,
            position: "top",

            labels:{
              color:"black"
            }
            
          },
          title: {
            display: true,
            text: "Yearly Report",
            color: "black",
          },
        },
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      };

let change_Axis_Color = [];
let change_XAxis_Color = [];
let change_Axis_Color_Year = [];
let change_XAxis_Color_Year = [];
let change_YAxis_Color_Year = [];
let change_YAxis_Color_Month = [];
let change_Teamcenter = [];
if( theme==="light"?'WeeklyReport':'WeeklyReport-dark'){
  if( theme === 'dark'){
    change_Axis_Color = option_WeekFirst.scales.x.ticks.color = 'white';
    change_XAxis_Color = option_WeekFirst.scales.y.ticks.color = 'white';
    change_Axis_Color_Year = option_WeekFirst.scales.x.ticks.color = 'white';
    change_XAxis_Color_Year = option_WeekFirst.scales.y.ticks.color = 'white';
    change_YAxis_Color_Year = option_WeekFirst.plugins.title.color = 'white';
    change_YAxis_Color_Month = option_WeekFirst.plugins.title.color = 'white';
    change_Teamcenter = option_WeekFirst.plugins.legend.labels.color = 'white';
  }
}

// Return statement
  return( 
        <>
          {(selectedOption.option !== undefined && value_Application.length !== 0)?
            (<div className="Outer1">
              <div className='Layer1' >
                { (plotData.datasets.length !==0) ? 
                  (<Line data={plotData} options={option_WeekFirst} />)
                  :(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
                }
              </div>
            </div>)
            :""}        
        </>
    )
    
    }

    export default LinegraphCustomRange;
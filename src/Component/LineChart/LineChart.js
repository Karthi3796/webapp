import "./LineChart.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { useRef } from 'react';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartPluginStacked100 from "chartjs-plugin-stacked100";
import  zoomPlugin  from "chartjs-plugin-zoom";
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
    ChartPluginStacked100,
    zoomPlugin
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
    startDateTime.setDate(1);
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
    startDateTime.setDate(1);
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

  // #####################
  var palette = [
    ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
    ["#FE4365", "#FC9D9A", "#F9CDAD", "#C8C8A9", "#83AF9B"],
    ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"],
    ["#556270", "#4ECDC4", "#C7F464", "#FF6B6B", "#C44D58"],
    ["#774F38", "#E08E79", "#F1D4AF", "#ECE5CE", "#C5E0DC"],
    ["#E8DDCB", "#CDB380", "#036564", "#033649", "#031634"],
    ["#490A3D", "#BD1550", "#E97F02", "#F8CA00", "#8A9B0F"],
    ["#594F4F", "#547980", "#45ADA8", "#9DE0AD", "#E5FCC2"],
    ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"],
    ["#E94E77", "#D68189", "#C6A49A", "#C6E5D9", "#F4EAD5"],
    ["#D9CEB2", "#948C75", "#D5DED9", "#7A6A53", "#99B2B7"],
    ["#FFFFFF", "#CBE86B", "#F2E9E1", "#1C140D", "#CBE86B"],
    ["#EFFFCD", "#DCE9BE", "#555152", "#2E2633", "#99173C"],
    ["#3FB8AF", "#7FC7AF", "#DAD8A7", "#FF9E9D", "#FF3D7F"],
    ["#343838", "#005F6B", "#008C9E", "#00B4CC", "#00DFFC"],
    ["#413E4A", "#73626E", "#B38184", "#F0B49E", "#F7E4BE"],
    ["#99B898", "#FECEA8", "#FF847C", "#E84A5F", "#2A363B"],
    ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"],
    ["#554236", "#F77825", "#D3CE3D", "#F1EFA5", "#60B99A"],
    ["#351330", "#424254", "#64908A", "#E8CAA4", "#CC2A41"],
    ["#00A8C6", "#40C0CB", "#F9F2E7", "#AEE239", "#8FBE00"],
    ["#FF4242", "#F4FAD2", "#D4EE5E", "#E1EDB9", "#F0F2EB"],
    ["#655643", "#80BCA3", "#F6F7BD", "#E6AC27", "#BF4D28"],
    ["#8C2318", "#5E8C6A", "#88A65E", "#BFB35A", "#F2C45A"],
    ["#FAD089", "#FF9C5B", "#F5634A", "#ED303C", "#3B8183"],
    ["#BCBDAC", "#CFBE27", "#F27435", "#F02475", "#3B2D38"],
    ["#D1E751", "#FFFFFF", "#000000", "#4DBCE9", "#26ADE4"],
    ["#FF9900", "#424242", "#E9E9E9", "#BCBCBC", "#3299BB"],
    ["#5D4157", "#838689", "#A8CABA", "#CAD7B2", "#EBE3AA"],
    ["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"],
    ["#EEE6AB", "#C5BC8E", "#696758", "#45484B", "#36393B"],
    ["#1B676B", "#519548", "#88C425", "#BEF202", "#EAFDE6"],
    ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"],
    ["#452632", "#91204D", "#E4844A", "#E8BF56", "#E2F7CE"],
    ["#F04155", "#FF823A", "#F2F26F", "#FFF7BD", "#95CFB7"],
    ["#F0D8A8", "#3D1C00", "#86B8B1", "#F2D694", "#FA2A00"],
    ["#2A044A", "#0B2E59", "#0D6759", "#7AB317", "#A0C55F"],
    ["#67917A", "#170409", "#B8AF03", "#CCBF82", "#E33258"],
    ["#B9D7D9", "#668284", "#2A2829", "#493736", "#7B3B3B"],
    ["#BBBB88", "#CCC68D", "#EEDD99", "#EEC290", "#EEAA88"],
    ["#A3A948", "#EDB92E", "#F85931", "#CE1836", "#009989"],
    ["#E8D5B7", "#0E2430", "#FC3A51", "#F5B349", "#E8D5B9"],
    ["#B3CC57", "#ECF081", "#FFBE40", "#EF746F", "#AB3E5B"],
    ["#AB526B", "#BCA297", "#C5CEAE", "#F0E2A4", "#F4EBC3"],
    ["#607848", "#789048", "#C0D860", "#F0F0D8", "#604848"],
    ["#515151", "#FFFFFF", "#00B4FF", "#EEEEEE"],
    ["#3E4147", "#FFFEDF", "#DFBA69", "#5A2E2E", "#2A2C31"],
    ["#300030", "#480048", "#601848", "#C04848", "#F07241"],
    ["#1C2130", "#028F76", "#B3E099", "#FFEAAD", "#D14334"],
    ["#A8E6CE", "#DCEDC2", "#FFD3B5", "#FFAAA6", "#FF8C94"],
    ["#EDEBE6", "#D6E1C7", "#94C7B6", "#403B33", "#D3643B"],
    ["#FDF1CC", "#C6D6B8", "#987F69", "#E3AD40", "#FCD036"],
    ["#AAB3AB", "#C4CBB7", "#EBEFC9", "#EEE0B7", "#E8CAAF"],
    ["#CC0C39", "#E6781E", "#C8CF02", "#F8FCC1", "#1693A7"],
    ["#3A111C", "#574951", "#83988E", "#BCDEA5", "#E6F9BC"],
    ["#FC354C", "#29221F", "#13747D", "#0ABFBC", "#FCF7C5"],
    ["#B9D3B0", "#81BDA4", "#B28774", "#F88F79", "#F6AA93"],
    ["#5E3929", "#CD8C52", "#B7D1A3", "#DEE8BE", "#FCF7D3"],
    ["#230F2B", "#F21D41", "#EBEBBC", "#BCE3C5", "#82B3AE"],
    ["#5C323E", "#A82743", "#E15E32", "#C0D23E", "#E5F04C"],
    ["#4E395D", "#827085", "#8EBE94", "#CCFC8E", "#DC5B3E"],
    ["#DAD6CA", "#1BB0CE", "#4F8699", "#6A5E72", "#563444"],
    ["#C2412D", "#D1AA34", "#A7A844", "#A46583", "#5A1E4A"],
    ["#D1313D", "#E5625C", "#F9BF76", "#8EB2C5", "#615375"],
    ["#9D7E79", "#CCAC95", "#9A947C", "#748B83", "#5B756C"],
    ["#1C0113", "#6B0103", "#A30006", "#C21A01", "#F03C02"],
    ["#8DCCAD", "#988864", "#FEA6A2", "#F9D6AC", "#FFE9AF"],
    ["#CFFFDD", "#B4DEC1", "#5C5863", "#A85163", "#FF1F4C"],
    ["#75616B", "#BFCFF7", "#DCE4F7", "#F8F3BF", "#D34017"],
    ["#382F32", "#FFEAF2", "#FCD9E5", "#FBC5D8", "#F1396D"],
  ]
  // ##############
// Plot data initializaton
const plotData = {
  labels : label,
  gridLines: { drawOnChartArea: false},
  datasets: []
};

// Populating the datasets list in the plotData
// by building and pusing the plot objects using the PlotUserListObject data
for ( const [index, [module,value]] of Object.entries(Object.entries(PlotUserListObject)))
{
  console.log(index)
  console.log(module)

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
       label : module,
        backgroundColor:palette[index],
        borderColor:palette[index],
  
    // tension: 0.1
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
            beginAtZero: true,
            // stacked: true,
            ticks: {
              // color: "black"
            },
            grid: {
              display: false
          }
          },
        
        y:
          {
            beginAtZero: true,
            grace:"5%",
            
            ticks : {
              // color: "white",
              maxTicksLimit: 4
            },
          },
        },
        plugins: {

         
          datalabels: {
            color: "black",
            // anchor:"end",
            align:"right",
            font:{
              size:"12",
            }
          },
          plugins: [ChartDataLabels, zoomPlugin],
          zoom: {
            pan:{
              enabled: true,
              mode: "x",
              threshlod: 10
            },
            zoom: {
              wheel: {
                enabled: true,
                speed: 0.1,
              },
              pinch: {
                enabled: true
              },
             
            }
          },
          legend: {
             display: true,
            position: "right",

            labels:{
               color:"black"
            }
            
          },
          title: {
            display: true,
            text: "Trend Graph",
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
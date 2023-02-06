import {React, useState} from 'react';
import "./FourBlockChart.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import datas from "../Daily/SourceData.json";
import Trends from "../Trend/License.json";
import { useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { yellow } from '@mui/material/colors';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);


const FourBlockChart = ({value_Application, selectedOption})=>{

  const {theme} = useContext(ThemeContext)




  
    let arrCount = [];
    let arrMonth = [];
    let arrYear = [];
    let arrayOfSetOfUser=[];
    let moduleUserlist = {};
    if (selectedOption.option !== undefined )
{


  let startDateTime     = null; // The starting date and time for the selected date range option
  let endDateTime       = null; // The end date and time for the selected date range option

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

  }
    else if (selectedOption.name == "Custom Range")
    {
      // Calculating start date time
      startDateTime =  new Date(selectedOption.fromDate);
      startDateTime.setHours(0,0,0,0);

      // Calculating end date time
      endDateTime= new Date(selectedOption.toDate);
      endDateTime.setDate(endDateTime.getDate()+1);
      endDateTime.setSeconds(-1);

      // Writting to the console, the start and end date time
      console.log("StartDate",startDateTime);
      console.log("EndDate",endDateTime)

    }
    
    
          // Iterating the elements in data json file
          datas.forEach( (e) => 
          {
            // Get the date from Date column and Time from the time column and combain it to single value
            let foundDate = e.Date.split("-");
            let foundTime = e.Time.split(":");
            let foundDateTime = foundDate.concat(foundTime);
            foundDateTime = new Date(foundDateTime[0], foundDateTime[1]-1, foundDateTime[2], foundDateTime[3], foundDateTime[4], foundDateTime[5]);
    
            // Check if the Applicaton matches and if (tomorrow > foundDateTime > today) 
            if(e.Application === value_Application && foundDateTime >= startDateTime && foundDateTime <= endDateTime)
            {
              // check if the moduleUserlist has the found mould object already, if not adds the new key and creates a list.  
              if (!(e.Module in moduleUserlist))
              {
                arrYear.push(e.Module)
                moduleUserlist[e.Module] = [e.User];
              }
              else
              {
                // Checks if the user is already present in the value represented by the key of moduleUserlist
                if (! moduleUserlist[e.Module].includes(e.User))
                {
                  moduleUserlist[e.Module].push(e.User)
                }
              }
            }
          })
        
    
    
    // store the length of the values of the keys of moduleUserlist
        for (const value in moduleUserlist)
        {
          arrayOfSetOfUser.push(moduleUserlist[value].length);
        }
    console.log(moduleUserlist);
    console.log(arrayOfSetOfUser);
    
    }

let LicModule = [];
let LiCount = [];
Trends.forEach((s) =>{
    if(s.Application === value_Application){
        LicModule.push(s.Total_License)
        LiCount.push(s.Count)

    }

})

var newArray = [];
var TotalLicCOunt = [];

for (var i = 0; i < arrYear.length; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if (arrYear[i] == LicModule[j]) {
        match = true;
        newArray.push(LicModule[j])
        TotalLicCOunt.push(LiCount[j])
    }   
}  
}

console.log("newArray:", newArray)
console.log("TotalLicense", TotalLicCOunt)

let newWeekCount = [];
let RCount = [];
let RCountg1 = [];

for (var t = 0; t < newArray.length; t++) {
    RCountg1[t] = (TotalLicCOunt[t]- arrayOfSetOfUser[t]);
    RCount[t] = ((arrayOfSetOfUser[t]/TotalLicCOunt[t])*100).toFixed(1);
}

console.log("ValueR",RCountg1)
console.log("valueRCOunt", RCount)
console.log(newArray)
let RCount25 = [];
let RCount50 = [];
let RCount75 = [];
let RCount100 =[];
let RCountModName25 =[];
let RCountModName50 =[];
let RCountModName75 =[];
let RCountModName100 =[];

for (var j = 0; j < RCount.length; j++) {

    if (RCount[j] <= 25) { 
        RCount25.push(arrayOfSetOfUser[j])
        RCountModName25.push(newArray[j])  
    }
    else if(RCount[j]>25 && RCount[j]<=50){
        RCount50.push(arrayOfSetOfUser[j])
        RCountModName50.push(newArray[j])
    }
    else if(RCount[j]>50 && RCount[j]<=75){
        RCount75.push(arrayOfSetOfUser[j])
        RCountModName75.push(newArray[j])
    }
    else if(RCount[j] > 75){
        RCount100.push(arrayOfSetOfUser[j])
        RCountModName100.push(newArray[j])
    } 
    else{
        console.log("No Data")
    }
}

console.log("RCOunt1",RCount25)
console.log("RCOunt25",RCountModName25)
console.log("RCOunt3",RCount75)
console.log("RCOunt25",RCountModName50)
console.log("RCOunt4",RCount100)
console.log("RCOunt25",RCountModName100)

   const data_Teamcenter = {
      labels: RCountModName25,
      datasets: [
        {
          data: RCount25,
          backgroundColor: [
            "rgb(134, 54, 180)",
            "rgb(243, 153, 24)",
            "rgb(228, 0, 23)",
            "#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8",
            "#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"
          ],
          borderWidth: 1,
        },
      ],
  
      options_Teamcenter: {
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
        },
        scales: {
          x: 
          {
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
            grace:"5%",
            
            ticks : {
              // color: "white",
              maxTicksLimit: 4
            },
            grid:{
                display: false
            },
  
          },
        },
        plugins: {
          datalabels: {
            color: "black",
            anchor:"end",
            align:"top",
            font:{
              size:"12",
            }
          },
          plugins: [ChartDataLabels],
            legend: {
               display: false,
              position: "top",
  
              labels:{
                color:"black"
              }
              
            },
            title: {
              display: true,
              text: "Utilization between (0 - 25%)",
              color: "black",
            },
          },
      },
    };


// ###################### Second Graph Start ####################//\


const data_TeamcenterSecond = {
    labels: RCountModName75,
    datasets: [
      {
        data: RCount75,
        backgroundColor: [
          "rgb(134, 54, 180)",
          "rgb(243, 153, 24)",
          "rgb(228, 0, 23)",
          "#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8",
          "#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"
        ],
        borderWidth: 1,
      },
    ],

    options_Teamcentersecond: {
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
      },
      scales: {
        x: 
        {
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
          grace:"5%",
          
          ticks : {
            // color: "white",
            maxTicksLimit: 4
          },
          grid:{
              display: false
          },

        },
      },
      plugins: {
        datalabels: {
          color: "black",
          anchor:"end",
          align:"top",
          font:{
            size:"12",
          }
        },
        plugins: [ChartDataLabels],
        legend: {
           display: false,
          position: "top",

          labels:{
            color:"black"
          }
          
        },
        title: {
          display: true,
          text: "Utilization between (25% - 50%)",
          color: "black",
        },
      },
    },
  };


// ###################### Second Graph End #####################//


// ######################## Third Graph Start ####################//

const data_TeamcenterThird = {
    labels: RCountModName50,
    datasets: [
      {
        data: RCount50,
        backgroundColor: [
          "#4A4031",
          "#FA6A64",
          "rgb(228, 0, 23)",
          "rgb(243, 153, 24)",
         
          "rgb(134, 54, 180)",
         "#7A4E48","#F6E2BB","#9EC6B8",
          "#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"
        ],
        borderWidth: 1,
      },
    ],

    options_TeamcenterThird: {
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
      },
      scales: {
        x: 
        {
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
          grace:"5%",
          
          ticks : {
            // color: "white",
            maxTicksLimit: 4
          },
          grid:{
              display: false
          },

        },
      },
      plugins: {
        datalabels: {
          color: "black",
          anchor:"end",
          align:"top",
          font:{
            size:"12",
          }
        },
        plugins: [ChartDataLabels],
        legend: {
           display: false,
          position: "top",

          labels:{
            color:"black"
          }
          
        },
        title: {
          display: true,
          text: "Utilization between (50% - 75%)",
          color: "black",
        },
      },
    },
  };

// ######################## Third Graph End ##################### //


// ######################### Fourth Graph Start ################# //

const data_TeamcenterFourth = {
    labels: RCountModName100,
    datasets: [
      {
        data: RCount100,
        backgroundColor: [
          
          "rgb(243, 153, 24)",
          "rgb(228, 0, 23)",
          "#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8",
          "#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578","rgb(134, 54, 180)",
        ],
        borderWidth: 1,
      },
    ],

    options_TeamcenterFourth: {

      maintainAspectRatio: false,
      animation: {
        duration: 2000,
      },
      scales: {
        x: 
        {
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
          grace:"5%",
          
          ticks : {
            // color: "white",
            maxTicksLimit: 4
          },
          grid:{
              display: false
          },

        },
      },
      plugins: {

      datalabels: {
            color: "black",
            anchor:"end",
            align:"top",
            font:{
              size:"12",
            }
          },
          plugins: [ChartDataLabels],
        // datalabels: {
        //   align:'top',
        //   color: "black",
        //   display: true,
          
          
        // },
        legend: {
           display: false,
          position: "top",

          labels:{
            color:"black"
          }
          
        },
        title: {
          display: true,
          text: "More than 75% Utilization",
          color: "black",
        },
      },
    },
  };


// ######################## Fourth Graph end #################### //

const getLast6Months = () => {
    let currentDate = new Date();
    let last6Months = [];
    for (let i = 0; i < 6; i++) {
      let month = currentDate.getMonth() - i;
      let year = currentDate.getFullYear();
      if (month < 0) {
        month = 12 + month;
        year--;
      }
      let monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(year, month, 1));
      last6Months.push(monthName);
    }
    return last6Months;
  }
  
  console.log(getLast6Months());
  
  console.log("last6month",getLast6Months());


  const getPreviousMonth = () => {
    let currentDate = new Date();
    let month = currentDate.getMonth() - 1;
    if (month < 0) {
      month = 11; // Since JavaScript counts months starting from 0
    }
    let monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(currentDate.getFullYear(), month, 1));
    return monthName;
  }
  
  console.log(getPreviousMonth());



  const getLast6Years = () => {
    let currentYear = new Date().getFullYear();
    let last6Years = [];
    for (let i = 0; i < 6; i++) {
      last6Years.push(currentYear - i);
    }
    return last6Years;
  }
  console.log(getLast6Years());
  
  const chartContainer = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);
  
  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };
    return(
      <>
      {(value_Application == "Teamcenter" || value_Application === "Tc-VisMockup")?
       (<div className='OverallC'> 
         {/* <button className="FullScreen" onClick={toggleFullScreen}>Fullscreen</button>       */}
        <div className='Two'>
      
            <div className='graph3'ref={chartContainer}
//  style={{
//    position: "relative",
//    width: isFullScreen ? "100%" : "50%",
//    height: isFullScreen ? "65vh" : "49vh"
//  }} 
  >
            <Bar
               data={data_TeamcenterFourth}
               options={data_TeamcenterFourth.options_TeamcenterFourth}
            />
        </div>
            <div className='graph4' ref={chartContainer}
//  style={{
//    position: "relative",
//    width: isFullScreen ? "98%" : "50%",
//    height: isFullScreen ? "65vh" : "49vh"
//  }}
 >
  
            <Bar
            data={data_TeamcenterThird}
            options={data_TeamcenterThird.options_TeamcenterThird}
           
             
            />
            </div>
        </div> 
        <div className='Two1'>
            <div className='graph3' ref={chartContainer}
//  style={{
//    position: "relative",
//    width: isFullScreen ? "98%" : "50%",
//    height: isFullScreen ? "65vh" : "49vh"
//  }}
 >
        <Bar
                data={data_TeamcenterSecond}
                options={data_TeamcenterSecond.options_Teamcentersecond}
            />
        </div>
            <div className='graph4' ref={chartContainer}
//  style={{
//    position: "relative",
//    width: isFullScreen ? "98%" : "50%",
//    height: isFullScreen ? "65vh" : "49vh"
//  }}
 >
            <Bar
              data={data_Teamcenter}
              options={data_Teamcenter.options_Teamcenter}
            />
            </div>
        </div> 
        </div> )  : ""}
        </>
    )

}

export default FourBlockChart;


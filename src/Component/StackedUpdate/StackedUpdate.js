import "./StackedUpdate.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ChartPluginStacked100 from "chartjs-plugin-stacked100";
// import App1 from './label';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    
} from 'chart.js';
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { Colors } from 'chart.js';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels,
    ChartPluginStacked100,
);

const StackedUpdate = ({value_Application,value_Year, selectedOption, dropdownvalue})=>{

    let arrCount = [];
    let arrMonth = [];
    let arrayOfSetOfUserFirst = [];  
    let arrYearFirst = [];
    let moduleUserlist = {};

    // ############################ Second Graph #################################
    let arrayOfSetOfUser=[];
    let arrModUser1 = [];
    let arrUserModuleCount = [];
    let arrYear = [];
    let moduleUserlistFirst = [];

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
        // console.log(startDateTime)
        // console.log(foundDateTime)
        // console.log(endDateTime)
        if(e.Application === value_Application && foundDateTime >= startDateTime && foundDateTime <= endDateTime)
        {
          // console.log("entered")
          // check if the moduleUserlist has the found mould object already, if not adds the new key and creates a list.  
          if (!(e.Module in moduleUserlist))
          {
            arrYearFirst.push(e.Module)
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
      arrayOfSetOfUserFirst.push(moduleUserlist[value].length);
    }
    console.log(moduleUserlist);
    console.log(arrayOfSetOfUserFirst);

    // Second graph data extraction
    datas.forEach( (e) => 
    {
      
      let foundDate = e.Date.split("-");
      let foundTime = e.Time.split(":");
      let foundDateTime = foundDate.concat(foundTime);
      foundDateTime = new Date(foundDateTime[0], foundDateTime[1]-1, foundDateTime[2], foundDateTime[3], foundDateTime[4], foundDateTime[5]);

    
      if(e.Application === value_Application && foundDateTime >= startDateTime && foundDateTime <= endDateTime)
      {
        
        if (!(e.Module in moduleUserlistFirst))
        {
          arrYear.push(e.Module)
          moduleUserlistFirst[e.Module] = [e.User];
        }
        else
        {
          
          if (! moduleUserlistFirst[e.Module].includes(e.User))
          {
            moduleUserlistFirst[e.Module].push(e.User)
          }
        }
      }
    })

    for (const value in moduleUserlistFirst)
    {
      arrayOfSetOfUser.push(moduleUserlistFirst[value].length);
    }
    console.log(moduleUserlistFirst);
    console.log(arrayOfSetOfUser);
}



// ########################

let LicModule = [];
let LiCount = [];
Trends.forEach((s) =>{
    if(s.Application === value_Application){
        LicModule.push(s.Total_License)
        LiCount.push(s.Count)
    }
})

var newArrayFirst = [];
var TotalLicCountFirst = [];

for (var i = 0; i < arrYearFirst.length; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if (arrYearFirst[i] == LicModule[j]) {
        match = true;
        newArrayFirst.push(LicModule[j])
        TotalLicCountFirst.push(LiCount[j])
    }   
}  
}

console.log("ModuleName",newArrayFirst)
console.log("Module_TotalCount", TotalLicCountFirst)



let PCount = [];
let CountTotal = [];
let RCountFirst = [];
for (var t = 0; t < newArrayFirst.length; t++) {
    CountTotal[t] = TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]
    RCountFirst[t] = (TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]);
    PCount[t] = ((arrayOfSetOfUserFirst[t]/ TotalLicCountFirst[t])*100).toFixed(1)
    // PCount[t] = ((arrayOfSetOfUserFirst[t]/TotalLicCountFirst[t])*100).toFixed(0);
}

console.log("Used Count Percentage",PCount)


let NewCount = [];
let NewPercentage = [];

for (var r = 0; r< newArrayFirst.length; r++ ){
    NewCount[r] = TotalLicCountFirst[r]- arrayOfSetOfUserFirst[r]
    NewPercentage[r] = ((NewCount[r]/ TotalLicCountFirst[r])*100).toFixed(1)
    for (let i = 0; i < NewPercentage.length; i++) {
        if (parseInt(NewPercentage[i]) < 0) {
            NewPercentage[i] = '0';
        }
      }
}

console.log(NewCount)
console.log("Avaiable Count Percentage",NewPercentage)


// #########
let array1 = newArrayFirst;
let array2 = TotalLicCountFirst;

let ModuleName_with_Count = array1.map((element1, index) => {
  let element2 = array2[index];
  return `${element1}(${element2})`;
});

console.log("ModuleNameWithCount",ModuleName_with_Count); 

// #########

// ###############


// ############### 




const data_WeekFirst = {
  tooltips: {
    enabled: false
  },
    labels: ModuleName_with_Count,
    gridLines: {
      drawOnChartArea: false
  },

    datasets: [
        {
            //    label:"LRG",
            data: PCount,
            gridLines: {
              drawOnChartArea: false
          },
          label:"Used",
            backgroundColor: 
            
            // "rgb(134, 54, 180)"
            "rgb(243, 153, 24)",
            // "rgb(228, 0, 23)"
            // borderColor: "black",
            color:"white",
          },
      {
        //    label:"LRG",
        data: NewPercentage,
        gridLines: {
          drawOnChartArea: false
      },
        label:"Available",
       
        // backgroundColor: "rgb(41, 152, 139)",
        backgroundColor: "#25ccdd", // Blue
        // borderColor: "black",
      },

    ],
  };

  const {theme} = useContext(ThemeContext)

       
       const option_WeekFirst = {

        tooltips: {
          enabled: false, 
          mode: 'index',
          intersect: true
       },
       hover: {
        mode: null
      },

        colors: {
          enabled: false
        },

        indexAxis: "y",
        elements: {
          bar: {
            borderWidth: 1,
           
          },
        },
        // barPercentage: 0.5,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: 
          {
            stacked: true,
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
            stacked: true,
            grid:{
                display: false
            },
  
          },
        },
        plugins: {
          // tooltip: {
          //   enabled: false // <-- this option disables tooltips
          // },
          datalabels:{
          anchor:"end",
          align:"top",
          },
          plugins: [ChartPluginStacked100, ChartDataLabels],
        //   stacked100:{
        //     enable: true,
        //     // display: true,
        //   },

          datalabels: {
            formatter: (value, context) =>{
              // console.log("value",value)
              // console.log("context",context)
                // const display = []
                // return display;
                // for(let i = 0 ;i <RCountFirst.length;i++){
              
                //   return RCountFirst[i];
                // }

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
            text: dropdownvalue,
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


// ########################

let LicModuleF = [];
let LiCountF = [];
Trends.forEach((s) =>{
if(s.Application === value_Application){
    LicModuleF.push(s.Total_License)
    LiCountF.push(s.Count)
}
})

var newArray = [];
var TotalLicCOunt = [];

for (var i = 0; i < arrYear.length; i++) {
var match = false; 
for (var j = 0; j < LicModuleF.length; j++) {
if (arrYear[i] == LicModuleF[j]) {
    match = true;
    newArray.push(LicModuleF[j])
    TotalLicCOunt.push(LiCountF[j])
   
}   
}  
}

console.log(newArray)

// let PCount = [];
let CountTotalF = [];
let RCount = [];
let UsedSecondCount = [];
for (var t = 0; t < newArray.length; t++) {
CountTotalF[t] = TotalLicCOunt[t]- arrayOfSetOfUser[t]
RCount[t] = (TotalLicCOunt[t]- arrayOfSetOfUser[t]);
UsedSecondCount[t] = ((arrayOfSetOfUser[t]/ TotalLicCOunt[t])*100).toFixed(1)
}

console.log("UsedSecondCount", UsedSecondCount)
// // console.log("PCount",PCount)
let RNew = [];
let secondNewCount = [];
var len = newArray.length;
for (var i = 0; i < len; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if(!newArray.some((data)=> {return data===LicModule[j]})){
        if (newArray[i] != LicModule[j]) {
            match = true;
            newArray.push(LicModule[j])
            RCount.push(LiCount[j])
            RNew = RCount
            // RNew =LiCount[j] -RCount[j] 
        }
        for (let i = 0; i < RNew.length; i++) {
          if (parseInt(RNew[i]) < 0) {
            RNew[i] = '0';
          }
        }
        
    }

}  
}

let AvailableSecondCount = [];
console.log("newArray",newArray)
console.log("LicModuleF",LicModuleF)

let SecondTotalvalue = [];

for (var i = 0; i < newArray.length; i++) {
  var match = false; 
  for (var j = 0; j < LicModuleF.length; j++) {
  if (newArray[i] == LicModuleF[j]) {
      match = true;
      SecondTotalvalue.push(LiCountF[j])
  }   
  }  
  }

  console.log("SecondTotalvalue",SecondTotalvalue)

for (var l = 0; l < newArray.length; l++) {
  AvailableSecondCount[l] = ((RNew[l]/ SecondTotalvalue[l])*100).toFixed(1)
  }



console.log("AvailableSecondCount",AvailableSecondCount)

// for (var r = 0; r< newArray.length; r++ ){
//   NewCount[r] = TotalLicCountFirst[r]- arrayOfSetOfUserFirst[r]
//   NewPercentage[r] = ((NewCount[r]/ TotalLicCountFirst[r])*100).toFixed(1)
//   for (let i = 0; i < NewPercentage.length; i++) {
//       if (parseInt(NewPercentage[i]) < 0) {
//           NewPercentage[i] = '0';
//       }
//     }
// }

// console.log("NewPercentage",NewPercentage)

// var Cused = [newWeekCount, RCount];

const data_week = {
labels: newArray,
gridLines: {
  drawOnChartArea: false
},

datasets: [
  {
    //    label:"LRG",
    data: UsedSecondCount,
    gridLines: {
      drawOnChartArea: false
  },
  label:"Used",
    backgroundColor: 
    
    // "rgb(134, 54, 180)"
    "rgb(243, 153, 24)",
    // "rgb(228, 0, 23)"
    // borderColor: "black",
    color:"white",
  },
  {
    //    label:"LRG",
    data: AvailableSecondCount,
    gridLines: {
      drawOnChartArea: false
  },
    label:"Available",
   
    // backgroundColor: "rgb(41, 152, 139)",
    backgroundColor: "#25ccdd", // Blue
    // borderColor: "black",
  },
],
};

// const {theme} = useContext(ThemeContext)

   
   const option_Week = {

    tooltips: {
      enabled: false, 
      mode: 'index',
      intersect: true
   },
   hover: {
    mode: null
  },

    colors: {
      enabled: false
    },

    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 1,
       
      },
    },
    // barPercentage: 0.5,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: 
      {
        stacked: true,
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
        stacked: true,
        grid:{
            display: false
        },

      },
    },
    plugins: {
      datalabels:{
      anchor:"end",
      align:"top",
      },
      plugins: [ChartPluginStacked100, ChartDataLabels],
      // stacked100:{
      //   enable: true,
      //   // display: true,
      // },

      datalabels: {
        formatter: (value, context) =>{
          // // console.log("value",value)
          // console.log("context",context)
            // const display = []
            // return display;
            // for(let i = 0 ;i <RCount.length;i++){
          
            //   return RCount[i];
            // }

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
        text: dropdownvalue,
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

  let change_Axis_ColorF = [];
  let change_XAxis_ColorF = [];
  let change_Axis_Color_YearF = [];
  let change_XAxis_Color_YearF = [];
  let change_YAxis_Color_YearF = [];
  let change_YAxis_Color_MonthF = [];
  let change_TeamcenterF = [];
  if( theme==="light"?'WeeklyReport':'WeeklyReport-dark'){
    if( theme === 'dark'){
      change_Axis_ColorF = option_Week.scales.x.ticks.color = 'white';
      change_XAxis_ColorF = option_Week.scales.y.ticks.color = 'white';
      change_Axis_Color_YearF = option_Week.scales.x.ticks.color = 'white';
      change_XAxis_Color_YearF = option_Week.scales.y.ticks.color = 'white';
      change_YAxis_Color_YearF = option_Week.plugins.title.color = 'white';
      change_YAxis_Color_MonthF = option_Week.plugins.title.color = 'white';
      change_TeamcenterF = option_Week.plugins.legend.labels.color = 'white';
    }
  }


// const subbox = document.querySelector(".subbox");

// subbox.style.height = '300px';

// #############################




// ############################ Second Graph #################################

const [toggleState, setToggleState] = useState(1);

const toggleTab = (index) => {
  setToggleState(index);
};

// ###############################

// #############################
    return(
      <>
{/* {selectedOptions[0].value === "Stacked100% Chart"  ? */}
{ (value_Application == "Teamcenter" || value_Application === "Tc-VisMockup")?

(<div>
    

<div
  className="tainer">
      <div className="bloc-tabs">
        
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Used Modules
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
         All Modules
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {value_Application!=="" ?
            (<div className="Outer">  
           <div   className={theme==="light"?'Layer1':'WeeklyReport-dark'} >  
            { !(arrayOfSetOfUserFirst.length === 0 && arrYearFirst.length === 0) ? 
           (
              <Bar 
              data={data_WeekFirst} options={option_WeekFirst} 
              />
  ):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
            }
            </div>
             
            </div>):""}   
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
                     {value_Application!=="" ?
            (<div className="OutSide">  
           <div className={theme==="light"?'WeeklyReport':'WeeklyReport-dark'} >  
            { !(arrayOfSetOfUser.length === 0 && arrYear.length === 0) ? 
           (<div className="subbox">
              <Bar 
              data={data_week} options={option_Week} 
              />
              </div>   ):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
            }
            </div>
             
            </div>):""} 
        </div>

      </div>
    </div>
    </div>):""}
    </>
        
    )
    
    }

    export default StackedUpdate;
import "./DateChart.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { useRef } from 'react';
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

// Sample reference: SourceData.json
///[{"Date":"2009-01-01","Time":"7:24:13","Permission":"IN","Module":"catv5tojt_sca","User":"infodba","Server":"HR1JPLMPSR15P","Application":"Tc-VisMockup","Month":"January","Year":"2009","Week":"0"},{"Date":"2009-01-01","Time":"11:29:37","Permission":"IN","Module":"teamcenter_author","User":"rahul_15087","Server":"TcServer","Application":"Teamcenter","Month":"January","Year":"2009","Week":"0"},{"Date":"2009-01-01","Time":"11:29:37","Permission":"IN","Module":"design_de","User":"rahul_15087","Server":"TcServer","Application":"Teamcenter","Month":"January","Year":"2009","Week":"0"},{"Date":"2009-01-01","Time":"11:28:50","Permission":"IN","Module":"teamcenter_author","User":"tcdba","Server":"TcServer","Application":"Teamcenter","Month":"January","Year":"2009","Week":"0"}]

const DateChart = ({value_Application, selectedOption, selectedOptions})=>{

  // Variable decleration
    let arrCount = [];
    let arrMonth = [];
    let arrayOfSetOfUserFirst = [];  
    let arrYearFirst = [];
    let moduleUserlist = {};
if ((selectedOption.name == 'Today' || selectedOption.name == 'Yesterday') && selectedOption.value.length !== 0)
{


    const startTime = 0; // Set the starting time for the day (Railway time: hour of the day)

    // Getting today's date
    const today = new Date();
    // Setting the start time of the day
    today.setHours(startTime,0,0,0);

    // Getting date and time after 24 hrs
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+ 1);

    // Getting date and time before 24 hrs
    const Yesterday = new Date();
    Yesterday.setDate(Yesterday.getDate() -1);

    // Defining start date time
    let startDateTime= today;
    // Defining end date time
    let endDateTime= tomorrow;
    if (selectedOption.name == 'Yesterday')
    {
          // Defining start date time
    startDateTime= Yesterday;
    // Defining end date time
    endDateTime= today;
    }
    
    // Check if the selected Data range option is today or yesterday
    if((selectedOption.name == 'Today' || selectedOption.name == 'Yesterday') &&  selectedOption.value.length !== 0 )
    {


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
    }


// store the length of the values of the keys of moduleUserlist
    for (const value in moduleUserlist)
    {
      arrayOfSetOfUserFirst.push(moduleUserlist[value].length);
    }
console.log(moduleUserlist);
console.log(arrayOfSetOfUserFirst);

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

// console.log(LicModule);
// console.log("arrYearFirst", LiCount);

var newArrayFirst = [];
var TotalLicCountFirst = [];

for (var i = 0; i < arrYearFirst.length; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if (arrYearFirst[i] == LicModule[j]) {
        match = true;
        newArrayFirst.push(LicModule[j])
        TotalLicCountFirst.push(LiCount[j])
        // newArrayFirst.push(LiCount[j])
       
    }   
}  
}

console.log("ModuleName",newArrayFirst)
console.log("Module_TotalCount", TotalLicCountFirst)

// #########
let array1 = newArrayFirst;
let array2 = TotalLicCountFirst;

let ModuleName_with_Count = array1.map((element1, index) => {
  let element2 = array2[index];
  return `${element1}(${element2})`;
});

console.log(ModuleName_with_Count); 

// #########

let CountTotal = [];
let RCountFirst = [];
for (var t = 0; t < newArrayFirst.length; t++) {
    CountTotal[t] = TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]
    RCountFirst[t] = (TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]);

}

const data_WeekFirst = {
    labels: ModuleName_with_Count,
    gridLines: {
      drawOnChartArea: false
  },

    datasets: [
      {
        //    label:"LRG",
        data: RCountFirst,
        gridLines: {
          drawOnChartArea: false
      },
        label:"Available",
       
        // backgroundColor: "rgb(41, 152, 139)",
        backgroundColor: "#25ccdd", // Blue
        // borderColor: "black",
      },
      {
        //    label:"LRG",
        data: arrayOfSetOfUserFirst,
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
          mode: 'index',
          intersect: true
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
          anchor:"end",
          align:"top",
          plugins: [ChartPluginStacked100, ChartDataLabels],
          stacked100:{
            enable: true,
            // display: true,
          },

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
  








// #############################
return(
<>
  { (value_Application == "Teamcenter" || value_Application === "Tc-VisMockup" || value_Application!=="" )?
      (<div className="tainer">
        <div className="content-tabs">
          <div>
            {value_Application!=="" ? 
            (<div className="Outer">  
              <div className={theme==="light"?'Layer1':'WeeklyReport-dark'} >  
                { 
                !(arrayOfSetOfUserFirst.length === 0 && arrYearFirst.length === 0) ? 
                 (<Bar data={data_WeekFirst} options={option_WeekFirst} />):
                 (<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
                }
              </div>
             </div>):""}
        </div>
      </div>
    </div>):""}
    </>   
    )
    }

    export default DateChart;
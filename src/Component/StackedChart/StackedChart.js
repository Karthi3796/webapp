import "./StackedChart.css"
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






const StackedChart = ({value_Application,value_Year, selectedOption, selectedOptions})=>{

    let arrCount = [];
    let arrMonth = [];
    console.log(selectedOption)
    // console.log('label',label.indexOf(29))
    if(selectedOption.value.length!==0){
    selectedOption.value.forEach((v, i)=>{
      datas.forEach((e)=>{
        
        if(e.Application===value_Application){ 
            if(e[selectedOption.name]===v && e.Year === selectedOption.Year[i]){
                console.log("in")
              const present = arrMonth.some((data)=>{
                return data===e.Module;
              })
              if(!present){
                arrMonth.push(e.Module);
              }
              console.log("Vanakam da ", arrMonth)
                    
                    arrCount.push(e.Count);

            }
          
        }
      });
    })
    }

   
// #########################
console.log(arrMonth)
let arrayOfSetOfUserFirst=[];

// let arrYearFirst = arrMonth;
let arrYearFirst = arrMonth
console.log(arrYearFirst)
arrYearFirst.forEach((value1,i)=>{
  let setOfUserFirst=[];
//   console.log(value1)
    datas.forEach((e)=>{
     if (e.Application === value_Application && value1=== e.Module) {
        selectedOption.value.forEach((v,i)=>{
            if(e[selectedOption.name]===v  && e.Year === selectedOption.Year[i]){
      // if (e.Application === "Teamcenter" && e.Month === "December" && value1=== e.Module) {
                 if (!setOfUserFirst.includes(e.User))
                        {
                        setOfUserFirst.push(e.User);
                        }
      }
    })
    }
    })
 
  //  arrModUser = null;
     console.log(value1)
    // console.log(setOfUser.length)
    console.log(setOfUserFirst)
    arrayOfSetOfUserFirst.push(setOfUserFirst.length)
   
})

console.log("arrayofSetUser",arrayOfSetOfUserFirst)

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
       
    }   
}  
}

// console.log(newArrayFirst)

// let PCount = [];
let CountTotal = [];
let RCountFirst = [];
for (var t = 0; t < newArrayFirst.length; t++) {
    CountTotal[t] = TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]
    RCountFirst[t] = (TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]);
    // PCount[t] = ((arrayOfSetOfUserFirst[t]/ TotalLicCountFirst)*100).toFixed(1)
    // PCount[t] = ((arrayOfSetOfUserFirst[t]/TotalLicCountFirst[t])*100).toFixed(0);
}

console.log(RCountFirst)
console.log("newArrayFirst",newArrayFirst)

// var len = newArrayFirst.length;
// for (var i = 0; i < len; i++) {
//     var match = false; 
//     for (var j = 0; j < LicModule.length; j++) {
//         if(!newArrayFirst.some((data)=> {return data===LicModule[j]})){
//             if (newArrayFirst[i] != LicModule[j]) {
//                 match = true;
//                 newArrayFirst.push(LicModule[j])
//                 RCountFirst.push(LiCount[j])
//             }  
//         }
//     }  
//     }


// console.log("Newone",newArrayFirst)
// console.log("NewOneCount",RCountFirst)




// var Cused = [newWeekCount, RCountFirst];

const data_WeekFirst = {
    labels: newArrayFirst,
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
  

// ############################ Second Graph #################################


let arrYear = [];

if(selectedOption.value.length!==0){
    selectedOption.value.forEach((v, i)=>{
      datas.forEach((e)=>{
        
        if(e.Application===value_Application){ 
            console.log(e[selectedOption.name]===v )
            if(e[selectedOption.name]===v && e.Year === selectedOption.Year[i]){
                console.log("in")
              const present = arrYear.some((data)=>{
                return data===e.Module;
              })
              if(!present){
                arrYear.push(e.Module);
              }
              console.log("Vanakam da ", arrYear)
                    
                    arrCount.push(e.Count);

            }
          
        }
      });
    })
    }
// #########################

let arrayOfSetOfUser=[];
let arrModUser1 = [];
let arrUserModuleCount = [];


arrYear.forEach((value1,i)=>{
  let setOfUserFirst=[];
  let setOfUser=[];
//   console.log(value1)
    datas.forEach((e)=>{
     if (e.Application === value_Application && value1=== e.Module) {
        selectedOption.value.forEach((v,i)=>{
            if(e[selectedOption.name]===v  && e.Year === selectedOption.Year[i]){
      // if (e.Application === "Teamcenter" && e.Month === "December" && value1=== e.Module) {
                 if (!setOfUser.includes(e.User))
                        {
                        setOfUser.push(e.User);
                        }
      }
    })
    }
    })
 
  //  arrModUser = null;
     console.log(value1)
    // console.log(setOfUser.length)
    console.log(setOfUser)
    arrayOfSetOfUser.push(setOfUser.length)
   
})

console.log("arrayofSetUser",arrayOfSetOfUser)


// ########################

let LicModuleF = [];
let LiCountF = [];
Trends.forEach((s) =>{
if(s.Application === value_Application){
    LicModuleF.push(s.Total_License)
    LiCountF.push(s.Count)

}

})

// console.log(LicModule);
// console.log("arrYear", LiCount);

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

// console.log(newArray)

// let PCount = [];
let CountTotalF = [];
let RCount = [];
for (var t = 0; t < newArray.length; t++) {
CountTotalF[t] = TotalLicCOunt[t]- arrayOfSetOfUser[t]
RCount[t] = (TotalLicCOunt[t]- arrayOfSetOfUser[t]);
// PCount[t] = ((arrayOfSetOfUser[t]/ TotalLicCOunt)*100).toFixed(1)
// PCount[t] = ((arrayOfSetOfUser[t]/TotalLicCOunt[t])*100).toFixed(0);
}

// console.log(RCount)
// // console.log("PCount",PCount)

var len = newArray.length;
for (var i = 0; i < len; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if(!newArray.some((data)=> {return data===LicModule[j]})){
        if (newArray[i] != LicModule[j]) {
            match = true;
            newArray.push(LicModule[j])
            RCount.push(LiCount[j])
        }  
    }
}  
}


// console.log("Newone",newArray)
// console.log("NewOneCount",RCount)




// var Cused = [newWeekCount, RCount];

const data_week = {
labels: newArray,
gridLines: {
  drawOnChartArea: false
},

datasets: [
  {
    //    label:"LRG",
    data: RCount,
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
    data: arrayOfSetOfUser,
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

// const {theme} = useContext(ThemeContext)

   
   const option_Week = {

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
(<div className="tainer">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Used Module
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
         All Module
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          {value_Year!==''&&value_Application!=="" ?
            (<div className="Outer">  
           <div className={theme==="light"?'Layer1':'WeeklyReport-dark'} >  
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
                     {value_Year!==''&&value_Application!=="" ?
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
    </div>)
    </>


        
    )
    
    }

    export default StackedChart;
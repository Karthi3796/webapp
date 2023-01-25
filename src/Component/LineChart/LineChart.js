import "./LineChart.css"
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
import { Bar, Line } from 'react-chartjs-2';
import { LineChart } from "recharts";
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

const Linegraph = ({value_Application,value_Year, selectedOption})=>{

    let arrMonthname = [];
    let arrMonth = [];
    // console.log(selectedOption)
    if(selectedOption.value.length!==0){
    selectedOption.value.forEach((v, i)=>{
      datas.forEach((e)=>{
        
        if(e.Application===value_Application){ 
            // console.log(e[selectedOption.name]===v )
            if(e[selectedOption.name]===v && e.Year === selectedOption.Year[i]){
                // console.log("in")
              const present = arrMonth.some((data)=>{
                return data===e.Module;
              })
              if(!present){
                arrMonth.push(e.Module);
              }
              const presented = arrMonthname.some((data)=>{
                return data===e.Month;
              })
              if(!presented){
                arrMonthname.push(e.Month);
              }
              // console.log("MonthName:",arrMonthname)
            }
          
        }
      });
    })
    }

   
// #########################
// console.log(arrMonth)
let arrayOfSetOfUserFirst=[];

// let arrYearFirst = arrMonth;
let arrYearFirst = arrMonth
// console.log(arrYearFirst)
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
    //  console.log(value1)
    // console.log(setOfUser.length)
    // console.log(setOfUserFirst)
    arrayOfSetOfUserFirst.push(setOfUserFirst.length)
   
})

// console.log("arrayofSetUser",arrayOfSetOfUserFirst)


const data_WeekFirst = {
    labels: arrMonth,
    gridLines: {
      drawOnChartArea: false
  },

    datasets: [
      {
        //    label:"LRG",
        data: arrayOfSetOfUserFirst,
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

  const data = {
    labels: arrMonth,
    datasets: [],
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

        indexAxis: "x",
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
            // stacked: true,
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
          plugins: [ChartDataLabels],
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
  

const [toggleState, setToggleState] = useState(1);

const toggleTab = (index) => {
  setToggleState(index);
};

// ############################

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
];

// ###############################
// var data6 = [];
// for (let j = 0; j < arrMonthCount.length; j++) {
//   // for(let k=0;k<arrMonthCount[0].length;k++){
//   data6 = [];
//   for (let c = 0; c < arrMonthCount.length; c++) {
//     // console.log("c",c,k)
//     data6.push(arrMonthCount[c][j]);
//   }

//   data.datasets.push({
//     label: arrModule[j],
//     data: data6,
//     backgroundColor: palette[j+1],
//     borderColor:palette[j]

//   });
// }

// #############################
    return(
<>
          {value_Year!==''&&value_Application!=="" ?
            (<div className="Outer1">  
           <div className={theme==="light"?'Layer1':'WeeklyReport-dark'} >  
            { !(arrayOfSetOfUserFirst.length === 0 && arrYearFirst.length === 0) ? 
           (
              <Line 
              data={data_WeekFirst} options={option_WeekFirst} 
              />
  ):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
            }
            </div>
             
            </div>):""}        
   


        </>
    )
    
    }

    export default Linegraph;
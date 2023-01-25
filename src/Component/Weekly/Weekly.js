import "./Weekly.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { useRef } from 'react';
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
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
    ChartDataLabels
);






const Weekly = ({value_Application,value_Week_DD})=>{


  const {theme} = useContext(ThemeContext)

       
       const option_Week = {
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
          // plugins: [ChartDataLabels],
          datalabels: {
            color: "#ffffff",
          },
          legend: {
            display: false,
            position: "bottom",
          },
          title: {
            display: true,
            text: "Weekly Report",
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

      // Weekly Report ########################
      // let label_Week;
      let arrCount = [];
      let arrWeek = [];
      // console.log('label',label.indexOf(29))
      datas.forEach((e) => {
        if (e.Application === value_Application && e.Week === value_Week_DD) {

          // if () find/some
          const present = arrWeek.some((data)=>{
            return data===e.Module;
          })
          if(!present){
            arrWeek.push(e.Module);
          }
                
                arrCount.push(e.Count);
        }
      });
      console.log("arrWeek", arrWeek)
      let arrcount1=[];
      arrWeek.forEach((vModule,i)=>{
      let max1 = 0;
        datas.forEach((f)=>{
          if(f.Application === value_Application && f.Week === value_Week_DD)
          {
            if(f.Module===vModule){
              if(f.Count>max1){
                max1 = f.Count;
              }
            }
          } 
        })
        arrcount1[i] = max1;
      })
    
       console.log(arrcount1);
      console.log("array_week", arrWeek);

      if (arrcount1 == 0 && arrWeek == 0) {

        console.log(" NO Data Found ")

      }
    
      const data_week = {
        labels: arrWeek,
        gridLines: {
          drawOnChartArea: false
      },
    
        datasets: [
          {
            //    label:"LRG",
            data: arrcount1,
            gridLines: {
              drawOnChartArea: false
          },
            // backgroundColor: "rgb(41, 152, 139)",
            backgroundColor: "rgb(92, 118, 252)", // Blue
            // borderColor: "black",
          },
        ],
      };

      let change_Axis_Color1 = [];
      let change_XAxis_Color1 = [];
      let change_YAxis_Color_Month1 = [];
      if( theme==="light"?'Utlity':'Utlity-dark'){
        if( theme === 'dark'){
          change_Axis_Color1 = option_Week.scales.y.ticks.color = 'white';
          change_XAxis_Color1 = option_Week.scales.x.ticks.color = 'white';
          change_YAxis_Color_Month1 = option_Week.plugins.title.color = 'white';
        }
      }

    //   #################

    const [graphselected, setgraphSelected] = useState("");

const squareValue = arrWeek.map((number)=>{  
    return (number);  
 
});



      const chartRef = useRef();
      const onClick = (event) =>{
          if(getElementsAtEvent(chartRef.current, event).length >0){
              const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
              const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
              setgraphSelected(data_week.labels[dataPoint])
          }
      }
  
      var newWeek = [];
      var newWeekCount = [];
for (var i = 0; i < arrWeek.length; i++) {
      if(graphselected === arrWeek[i]){
         newWeek.push(arrWeek[i])
         newWeekCount.push(arrcount1[i])
      }

    }
      // ###################

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
  
  for (var i = 0; i < newWeek.length; i++) {
      
      var match = false; 
      for (var j = 0; j < LicModule.length; j++) {
          if (newWeek[i] == LicModule[j]) {
              match = true;
              newArray.push(LicModule[j])
              TotalLicCOunt.push(LiCount[j])
              break;
          }   
      }  
  }
  
  let CountTotal = [];
  let RCount = [];
  for (var t = 0; t < newArray.length; t++) {
      CountTotal[t] = TotalLicCOunt[t]- newWeekCount[t]
      RCount[t] = (TotalLicCOunt[t]- newWeekCount[t]);
  }

  var Used = ["Used","Available"];
  var Cused = [newWeekCount, RCount];

// ############################

const data_Teamcenter = {
  labels: Used,
  datasets: [
    {
      data: Cused,
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
    animation: {
      duration: 2000,
    },
    plugins: {
      datalabels: {
        color: "#ffffff",
      },
      mode:'percentage',
      title: {
        display: true,
        text: newWeek,
        color: "black",
      },

      doughnutlabel: {
        labels: [
          {
            text: "550",
            font: {
              size: 20,
              weight: "bold",
            },
          },
          {
            
          },
        ],
      },
      legend: {
        display: true,
        horizontalAlign: "center",
        position: "bottom",
        textAlign: "center",
        labels: {
          pieceLabel: { mode: 'percentage', render: 'value' },
          usePointStyle: true,
          usePointStyle: "circle",
        },
      },
    },
  },
};

// #############################
    return(
<>
             
             {value_Week_DD!==''&&value_Application!=="" ?
            (<div className="OutSide">  
           <div className={theme==="light"?'WeeklyReport':'WeeklyReport-dark'}>  
            { !(arrcount1.length === 0 && arrWeek.length === 0) ? 
              (<Bar style={{marginLeft: "20px", width: "400px"}} 
              data={data_week} options={option_Week} 
              onClick = {onClick}
              ref = {chartRef} 
              />):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found</div>)
            }
            </div>
           
            {(graphselected)?
            (<div className={theme==="light"?'Individual_Utilization':'Individual_Utilization-dark'}>
            <Doughnut
              data={data_Teamcenter}
              options={data_Teamcenter.options_Teamcenter}
            />
            </div>):""}
            
              </div>):""}


        </>
    )
    
    }

    export default Weekly;
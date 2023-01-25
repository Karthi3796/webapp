import "./UtilizationChart.css"
import {React, useState} from "react"
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
import { useRef } from 'react';
import { Doughnut } from "react-chartjs-2";
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
    Legend
);






const UtilizationChart = ({value_Application,dates, value_Week_DD})=>{


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

      let change_Axis_Color = [];
      let change_XAxis_Color = [];
      let change_YAxis_Color_Month = [];
      if( theme==="light"?'Utlity':'Utlity-dark'){
        if( theme === 'dark'){
          change_Axis_Color = option_Week.scales.y.ticks.color = 'white';
          change_XAxis_Color = option_Week.scales.x.ticks.color = 'white';
          change_YAxis_Color_Month = option_Week.plugins.title.color = 'white';
        }
      }

    //   #################

    const [graphselected, setgraphSelected] = useState("");

const squareValue = arrWeek.map((number)=>{  
    return (number);  
 
});

console.log(squareValue);

      const chartRef = useRef();
      const onClick = (event) =>{
          if(getElementsAtEvent(chartRef.current, event).length >0){
              // console.log(getElementsAtEvent(chartRef.current, event))
              const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex;
              const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
  
              // console.log(Input_Data.labels[dataPoint])
              setgraphSelected(data_week.labels[dataPoint])
          }
      }
  
      // console.log(setgraphSelected)
      console.log(graphselected)
      var newWeek = [];
      var newWeekCount = [];
for (var i = 0; i < arrWeek.length; i++) {
      if(graphselected === arrWeek[i]){
         newWeek.push(arrWeek[i])
         newWeekCount.push(arrcount1[i])
      }

    }

      console.log(newWeek);
      console.log(newWeekCount);


      // ###################

      let LicModule = [];
      let LiCount = [];
      Trends.forEach((s) =>{
          if(s.Application === value_Application){
              LicModule.push(s.Total_License)
              LiCount.push(s.Count)
  
          }
    
      })
      // console.log("LicModule", LicModule)
      // console.log("LicCount", LiCount)
  
      var newArray = [];
      var TotalLicCOunt = [];
  
  for (var i = 0; i < newWeek.length; i++) {
      // we want to know if a[i] is found in b
      var match = false; // we haven't found it yet
      for (var j = 0; j < LicModule.length; j++) {
          if (newWeek[i] == LicModule[j]) {
              // we have found a[i] in b, so we can stop searching
              match = true;
              // console.log(j)
              newArray.push(LicModule[j])
              TotalLicCOunt.push(LiCount[j])
              // console.log(newArray)
              // console.log(TotalLicCOunt)
              break;
          }
          // if we never find a[i] in b, the for loop will simply end,
          // and match will remain false
      }
      // add a[i] to newArray only if we didn't find a match.
  }
  
  let CountTotal = [];
  let RCount = [];
  for (var t = 0; t < newArray.length; t++) {
      CountTotal[t] = TotalLicCOunt[t]- newWeekCount[t]
      RCount[t] = (TotalLicCOunt[t]- newWeekCount[t]);
      // RCount[t] = `${RCount[t]}%`
  }

  console.log(CountTotal)
  console.log(RCount)

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

    // cutoutpercentage:80,
    animation: {
      duration: 2000,
    },
    // layout:{
    //   padding:20
    // },
    plugins: {
      mode:'percentage',
      // datalabels: {
      //   formatter: (CountTotal, ctx) => {
      //     let sum = TotalLicCOunt;
      //     let dataArr = ctx.chart.data.datasets[0].data;
      //     dataArr.map(data =>{
      //       sum += data;
      //     })
      //     let Percentage = (CountTotal*100/sum).toFixed(2)+"%";
      //     return Percentage;
      //   },
      // },

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
      // HTMLLegend: {
      //   containerID: "legend-container"
      // },
      legend: {
        display: true,
        horizontalAlign: "center",
        position: "bottom",
        textAlign: "center",
        // padding: 50,

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
        
          {/* {console.log(dates)} */}

             
             {value_Week_DD!==''&&value_Application!=="" ?
            (<div className="new_C" style={{display: 'flex'}}>
            <div className={theme==="light"?'Weekly_Main':'Weekly_Main-dark'}> 
            {/* <h4 className={theme==="light"?'Capital':'Capital-dark'}> Weekly Report </h4>  */}
            <div className={theme==="light"?'Weekly_chart':'Weekly_chart-dark'}>
            {/* {console.log(value_Week_DD)} */}
            { !(arrcount1.length === 0 && arrWeek.length === 0) ? 
              (<Bar style={{marginLeft: "20px", width: "400px"}} 
              data={data_week} options={data_week.option_Week} 
              onClick = {onClick}
              ref = {chartRef} 
              />):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found </div>)
            }
            
            </div>
            </div>
            {(graphselected)?
            (<div className='Graph'>
            <Doughnut
            // height={350}
            // width={350}
              data={data_Teamcenter}
              options={data_Teamcenter.options_Teamcenter}
            />
            </div>):""}
            
              </div>):""}


        </>
    )
    

    }

    export default UtilizationChart;
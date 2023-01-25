import React from 'react';
import "./FourBlockChart.css";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import datas from "../Daily/SourceData.json";
import Trends from "../Trend/License.json";
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
    // console.log('label',label.indexOf(29))
    if(selectedOption.value.length!==0){
    selectedOption.value.forEach((v, i)=>{
      datas.forEach((e)=>{
        if(e.Application===value_Application){ 
            if(e[selectedOption.name]===v && e.Year === selectedOption.Year[i]){
              const present = arrMonth.some((data)=>{
                return data===e.Module;
              })
              if(!present){
                arrMonth.push(e.Module);
              }
            }
        }
      });
    })
    }

   
// #########################
let arrayOfSetOfUser=[];
// let arrYearFirst = arrMonth;
let arrYear = arrMonth
arrYear.forEach((value1,i)=>{
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
    //  console.log(value1)
    // // console.log(setOfUser.length)
    // console.log(setOfUser)
    arrayOfSetOfUser.push(setOfUser.length)
//     console.log(arrayOfSetOfUser)

//     console.log(arrayOfSetOfUser);
//    console.log("array_Year", arrYear);
   
})

 // ########################

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

let newWeekCount = [];
let RCount = [];
let RCountg1 = [];

for (var t = 0; t < newArray.length; t++) {
    RCountg1[t] = (TotalLicCOunt[t]- arrayOfSetOfUser[t]);
    RCount[t] = ((arrayOfSetOfUser[t]/TotalLicCOunt[t])*100).toFixed(1);
}

console.log("ValueR",RCountg1)
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
    else if(RCount[j]>25 && RCount<=50){
        RCount50.push(arrayOfSetOfUser[j])
        RCountModName50.push(newArray[j])
    }
    else if(RCount[j]>50 && RCount<=75){
        RCount75.push(arrayOfSetOfUser[j])
        RCountModName75.push(newArray[j])
    }
    else if(RCount[j] >= 75){
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
        plugins: {
            anchor:"end",
            align:"top",
            plugins: [ChartDataLabels],
            datalabels: {
              align:'top',
              color: "black",
              display: true,
              font:{
                size:"12",
              }
              
            },
            legend: {
               display: false,
              position: "top",
  
              labels:{
                color:"black"
              }
              
            },
            title: {
              display: true,
              text: "0-25% Utilization",
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
      plugins: {
        anchor:"end",
        align:"top",
        plugins: [ChartDataLabels],
        datalabels: {
          align:'top',
          color: "black",
          display: true,
          font:{
            size:"12",
          }
          
        },
        legend: {
           display: false,
          position: "top",

          labels:{
            color:"black"
          }
          
        },
        title: {
          display: true,
          text: "25%-50% Utilization",
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
          "rgb(134, 54, 180)",
          "rgb(243, 153, 24)",
          "rgb(228, 0, 23)",
          "#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8",
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
      plugins: {
        anchor:"end",
        align:"top",
        plugins: [ChartDataLabels],
        datalabels: {
          align:'top',
          color: "black",
          display: true,
          font:{
            size:"12",
          }
          
        },
        legend: {
           display: false,
          position: "top",

          labels:{
            color:"black"
          }
          
        },
        title: {
          display: true,
          text: "50%-75% Utilization",
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
          "rgb(134, 54, 180)",
          "rgb(243, 153, 24)",
          "rgb(228, 0, 23)",
          "#FA6A64","#7A4E48","#4A4031","#F6E2BB","#9EC6B8",
          "#E6B39A","#E6CBA5","#EDE3B4","#8B9E9B","#6D7578"
        ],
        borderWidth: 1,
      },
    ],

    options_TeamcenterFourth: {
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
      },
      plugins: {
        // anchor:"end",
        align:"top",
        plugins: [ChartDataLabels],
        datalabels: {
          align:'top',
          color: "black",
          display: true,
          font:{
            size:"12",
          }
          
        },
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
  





    let change_Teamcenter = [];
    if( theme==="light"?'Utlity':'Utlity-dark'){
      if( theme === 'dark'){
        change_Teamcenter = data_Teamcenter.options_Teamcenter.plugins.legend.labels.color = 'white';
      }
    }
    return(
      <>
      { (value_Application == "Teamcenter")?
       (<div>       
        <div className='Two'>
            <div className='graph3'>
            <Bar
              data={data_Teamcenter}
              options={data_Teamcenter.options_Teamcenter}
            />
        </div>
            <div className='graph4'>
            <Bar
              data={data_TeamcenterSecond}
              options={data_TeamcenterSecond.options_Teamcentersecond}
            />
            </div>
        </div> 
        <div className='Two1'>
            <div className='graph3'>
        <Bar
              data={data_TeamcenterThird}
              options={data_TeamcenterThird.options_TeamcenterThird}
            />
        </div>
            <div className='graph4'>
            <Bar
              data={data_TeamcenterFourth}
              options={data_TeamcenterFourth.options_TeamcenterFourth}
            />
            </div>
        </div> 
        </div> )  : ""}
        </>
    )

}

export default FourBlockChart;


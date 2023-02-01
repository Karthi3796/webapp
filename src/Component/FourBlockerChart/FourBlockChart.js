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
    // console.log('label',label.indexOf(29))
    if ((selectedOption.name == 'Today' || selectedOption.name == 'Yesterday' || selectedOption.name == "Custom Range") && selectedOption.value.length !== 0)
    {
    
    
      const startTime = 0; // Set the starting time for the day (Railway time: hour of the day)

      // Getting today's date
      const today = new Date();
      // Setting the start time of the day
      today.setHours(startTime,0,0,0);
    
      // Getting date and time after 24 hrs
      const tomorrow = new Date();
      tomorrow.setHours(startTime,0,0,0)
      tomorrow.setDate(tomorrow.getDate()+ 1);
    
      // Getting date and time before 24 hrs
      const Yesterday = new Date();
      Yesterday.setHours(startTime,0,0,0)
      Yesterday.setDate(Yesterday.getDate() - 1);
    
      // Defining start date time
      let startDateTime= today;
      // Defining end date time
      let endDateTime= tomorrow;
      if (selectedOption.name == 'Today')
      {
            // Defining start date time
       startDateTime= today;
      // Defining end date time
       endDateTime= tomorrow;
      }
    
      else if (selectedOption.name == 'Yesterday')
      {
            // Defining start date time
      startDateTime= Yesterday;
      // Defining end date time
      endDateTime= today;
      }
      else if (selectedOption.name == "Custom Range")
      {
        startDateTime =  new Date(selectedOption.fromDate);
        startDateTime.setHours(0,0,0,0);
        endDateTime= new Date(selectedOption.toDate);
        endDateTime.setDate(endDateTime.getDate()+1);
        endDateTime.setSeconds(-1);
        console.log("StartDate",startDateTime);
        console.log("EndDate",endDateTime)
    
      }
        
        // Check if the selected Data range option is today or yesterday
        if((selectedOption.name == 'Today' || selectedOption.name == 'Yesterday' || selectedOption.name == "Custom Range") &&  selectedOption.value.length !== 0 )
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
        }
    
    
    // store the length of the values of the keys of moduleUserlist
        for (const value in moduleUserlist)
        {
          arrayOfSetOfUser.push(moduleUserlist[value].length);
        }
    console.log(moduleUserlist);
    console.log(arrayOfSetOfUser);
    
    }

  else {
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

// let arrYearFirst = arrMonth;
arrYear = arrMonth
arrYear.forEach((value1,i)=>{
  let setOfUser=[];
    datas.forEach((e)=>{
     if (e.Application === value_Application && value1=== e.Module) {
        selectedOption.value.forEach((v,i)=>{
            if(e[selectedOption.name]===v  && e.Year === selectedOption.Year[i]){
                 if (!setOfUser.includes(e.User))
                        {
                        setOfUser.push(e.User);
                        }
      }
    })
    }
    })
 
    arrayOfSetOfUser.push(setOfUser.length)

   
})

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
  
  const chartContainer = useRef(null);
  const [isFullScreen, setFullScreen] = useState(false);
  
  const toggleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };
    return(
      <>
      {(value_Application == "Teamcenter" || value_Application === "Tc-VisMockup")?
       (<div className='OverallC'> 
         <button className="FullScreen" onClick={toggleFullScreen}>Fullscreen</button>      
        <div className='Two'>
      
            <div className='graph3'ref={chartContainer}
 style={{
   position: "relative",
   width: isFullScreen ? "100%" : "50%",
   height: isFullScreen ? "65vh" : "49vh"
 }}  >
            <Bar
               data={data_TeamcenterFourth}
               options={data_TeamcenterFourth.options_TeamcenterFourth}
            />
        </div>
            <div className='graph4' ref={chartContainer}
 style={{
   position: "relative",
   width: isFullScreen ? "98%" : "50%",
   height: isFullScreen ? "65vh" : "49vh"
 }}>
            <Bar
            data={data_TeamcenterThird}
            options={data_TeamcenterThird.options_TeamcenterThird}
           
             
            />
            </div>
        </div> 
        <div className='Two1'>
            <div className='graph3' ref={chartContainer}
 style={{
   position: "relative",
   width: isFullScreen ? "98%" : "50%",
   height: isFullScreen ? "65vh" : "49vh"
 }}>
        <Bar
                data={data_TeamcenterSecond}
                options={data_TeamcenterSecond.options_Teamcentersecond}
            />
        </div>
            <div className='graph4' ref={chartContainer}
 style={{
   position: "relative",
   width: isFullScreen ? "98%" : "50%",
   height: isFullScreen ? "65vh" : "49vh"
 }}>
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


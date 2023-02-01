// import "./DailyGraph.css";
import datas from "../Daily/SourceData.json";
import newDatas from "../Daily/SourceData.json"
import Trends from "../Trend/License.json";

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
} from "chart.js";
import { Bar, Chart } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomChart = ({ value_Application, dates, value_Week_DD }) => {
  let sD = new Date(dates.from);
  let eD = new Date(dates.to);
  // console.log(sD,eD)
  // console.log(sD.getDate())
  console.log(eD.getUTCMonth()+1)

  // ################################ ###############

  // const options = {
  //   indexAxis: "x",
  //   elements: {
  //     bar: {
  //       borderWidth: 1,
  //     },
  //   },
  //   responsive: true,
  //   scales: {
  //     x: {
  //       grid: {
  //         display: false,
  //       },
  //     },

  //     y: {
  //       beginAtZero: true,
  //       grid: {
  //         display: false,
  //       },
  //     },
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: "right",
  //     },
  //     title: {
  //       display: true,
  //       text: value_Application,
  //     },
  //   },
  //   xAxes: [
  //     {
  //       ticks: {
  //         beginAtZero: true,
  //       },
  //     },
  //   ],
  // };
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
        //  display: true,
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
  let x_val = [];
  let y_val = [];
  let x_val1 = [];
  let y_val1 = [];
  // let label = x_val;

  // let dat = y_val;
  let datee = 0;
  let countt = 0;
  let x_val2 = [];
  let y_val2 = [];
  let arrModule = []; //for storing boolean arr module
  let modMax = []; //for storing max value of particular module

  newDatas.forEach((e) => {
    if (e.Application === value_Application) {
      var jsonDate = new Date(e.Date);//changing string date to date format
      if(jsonDate.getDate() >= sD.getDate() && jsonDate.getMonth() + 1 >= sD.getMonth() + 1 && jsonDate.getFullYear() >= sD.getFullYear())
       {
        if (jsonDate.getDate() <= eD.getDate()&& jsonDate.getMonth() + 1 <= sD.getMonth() + 1 && jsonDate.getFullYear() <= sD.getFullYear()){
          // console.log('hi')
          const present = arrModule.some((d) => {
            return d === e.Module;
          });
          if (present === false) {
            arrModule.push(e.Module);
          }
        }
      }
    }
  });
  console.log(arrModule)
  let setOfUserFirst = [];
  let arrayOfSetOfUserFirst = [];
  arrModule.forEach((m,i)=>{
  newDatas.forEach((e)=>{
      if(e.Application === value_Application){
        var jsonDate = new Date(e.Date);
        if(jsonDate.getDate() >= sD.getDate() && jsonDate.getMonth() + 1 >= sD.getMonth() + 1 && jsonDate.getFullYear() >= sD.getFullYear()){
          if(jsonDate.getDate() <= eD.getDate()&& jsonDate.getMonth() + 1 <= sD.getMonth() + 1 && jsonDate.getFullYear() <= sD.getFullYear()){
            if(e.Module===m){
              if (!setOfUserFirst.includes(e.User))
                        {
                          setOfUserFirst.push(e.User);
                        }

            }
          }
        }
      }
    })
    arrayOfSetOfUserFirst.push(setOfUserFirst.length)
  })
  console.log(arrayOfSetOfUserFirst)

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
let arrYearFirst = arrModule;

for (var i = 0; i < arrYearFirst.length; i++) {
var match = false; 
for (var j = 0; j < LicModule.length; j++) {
    if (arrYearFirst[i] === LicModule[j]) {
        match = true;
        newArrayFirst.push(LicModule[j])
        TotalLicCountFirst.push(LiCount[j])
       
    }   
}  
}

let array1 = newArrayFirst;
let array2 = TotalLicCountFirst;

let ModuleName_with_Count = array1.map((element1, index) => {
  let element2 = array2[index];
  return `${element1}(${element2})`;
});

console.log(ModuleName_with_Count); 

let CountTotal = [];
let RCountFirst = [];
for (var t = 0; t < newArrayFirst.length; t++) {
    CountTotal[t] = TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]
    RCountFirst[t] = (TotalLicCountFirst[t]- arrayOfSetOfUserFirst[t]);
}

  let currentDate = 0;
  let arrDate = [];
  let arrDateCount = [[], []];

  /**sorting max values of modules */
  arrModule.forEach((module, i) => {
    datas.forEach((e) => {
      if (e.Application === value_Application) {
        var jsonDate = new Date(e.Date); //changing string date to number date format
        if (
          jsonDate.getDate() >= sD.getDate() &&
          jsonDate.getMonth() + 1 >= sD.getMonth() + 1 &&
          jsonDate.getFullYear() >= sD.getFullYear()
        ) {
          if (
            jsonDate.getDate() <= eD.getDate() &&
            jsonDate.getMonth() + 1 <= eD.getMonth() + 1 &&
            jsonDate.getFullYear() <= eD.getFullYear()
          ) {
            const present = arrDate.some((d) => {
              return d === e.Date;
            });
            if (present === false) {
              arrDate.push(e.Date);
            }
          }
        }
      }
    });
  });

  for (let i = 0; i < arrModule.length; i++) {
    arrDateCount[i] = [];
    for (let j = 0; j < arrDate.length; j++) {
      arrDateCount[i][j] = [];
    }
  }

  arrModule.forEach((module, i) => {
    arrDate.forEach((date, j) => {
      let maxx = 0;
      currentDate = date;
      datas.forEach((e) => {
        if (e.Application === value_Application && e.Date === date) {
          if (e.Module === module) {
            if (currentDate === e.Date) {
              if (e.Count > maxx) {
                maxx = e.Count;
                console.log(module, date);
              }
            }
          }
        }
      });
      console.log(maxx);
      for (let k = i; k <= i; k++) {
        for (let m = j; m <= j; m++) {
          arrDateCount[k][m] = maxx;
        }
      }
    });
  });
  console.log(arrDate);
  console.log(arrDateCount);

  const data = {
    labels: ModuleName_with_Count,
    datasets: [
      {
            // label:"LRG",
        data: RCountFirst,
        gridLines: {
          drawOnChartArea: false
      }
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
  }
]
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
 
    ],
  };

  // let color=["#8a00d4", "#d527b7", "red", "#f9c46b", "skyblue","#e74645", "black", "#facd60", "green", "#1ac0c6","#454d66", "#309975", "#58b368", "#dad873", "#efeeb4"]

  

  return (
    <div
      style={{
        display: "flex",
        marginTop: "15px",
        marginLeft: "30px",
        marginRight: "10px",
      }}
    >
      {dates.to !== "" && dates.from !== "" && value_Application !== "" ? (
        <div className="Daily_Main">
          <h3 style={{ textAlign: "center", color: "Black" }}>
            {" "}
            Daily Report{" "}
          </h3>
          {/* <div className="daily_chart" id = 'barChart'> */}
          {/* <canvas id="barChart" ></canvas> */}
          <Bar data={data} options={option_WeekFirst} />
          {/* </div> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CustomChart;

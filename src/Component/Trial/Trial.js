import "./Trial.css";
import datas from '../Daily/SourceData.json';
import Trends from "../Trend/License.json";
//  import App1 from './label';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const Trial  = ({ value_Application, value_Year, value_Month }) => {

  const {theme} = useContext(ThemeContext)
  

  

    // ###########################

    const option_Year = {
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 1,
        },
      },
      responsive: true,
      scales: {
        x: 
        {
          ticks: {
            color: "black",
            maxRotation: 45,
            minRotation: 45,
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
    //  let x_val=[];
    //   let y_val=[];
    // let label = x_val;
    // let dat = y_val;
    //  let datee = datas[0].Date;
    // let datee= 0;
    // let countt = 0;
    //  let count = [];
    //     //  const  dat = datas.map((e)=>e.Count);
    //      // index ;
    let arrYear = [];
    let arrCount = [];
    datas.forEach((e) => {
      if (e.Application === value_Application && e.Year === value_Year) {
        // if ()
         // if () find/some
         const present = arrYear.some((data)=>{
          return data===e.Module;
        })
        if(!present){
          arrYear.push(e.Module);
        }
        // console.log(arrYear)
              
              arrCount.push(e.Count);
      }
    });
  
    // console.log(arrCount);
    let arrcountYear=[];

    arrYear.forEach((vModule,i)=>{
      let max2 = 0;
      datas.forEach((f)=>{
        if(f.Application === value_Application && f.Year === value_Year)
        {
          if(f.Module===vModule){
            if(f.Count>max2){
              max2 = f.Count;
            }
          }
        } 
      })
      arrcountYear[i] = max2;
    })

    if (arrcountYear == 0 && arrYear == 0) {

      // console.log(" NO Data Found ")

    }

    let LicModule = [];
    let LiCount = [];
    Trends.forEach((s) =>{
        if(s.Application === value_Application){
            LicModule.push(s.Total_License)
            LiCount.push(s.Count)

        }
  
    })
    console.log("LicModule", LicModule)
    console.log("LicCount", LiCount)
  
    const data_Year = {
      labels: LicModule,
  
      datasets: [
        {
          //    label:"LRG",
          data: LiCount,
  
          backgroundColor: "burlywood",
          borderColor: "black",
        },
        {
            //    label:"LRG",
            data: LiCount,
    
            backgroundColor: "burlywood",
            borderColor: "black",
          },
      ],
    };

    let change_Axis_Color = [];
    let change_XAxis_Color = [];
    let change_Axis_Color_Year = [];
    let change_XAxis_Color_Year = [];
    let change_YAxis_Color_Year = [];
    let change_YAxis_Color_Month = [];
    if( theme==="light"?'Utlity':'Utlity-dark'){
      if( theme === 'dark'){
        // change_Axis_Color = option_Month.scales.x.ticks.color = 'white';
        // change_XAxis_Color = option_Month.scales.y.ticks.color = 'white';
        change_Axis_Color_Year = option_Year.scales.x.ticks.color = 'white';
        change_XAxis_Color_Year = option_Year.scales.y.ticks.color = 'white';
        change_YAxis_Color_Year = option_Year.plugins.title.color = 'white';
        // change_YAxis_Color_Month = option_Month.plugins.title.color = 'white';
      }
    }

    return (
        <>
    {value_Year!==''&&value_Application!==""?
   (  <div className="new_c">  

<div className={theme==="light"?'Monthly_Main':'Monthly_Main-dark'}>
        {/* <h4 className={theme==="light"?'Capital':'Capital-dark'}> Yearly Report </h4>  */}
        <div className={theme==="light"?'Monthly_chart':'Monthly_chart-dark'}>
        <Bar data={data_Year} options={option_Year} />
        </div>
        </div>

    </div>) : ""}


    </>
    )

    }

export default Trial ;

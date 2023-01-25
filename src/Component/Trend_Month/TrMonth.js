import './TrMonth.css';
import datas from '../Daily/SourceData.json';
import { Week, Month, Year, Application } from "../SideNavbar/Input";
import Trends from "../Trend/License.json";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
  } from "chart.js";
  import { ThemeContext } from "../../App";
  import { useContext } from "react";
  import { Bar, Line } from "react-chartjs-2";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  


  const TrMonth  = ({ value_Application, value_Month, value_Module, setValue_Module }) => { 

    const {theme} = useContext(ThemeContext)

    const handlechange_Week = (e) => {
        setValue_Module(e.target.value);
      };
    
      const option_Month = {
        indexAxis: "x",
        elements: {
          bar: {
            borderWidth: 0.5,
          },
        },
        responsive: true,
        scales: {
          x: 
          {
            ticks: {
              color: "black",
              autoSkip: false,
              // maxRotation: 45,
              // minRotation: 45,
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
            text: "Monthly Report",
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
     
      let arrCount = [];
      let arrMonth = [];
      // console.log('label',label.indexOf(29))
    
      datas.forEach((e) => {
        if (e.Application === value_Application && e.Month === value_Month && e.Module === value_Module) {
          // if ()
        //   if(){
            // console.log(value_Module)

         
           // if () find/some
           const present = arrMonth.some((data)=>{
            return data===e.Week;
          })
          if(!present){
            arrMonth.push(e.Week);
          }
          // console.log("Vanakam da ", arrMonth)
                
                arrCount.push(e.Count);
        }
    // }
      });
    
    // console.log(arrCount);
      let arrcount1=[];
      let max1 = 0;
      arrMonth.forEach((vModule,i)=>{
        
        datas.forEach((f)=>{
          if(f.Module === value_Module && f.Month === value_Month)
          {
            if(f.Week===vModule){
              if(f.Count>max1){
                max1 = f.Count;
              }
            }
          } 
        })
        arrcount1[i] = max1;
        // console.log("Hello",arrcount1)
      })
    
      const data = {
        labels: arrMonth,
    
        datasets: [
          {
            //    label:"LRG",
            data: arrcount1,
    
            backgroundColor: "burlywood",
            borderColor: "black",
          },
        ],
      };

      return (
        <>
         {value_Month!==''&&value_Application!==""?
       ( <div className="new_c1"> 
             <div className="Trend-dropdown">
           <select value={value_Module} className={theme==="light"?'form-control':'form-control-dark'} onChange={handlechange_Week}>
             <option  selected>Module</option>
             {Trends.map((item, index) => {
              
               return (
                (value_Application===item.Application)?(
                  <option value={item.Total_License} key={index}>
                   {item.Total_License}
                 </option>
                ):""
                 
               );
             })}
           </select>
           </div>
           {/* <div className={theme==="light"?'Trend_Main':'Trend_Main-dark'}> */}
        {/* <h4 className={theme==="light"?'Capital':'Capital-dark'}> Monthly Report </h4>  */}
        <div className={theme==="light"?'Trend_chart':'Trend_chart-dark'}>
        <Line data={data} options={option_Month}/> 
        
        </div>
        {/* </div> */}
        
      
        

    </div>) : ""}


    </>
    )

    }

export default TrMonth ;
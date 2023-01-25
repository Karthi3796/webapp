import React from 'react';
import "./Trend_New.css";
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
import { Doughnut } from "react-chartjs-2";
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
  Legend
);


const Trend_New = ({value_Application, value_Week_DD, value_Month, value_Year})=>{

  const {theme} = useContext(ThemeContext)



    let arrYear = [];
    let arrCount = [];
    datas.forEach((e) => {
      if (e.Application === value_Application && e.Year === value_Year || e.Application === value_Application && e.Month === value_Month || e.Application === value_Application && e.Week === value_Week_DD) {
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
  
    // console.log("arrYear", arrYear);
    let arrcountYear=[];

    arrYear.forEach((vModule,i)=>{
      let max2 = 0;
      datas.forEach((f)=>{
        if(f.Application === value_Application && f.Year === value_Year || f.Application === value_Application && f.Month === value_Month || f.Application === value_Application && f.Week === value_Week_DD)
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

    console.log(arrcountYear);
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

    var newArray = [];
    var TotalLicCOunt = [];

for (var i = 0; i < arrYear.length; i++) {
    // we want to know if a[i] is found in b
    var match = false; // we haven't found it yet
    for (var j = 0; j < LicModule.length; j++) {
        if (arrYear[i] == LicModule[j]) {
            // we have found a[i] in b, so we can stop searching
            match = true;
            // console.log(j)
            newArray.push(LicModule[j])
            TotalLicCOunt.push(LiCount[j])
            console.log(newArray)
            console.log(TotalLicCOunt)
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
    CountTotal[t] = TotalLicCOunt[t]- arrcountYear[t]
    RCount[t] = (TotalLicCOunt[t]- arrcountYear[t]).toFixed(1);
    // RCount[t] = `${RCount[t]}%`
}


// #######################\





// #####################


// console.log(CountTotal)
// console.log(RCount);
  
    // console.log("xvalue=", x_Val_Teamcenter);
  
    const data_Teamcenter = {
      labels: arrYear,
     
  
      datasets: [
        {
          data: RCount,
         
  
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
            text: "Teamcenter Utilization",
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


    let change_Teamcenter = [];
    if( theme==="light"?'Utlity':'Utlity-dark'){
      if( theme === 'dark'){
        change_Teamcenter = data_Teamcenter.options_Teamcenter.plugins.legend.labels.color = 'white';
      }
    }

    // End of Utilization For Teamcenter




    return(
      <>
      {(value_Year!=='' && value_Application!=="" && value_Application == "Teamcenter") || (value_Week_DD!=='' && value_Application!=="" && value_Application == "Teamcenter") || (value_Month!=='' && value_Application!=="" && value_Application == "Teamcenter")?
       ( <div className="Pie_Out_New">
        
         <div className={theme==="light"?'Utlity_Teamcenter':'Utlity_Teamcenter-dark'}>
            <div className='Graph'>
            {/* <span className={theme==="light"?'Capitalize':'Capitalize-dark'} >Teamcenter Utilization </span>  */}
            <Doughnut
            // height={350}
            // width={350}
              data={data_Teamcenter}
              options={data_Teamcenter.options_Teamcenter}
            />
            </div>
        
          </div>
        </div> )  : ""}
        </>
    )

}

export default Trend_New;



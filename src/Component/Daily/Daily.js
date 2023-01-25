import "./Daily.css"
import datas from '../Daily/SourceData.json';
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
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);






const Horizontalchart = ({value_Application,dates, value_Week_DD})=>{

  let sD = new Date(dates.from);
  let eD = new Date(dates.to);
  

  const {theme} = useContext(ThemeContext)

  // ################################ ###############
        // console.log(value_Application);
        const options ={
          indexAxis: "x",
          elements: {
            bar: {
              borderWidth: 1,
            },
          },
          responsive: true,
          scales: {
            x: 
            {
              grid: {
                display: false
            }
            },
          
          y:
            {
              beginAtZero: true,
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
              text: "chart",
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
        let x_val=[];
        let y_val=[];
        let x_val1=[];
        let y_val1=[];
        let label = x_val;
        let dat = y_val;
        let datee = 0;
        let countt = 0;
        let x_val2 = [];
        let y_val2 = [];
      //  let count = [];
          //  const  dat = datas.map((e)=>e.Count);
           // index ;
           
           datas.forEach(e=>{
          
            if(e.Application === value_Application){
              ;
              if(e.Date===datee)
                          {
                            countt=e.Count;
                          
                          }
                          else 
                          {
                            if(countt!==0)
                            {
                           y_val1.push(countt);
                            }
                          }
                          if(e.Date!==datee)
                          {
                            x_val1.push(e.Date);
                          }
                          
                          datee = e.Date;
                          countt = e.Count;
            }
          
          })
          y_val1.push(countt);
  
          
            // for(let i = 0 ; i < y_val1.length ; i++){
            //   console.log('y Axix = ',y_val1[i]);
            // }
            
            /* should not delete this part*/
           let y = [];
           for(let i = 0 ; i<x_val1.length;i++){
            y[i]=new Date(x_val1[i]);
           }
           
           
  
         
          for(let i = 0 ; i<y.length;i++){
            
  
            if(((y[i].getDate())>=(sD.getDate())) && ((y[i].getMonth()+1) >=(sD.getMonth()+1)) && ((y[i].getFullYear())>=(sD.getFullYear()))){
              
              // for(let j = i ;(y[j].getDate())<=(eD.getDate()) && ((y[j].getMonth()+1)<=(eD.getMonth()+1)) && ((y[j].getFullYear())<=(eD.getFullYear()));j++){
              //  if((y[j].getDate())<=(eD.getDate()) && ((y[j].getMonth()+1)<=(eD.getMonth()+1)) && ((y[j].getFullYear())<=(eD.getFullYear()))){
                if((y[i].getDate())<=(eD.getDate()) && ((y[i].getMonth()+1)<=(eD.getMonth()+1)) && ((y[i].getFullYear())<=(eD.getFullYear()))){
              
                // console.log('Dates = ',y[j].getMonth()+1,'/',y[j].getDate(),'/',y[j].getFullYear())
                // console.log('Dates = ',y[i].getMonth()+1,'/',y[i].getDate(),'/',y[i].getFullYear())
                x_val2.push(y[i].getMonth()+1+'/'+y[i].getDate()+'/'+y[i].getFullYear())
                y_val2.push(y_val1[i])
                
               }
          
             
       
            }
          }
         
          
          
          
          for(let i = 0 ; i <x_val2.length;i++){
  
            x_val.push(x_val2[i]);
            y_val.push(y_val2[i]);
  
          }
        
          console.log(x_val);
          console.log(y_val);
       
       
       
       const data = {
             labels :label,
           
       
           datasets:[
               {
                   label:"LRG",
                   data:dat,
                   
                    backgroundColor:'yellow',
                     borderColor:'blue'
       
               }
           ],
       }

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
          // if(arrWeek == 0){
          //   arrWeek.push(e.Module);
          // }
          // if(!arrWeek.some(e.Module)){
              
          // }
          // console.log("arrWeek",arrWeek)

                
                arrCount.push(e.Count);
        }
      });
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
    
      // let max = arrCount[0];
      // let i;
    
      // for (i = 1; i < arrCount.length; i++) {
      //   if (arrCount[i] > max) max = arrCount[i];
      // }
    
      // console.log(arrWeek);
      
      // label = [arrWeek];

      const labelAdjusted = arrWeek.map(label => label.split('_'));
      console.log(labelAdjusted)
    
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

     

    return(
<>
        
          {/* {console.log(dates)} */}
            {dates.to!==''&&dates.from!==""&&value_Application!=="" ?
            (<div  className="new_C" style={{display: 'flex'}}> 
            <div className="Daily_Main">
            <h4 style={{textAlign: 'center', color:"Black"}}> Daily Report </h4> 
            <div className="daily_chart">
            <Bar data={data} options={options}/> 
            </div>

             </div> </div> ) :""}
             
             {value_Week_DD!==''&&value_Application!=="" ?
            (<div className="new_C" style={{display: 'flex'}}>
            <div className={theme==="light"?'Weekly_Main':'Weekly_Main-dark'}> 
            {/* <h4 className={theme==="light"?'Capital':'Capital-dark'}> Weekly Report </h4>  */}
            <div className={theme==="light"?'Weekly_chart':'Weekly_chart-dark'}>
            {/* {console.log(value_Week_DD)} */}
            { !(arrcount1.length === 0 && arrWeek.length === 0) ? 
              (<Bar style={{marginLeft: "20px", width: "400px"}} data={data_week} options={option_Week}/>):(<div className={theme==="light"?'NoData':'NoData-dark'}> No Data Found </div>)
            }
            
            </div>
            </div>  </div>):""}


        </>
    )
    

    }

    export default Horizontalchart;
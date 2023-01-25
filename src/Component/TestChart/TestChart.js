import { React, useState } from "react";
import "./TestChart.css";
import datas from "../Daily/SourceData.json";
import Trends from "../Trend/License.json";
import basevalue from "../Daily/final.json";
import { useRef } from "react";
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
import { Doughnut, getElementsAtEvent } from "react-chartjs-2";
import { ThemeContext } from "../../App";
import { useContext } from "react";
import { yellow } from "@mui/material/colors";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TestChart = ({
  value_Application,
  value_Week_DD,
  value_Month,
  value_Year,
}) => {
  const { theme } = useContext(ThemeContext);

  let arrYear = [];
  let arrCount = [];
  let baseModule = [
    "teamcenter_author",
    "teamcenter_admin",
    "teamcenter_consumer",
  ];
  let arrbase = [];
  datas.forEach((e) => {
    if (
      (e.Application === value_Application && e.Year === value_Year) ||
      (e.Application === value_Application && e.Month === value_Month) ||
      (e.Application === value_Application && e.Week === value_Week_DD)
    ) {
      // if ()
      // if () find/some
      const present = arrYear.some((data) => {
        return data === e.Module;
      });
      if (!present) {
        arrYear.push(e.Module);
      }
      arrCount.push(e.Count);
    }
  });
  console.log("ToparrcountYear", arrYear);

  let arrcountYear = [];

  arrYear.forEach((vModule, i) => {
    let max2 = 0;
    datas.forEach((f) => {
      if (
        (f.Application === value_Application && f.Year === value_Year) ||
        (f.Application === value_Application && f.Month === value_Month) ||
        (f.Application === value_Application && f.Week === value_Week_DD)
      ) {
        if (f.Module === vModule) {
          if (f.Count > max2) {
            max2 = f.Count;
          }
        }
      }
    });
    arrcountYear[i] = max2;
  });

//   ##########

let arrBasCount = [];
baseModule.forEach((vModule, i) => {
    let max2 = 0;
    datas.forEach((f) => {
      if (
        (f.Application === value_Application && f.Year === value_Year) ||
        (f.Application === value_Application && f.Month === value_Month) ||
        (f.Application === value_Application && f.Week === value_Week_DD)
      ) {
        if (f.Module === vModule) {
          if (f.Count > max2) {
            max2 = f.Count;
          }
        }
      }
    });
    arrBasCount[i] = max2;
  });

// ##########

  let LicModule = [];
  let LiCount = [];
  Trends.forEach((s) => {
    if (s.Application === value_Application) {
      LicModule.push(s.Total_License);
      LiCount.push(s.Count);
    }
  });
  var newArray = [];
  var TotalLicCOunt = [];

  for (var i = 0; i < arrYear.length; i++) {
    for (var j = 0; j < LicModule.length; j++) {
      if (arrYear[i] == LicModule[j]) {
        newArray.push(LicModule[j]);
        TotalLicCOunt.push(LiCount[j]);
        break;
      }
    }
  }

  let CountTotal = [];
  let RCount = [];
  for (var t = 0; t < newArray.length; t++) {
    CountTotal[t] = TotalLicCOunt[t] - arrcountYear[t];
    RCount[t] = CountTotal[t] = TotalLicCOunt[t] - arrcountYear[t];
  }

  // ####################

  var ArrNotUsed = [];
  var TotalLiccOunt = [];

  ArrNotUsed = LicModule.filter(function (item, i) {
    //   console.log(item)
    if (!arrYear.includes(item)) {
      TotalLiccOunt.push(LiCount[i]);
    }
    return !arrYear.includes(item);
  });

  // console.log("ArrNotUsed",ArrNotUsed)
  // console.log("TotalLiccOunt",TotalLiccOunt.length)

  // ###################

  for (var b = 0; b < arrYear.length; b++) {
    if (arrYear[b] === baseModule) {
      arrbase.push(arrYear[b]);
    }
  }

  console.log(arrbase);

  var arrbasemod = [];
  var arrbasemodcount = [];

  for (var i = 0; i < arrYear.length; i++) {
    for (var j = 0; j < baseModule.length; j++) {
      if (arrYear[i] === baseModule[j]) {
        arrbasemod.push(arrYear[i]);
        arrbasemodcount.push(arrCount[i].length);
        break;
      }
    }
  }

  console.log(arrbasemod);
  console.log(arrbasemodcount);

  // #################### Basevalue ####################

  // var tc_admin = [];
  // var tc_author = [];

  // basevalue.forEach((e) => {
  //     if (e.Application === value_Application && e.Year === value_Year || e.Application === value_Application && e.Month === value_Month || e.Application === value_Application && e.Week === value_Week_DD) {
  //       // if ()
  //        // if () find/some
  //        const present = tc_admin.some((data)=>{
  //         return data===e.Month;
  //       })
  //       if(!present){
  //         tc_admin.push(e.Month);
  //       }
  //        arrCount.push(e.Module);
  //     }

  //   });
  //   console.log("ToparrcountYear",tc_admin)

  // ####################base value #####################

  // ########### Base Model ###################

  var basemodul = arrbasemod;


  const Input_Data_bas = {
    labels: basemodul,

    datasets: [
      {
        data: arrBasCount,

        backgroundColor: [
          "#7A4E48",
          "#F6E2BB",
          "#9EC6B8",
          "#E6B39A",
          "#E6CBA5",
          "#EDE3B4",
          "#8B9E9B",
          "#6D7578",
        ],
        borderWidth: 1,
      },
    ],

    Input_options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      },

      animation: {
        duration: 2000,
      },
      plugins: {
        datalabels: {
          color: "#ffffff",
        },
        mode: "percentage",
        title: {
          display: true,
          text: "Teamcenter Base Module",
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
            {},
          ],
        },
        legend: {
          display: true,
          horizontalAlign: "center",
          position: "bottom",
          textAlign: "center",
          // padding: 50,

          labels: {
            pieceLabel: { mode: "percentage", render: "value" },
            usePointStyle: true,
            usePointStyle: "circle",
          },
        },
      },
    },
  };

  //  #########################################

  // #########################

  var Used = ["Not Used", "Used"];
  var Cused = [TotalLiccOunt.length, RCount.length];

  const Input_Data = {
    labels: Used,

    datasets: [
      {
        data: Cused,

        backgroundColor: [
          "#389060",
          "#bababa",
          "#7A4E48",
          "#4A4031",
          "#F6E2BB",
          "#9EC6B8",
          "#E6B39A",
          "#E6CBA5",
          "#EDE3B4",
          "#8B9E9B",
          "#6D7578",
        ],
        borderWidth: 1,
      },
    ],

    Input_options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      },

      animation: {
        duration: 2000,
      },
      plugins: {
        datalabels: {
          color: "#ffffff",
        },
        mode: "percentage",
        title: {
          display: true,
          text: "Teamcenter Total Utilization",
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
            {},
          ],
        },
        legend: {
          display: true,
          horizontalAlign: "center",
          position: "bottom",
          textAlign: "center",
          // padding: 50,

          labels: {
            pieceLabel: { mode: "percentage", render: "value" },
            usePointStyle: true,
            usePointStyle: "circle",
          },
        },
      },
    },
  };

  //   #######################

  const [graphselected, setgraphSelected] = useState("");

  //    ##########################
  const chartRef = useRef();
  const onClick = (event) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      // console.log(getElementsAtEvent(chartRef.current, event))
      const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;

      // console.log(Input_Data.labels[dataPoint])
      setgraphSelected(Input_Data.labels[dataPoint]);
    }
  };

  // console.log(setgraphSelected)
  // console.log(graphselected)

  //   ########################

  const [graphselectedbas, setgraphSelectedbas] = useState("");

  const chartRefbas = useRef();
  const onClickbas = (event) => {
    if (getElementsAtEvent(chartRefbas.current, event).length > 0) {
      // console.log(getElementsAtEvent(chartRef.current, event))
      const datasetIndexNum = getElementsAtEvent(chartRefbas.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementsAtEvent(chartRefbas.current, event)[0].index;

      // console.log(Input_Data.labels[dataPoint])
      setgraphSelectedbas(Input_Data_bas.labels[dataPoint]);
    }
  };

  // console.log(setgraphSelected)
  console.log(graphselectedbas);

  // #########################

  // if(graphselectedbas === e.Module){
  //     username.push(e.User)
  // }

  let username = [];
  let useroldMod = [];
  datas.forEach((e) => {
    if (
      (e.Application === value_Application && e.Year === value_Year) ||
      (e.Application === value_Application && e.Month === value_Month) ||
      (e.Application === value_Application && e.Week === value_Week_DD)
    ) {
      if (graphselectedbas === e.Module) {
        const present = username.some((data) => {
          return data === e.User;
        });
        if (!present) {
          username.push(e.User);
        }
      }
    }
  });

  var usedu = [];
  var useCount = [];
  datas.forEach((e) => {
    if (
      (e.Application === value_Application && e.Year === value_Year) ||
      (e.Application === value_Application && e.Month === value_Month) ||
      (e.Application === value_Application && e.Week === value_Week_DD)
    ) {
      switch (graphselectedbas) {
        case "teamcenter_admin": {
          if (
            e.Module !== "teamcenter_author" &&
            e.Module !== "teamcenter_consumer"
          ) {
            username.map((d) => {
              if (e.User === d) {
                if (
                  !usedu.some((data) => {
                    return data === e.Module;
                  })
                ) {
                  usedu.push(e.Module);
                }
              }
            });
          }
          break;
        }
        case "teamcenter_author": {
          if (
            e.Module !== "teamcenter_admin" &&
            e.Module !== "teamcenter_consumer"
          ) {
            username.map((d) => {
              if (e.User === d) {
                if (
                  !usedu.some((data) => {
                    return data === e.Module;
                  })
                ) {
                  usedu.push(e.Module);
                }
              }
            });
          }
          break;
        }
        case "teamcenter_consumer": {
          if (
            e.Module !== "teamcenter_author" &&
            e.Module !== "teamcenter_admin"
          ) {
            username.map((d) => {
              if (e.User === d) {
                if (
                  !usedu.some((data) => {
                    return data === e.Module;
                  })
                ) {
                  usedu.push(e.Module);
                 
                }
              }
            });
          }
          break;
        }
        default:
          break;
      }
    }
  });

  console.log(usedu);

  usedu.forEach((vModule, i) => {
    let max2 = 0;
    datas.forEach((f) => {
      if (
        (f.Application === value_Application && f.Year === value_Year) ||
        (f.Application === value_Application && f.Month === value_Month) ||
        (f.Application === value_Application && f.Week === value_Week_DD)
      ) {
        if (f.Module === vModule) {
          if (f.Count > max2) {
            max2 = f.Count;
          }
        }
      }
    });
    useCount[i] = max2;
  });

  console.log(useCount);


//   ################# License File Program ##############

let LicModuleC = [];
let LiCountC = [];
Trends.forEach((s) =>{
    if(s.Application === value_Application){
        LicModuleC.push(s.Total_License)
        LiCountC.push(s.Count)

    }

})

console.log(LicModuleC)
console.log(LiCountC)

var newArrayC = [];
var TotalLicCOuntC = [];

for (var i = 0; i < usedu.length; i++) {
for (var j = 0; j < LicModuleC.length; j++) {
    if (usedu[i] == LicModuleC[j]) {
        newArrayC.push(LicModuleC[j])
        TotalLicCOuntC.push(LiCountC[j])
        break;
    }
}

}

console.log(newArrayC)
console.log(TotalLicCOuntC)

let CountTotalC = [];
let RCountC = [];
let arrcountYearC = [];
for (var t = 0; t < newArrayC.length; t++) {
    CountTotalC[t] = TotalLicCOuntC[t]- useCount[t]
    RCountC[t] = (CountTotalC[t] = TotalLicCOuntC[t]- useCount[t]);

}

console.log(RCountC)


// ###############################

const Input_Data_new = {
    labels: usedu,

    datasets: [
      {
        data: RCountC,

        backgroundColor: [
          "#389060",
          "#bababa",
          "#7A4E48",
          "#4A4031",
          "#F6E2BB",
          "#9EC6B8",
          "#E6B39A",
          "#E6CBA5",
          "#EDE3B4",
          "#8B9E9B",
          "#6D7578",
        ],
        borderWidth: 1,
      },
    ],

    Input_options: {
      onHover: (event, chartElement) => {
        event.native.target.style.cursor = chartElement[0]
          ? "pointer"
          : "default";
      },

      animation: {
        duration: 2000,
      },
      plugins: {
        datalabels: {
          color: "#ffffff",
        },
        mode: "percentage",
        title: {
          display: true,
          text: graphselectedbas,
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
            {},
          ],
        },
        legend: {
          display: true,
          horizontalAlign: "center",
          position: "bottom",
          textAlign: "center",
          // padding: 50,

          labels: {
            pieceLabel: { mode: "percentage", render: "value" },
            usePointStyle: true,
            usePointStyle: "circle",
          },
        },
      },
    },
  };




// ########################################################



  return (
    <>
      {(value_Year !== "" &&
        value_Application !== "" &&
        value_Application == "Teamcenter") ||
      (value_Week_DD !== "" &&
        value_Application !== "" &&
        value_Application == "Teamcenter") ||
      (value_Month !== "" &&
        value_Application !== "" &&
        value_Application == "Teamcenter") ? (
        <div className="Pie_Out_New">
          <div className={theme === "light" ? "Utlity_Teamcenter" : "Utlity_Teamcenter-dark"}>
            {/* <span className={theme==="light"?'Capitalize':'Capitalize-dark'} >Teamcenter Utilization </span>  */}
            <Doughnut
              // height={350}
              // width={350}
              data={Input_Data}
              options={Input_Data.Input_options}
              onClick={onClick}
              ref={chartRef}
            />
  {/* </div>
  <div
            className={
              theme === "light" ? "Utlity_Teamcenter" : "Utlity_Teamcenter-dark"
            }
          > */}
        {(graphselected === "Used")?
            (<Doughnut
              // height={350}
              // width={350}
              data={Input_Data_bas}
              options={Input_Data_bas.Input_options}
              onClick={onClickbas}
              ref={chartRefbas}
            />) : "" }
            {console.log(graphselected)}
            {/* </div>
            <div
            className={
              theme === "light" ? "Utlity_Teamcenter" : "Utlity_Teamcenter-dark"
            }
          > */}
        {(graphselectedbas === "teamcenter_admin" || graphselectedbas === "teamcenter_author" || graphselectedbas === "teamcenter_consumer")?
        (<div className="BaseModule">
        <Doughnut
              // height={350}
              // width={350}
              data={Input_Data_new}
              options={Input_Data_new.Input_options}
              onClick={onClickbas}
              ref={chartRefbas}
            />
            </div>): "" }
            </div>
        

          {(graphselected === "Not Used")?
       ( <table class="table-fixed">
            <thead>
                <tr>
                    <th class= "col">Module Name</th>
                    <th class= "col"> License Count</th>
                </tr>
            </thead>
            <tbody>
                {ArrNotUsed.map((each,i)=>{
                    return <tr>
                        <td class= "col">
                            {each}
                        </td>
                        <td class= "col">
                            {TotalLiccOunt[i]}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>)  : ""  }
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TestChart;

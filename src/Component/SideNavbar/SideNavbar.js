import React, { useState } from "react";
// import 'antd/dist/antd.css';
import { DatePicker } from "antd";
import moment from 'moment';
import { Week, Month, Year, Application } from "./Input";
// import ReactSwitch from "react-switch";
import Button from '@mui/material/Button';
import "./SideNavbar.css";
import ReactSwitch from "react-switch";
const {RangePicker} = DatePicker;

const SideNavBar = ({value_Application,setValue_Application, value_Week_DD, setValue_Week, value_Month, setValue_Month, value_Year, setValue_Year, dates,setDates}) => { 
  // const [theme, setTheme] = useState("light");
	const [isExpanded, setExpendState] = useState(false);
    // const [value_Application, setValue_Application] = useState("");
    // const [ value_Week_DD, setValue_Week] = useState("");
    // const [value_Month, setValue_Month] = useState("");
    // const [value_Year, setValue_Year] = useState("");
    // const [dates,setDates] = useState({from:'',to:''});
 // Weekly

 // Theme 
//  const toggleTheme = () => {
//   setTheme((curr) => (curr === "light" ? "dark" : "light"));
//   }


//  const toggleTheme = () => {
//   setTheme((curr) => (curr === "light" ? "dark" : "light"));
// }

//  const [value_Week_DD, setValue_Week] = useState();
const handlechange_Week = (e) => {
    setValue_Week(e.target.value);
  };
 
 //  const [value_Month, setValue_Month] = useState();
  const handlechange_Month = (e) => {
    setValue_Month(e.target.value);
  };
 
  // Mothly 
 
 //  const handlechange = (e) => {
 //    setSelect(e.target.value);
 //  };
 
  //Yearly
 
 //  const [value_Year, setValue_Year] = useState();
  const handlechange_Year = (e) => {
    setValue_Year(e.target.value);
  };
 
 
  // Application
 
  const [value_Application_1, setValue_Application_1] = useState();
 const handlechange_Application = (e) => {
   setValue_Application_1(e.target.value);
   // setValue_Application(value_Application_1)
    //  console.log(e.target.value);
         
  };
 
  // Date
  let value1=0;
 let value2=0;
 const [selected, setSelected] = useState("");
 const changeHandler = e => {
   setSelected(e.target.value);
   
 }
//  console.log(selected);
  // Clear reset button
 
  const clearInput = (e)=>{
    setDates({from:"",to:""});
   //  setSelect("");
    setValue_Week("");
    setValue_Year("");
    setValue_Month("");
    setValue_Application("");
    setValue_Application_1("");
    setSelected("");
 
  }
 
  const GenerateInput = (e) => {
   // alert('sss')
   
   setValue_Application(value_Application_1);
 
  }

	return (
    <div className="SideBarContain">
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/mavenberg.png" alt="" srcset="" />
							{/* <h2>Mavenberg</h2> */}
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
                        
						<span>

                         </span>
						<span>
                            
                        </span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
                <div >
                {isExpanded && ( <div>
                        <span  className='FirstPortion'>
                             
                        {((selected==="")||(selected==="Daily"))?(<>
                        <label>
                        <input type="radio"value="Daily"
                        id="Daily"
                        className="Daily"
                        checked={selected === "Daily"}
                        onChange={changeHandler}
                        /> 
                          
                          <span> Daily </span>
                          </label></>):""}


                        <div className="Makeup" aria-hidden={selected !== "Daily" ? true : false}> 
                        <label htmlFor="Daily"></label>
                        <div className="Make">
                        <RangePicker className="DatePicker"
                        onChange={(values) => {
                        if(values!=null){
                        value1 = moment(values.at(0)).format("M/D/YYYY");

                        value2 = moment(values.at(1)).format("M/D/YYYY");

                        setDates({from:value1,to:value2})

                        }
                        else{
                        setDates({from:"",to:""})
                        }   
                        }}
                        />
                        </div>
                        </div>
                        </span>
                        </div>)}
                        {isExpanded && ( <div>
                        <div>
     <div className='SecondPortion'>
     {((selected==="")||(selected==="Weekly"))?(<>
     
      <label> <input type="radio" value = "Weekly"id="Weekly"checked = {selected==="Weekly"} onChange = {changeHandler}/>
        Weekly 
        
        </label></>):""}
      <div className="Makeup" aria-hidden={selected !== "Weekly" ? true : false}> 
      <label for="Weekly"></label>

      <span className='checkmark'></span>

      <div className="Week-dropdown">
           <select value={value_Week_DD} className="form-control " onChange={handlechange_Week}>
             <option  selected>Week</option>
             {Week.map((item, index) => {
               return (
                 <option value={item.name} key={index}>
                   {item.name}
                 </option>
               );
             })}
           </select>
         </div>
         </div>
        </div>
     </div>
                        </div> )}
                        {isExpanded && ( <div className="Third">
                        <div>
     <div className='ThirdPortion'>
     {((selected==="")||(selected==="Monthly"))?(<>
    
     <label>
     <input type="radio" value="Monthly" id="Monthly" className="Monthly"  checked={selected === "Monthly"}
     onChange={changeHandler}/> 
      Monthly
      </label></>):""}
   
     <div className="Makeup" aria-hidden={selected !== "Monthly" ? true : false}> 
     
     <label htmlFor="Monthly"></label>

     <div className="Month-dropdown">
           <select value={value_Month} className="form-control" onChange={handlechange_Month}>
             <option selected>Month</option>
             {Month.map((item, index) => {
               return (
                 <option value={item.name} key={index}>
                   {item.name}
                 </option>
               );
             })}
           </select>
         </div>

         </div> 
     </div>
     </div>
                        </div> )}
                        {isExpanded && (<div className="fourth">
     <div className='FourthPortion'>
     {((selected==="")||(selected==="Yearly"))?(<>

     <label>
     <input
       type="radio"
       value="Yearly"
       id="Yearly"
       className="Yearly"
       checked={selected === "Yearly"}
       onChange={changeHandler}/> 
      Yearly
      </label></>):""}
   
     <div className="Makeup" aria-hidden={selected !== "Yearly" ? true : false}> 
     <label htmlFor="Yearly"></label>

     <div className="Year-dropdown">
           <select value={value_Year} className="form-control " onChange={handlechange_Year}>
             <option selected>Year</option>
             {Year.map((item, index) => {
               return (
                 <option value={item.name} key={index}>
                   {item.name}
                 </option>
               );
             })}
           </select>
         </div>

         </div>

     </div>
             </div> )}
                        {isExpanded && ( <div className="Application">
                        <div className="Application-dropdown">
           <select
               value={value_Application_1}
             className="form-controlexe"
             onChange={handlechange_Application}
           >
             <option  selected>Application</option>
             {Application.map((item, index) => {
               return (
                 <option value={item.name} key={index}>
                   {item.name}
                 </option>
               );
             })}
           </select>
         </div>
                        </div>)}
                        {isExpanded && ( <div className="ButtonInput">            
         <div className="Reset"> <Button className="Resetbtn" onClick={clearInput} variant="outlined">Reset</Button>
         <button className = "Generate" onClick = {GenerateInput}> Generate </button>
         </div>    </div> )}
</div>
        {/* <div className='switch'>
				<label>{theme === 'light' ? "Light Mode" : "Dark Mode"}</label>
			   <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} />
			</div> */}
				</div>
			</div>

		</div>
    </div>
	);
};

export default SideNavBar;


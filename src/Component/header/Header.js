import React, { useEffect } from "react";
import "./Header.css";
// import Button from "../UI/Button/Button";
// import "../UI/Button/Button.css";
import Graph from "../../assets/Graph.png";
// import { BsMouse } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

const Header = ( {open, setOpen} ) => { 
  console.log(open)
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const open_close_func = () => {
    console.log("ïn")
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>License Report </span>
            {/* <span>Generation</span> */}
            {/* <span>messaging system</span> */}
          </h1>
          {/* <button  text={"Get Started"} onClick={open_close_func} className= "button" >Get Started</button> */}
          <p className="u-text-small">
            Licence Report contains information about the usage of licenses by users based on modules or applications
          </p>
          <div className="header-cta">
            {/* <Button text={"Get Started"} btnClass={"btn-dark"} href={"#"} /> */}
           
          </div>
        </div>
        <div className="header-right" data-aos="fade-left">
          <img src={Graph} alt="phone" />
        </div>
      </div>
      {/* <div className="floating-icon">
        <a href="#features">
          <BsMouse color="#fff" size={25} className="mouse" />
        </a>
      </div> */}
    </section>
  );
};

export default Header;

import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 2000,
});

function LandingScreen() {
  return (
    <div style={{marginTop:"30px"}}>
      <div className="col-md-12 text-center">
        {/* <h2 data-aos="zoom-in" style={{ color: "white", fontSize: "100px" }}>
          MERN HOTEL BOOKING
        </h2> */}
        <img src="./hotelpic.jpg" data-aos="zoom-in" style={{width:"100%",height:"400px"}}/>
        <br/>
        <br/>

        <div >
        <h4 data-aos="zoom-in" style={{color:"DarkOliveGreen" , fontFamily:"Baskerville Old Face"}} >"Your Comfort, Our Priority: Let Us Enhance Your Stay!"</h4>

        </div>
        <Link to="/home">
          <button className="btn btn-primary landingBtn">Explore rooms</button>
        </Link>
        <br/>
        <br/>

       
      </div>
    </div>
  );
}

export default LandingScreen;

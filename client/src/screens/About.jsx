import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";



const About = () => {
  return (
    <div style={{padding:"10px"}}>
        <div style={{padding:"10px",background:"cornsilk",boxShadow:"5px 5px 5px 5px grey",borderRadius:"5px"}}>
        <img src='./harrison.jpg' data-aos="zoom-in" style={{width:"100%"}}/>

        </div><br/><br/>
        <h1 className='about' style={{textAlign:"center",fontSize:"100px",fontWeight:"bold", border:"10px",fontFamily:"Baskerville Old Face"}}>About Us</h1>
         <p className='des' data-aos="zoom-out" style={{ color: "black",textAlign:"justify", fontFamily:"Bodoni MT Condensed" }}>
         Welcome to The Hotel Tranquil, where luxury meets serenity in the heart of the city. Nestled amidst lush greenery and offering breathtaking views of the surrounding landscapes, our hotel is a haven for travelers seeking a peaceful retreat.

As you step into our elegant lobby, you'll be greeted by our attentive staff, ready to cater to your every need. Our meticulously designed rooms and suites exude comfort and sophistication, providing you with a restful sanctuary after a day of exploration.

Indulge your palate at our onsite restaurants, where expert chefs craft culinary delights using only the freshest ingredients. Whether you're craving international cuisine or local specialties, our diverse dining options are sure to satisfy every taste.

For those seeking relaxation, unwind by our sparkling outdoor pool or pamper yourself with a rejuvenating spa treatment. Stay active in our state-of-the-art fitness center or explore the nearby attractions with our concierge service available to assist you in planning your adventures.

With our impeccable service and attention to detail, The Tranquil Oasis Hotel promises an unforgettable stay, where every moment is infused with tranquility and luxury. Experience true hospitality at its finest with us.
        </p>

        <h1 className='contact' style={{textAlign:"center",fontWeight:"bold",fontFamily:"Baskerville Old Face"}}>Contact Us</h1>
       <div style={{display:"flex",justifyContent:"space-around"}}>
       <div>
       <div style={{display:"flex",justifyItems:"center",gap:"10px"}}>
        <IoLocationSharp style={{fontSize:"20px"}}/>
        <p>Campus Road, Roadcess, Biratnagar</p>
        </div>

        <div style={{display:"flex",justifyItems:"center",gap:"10px"}}>
        <FaPhoneAlt style={{fontSize:"20px"}}/>
        <p>9800123456, 9812345678</p>
        </div>

        <div style={{display:"flex",justifyItems:"center",gap:"10px"}}>
        <SiGmail style={{fontSize:"20px"}}/>
        <p>mahendra@gmail.com</p>
        </div>
       </div>

        <div style={{display:"flex",gap:"20px",fontSize:"20px"}}>
        <a href='https://www.facebook.com/'><FaFacebook style={{cursor:"pointer"}}/></a>
        <a href='https://twitter.com/'><FaSquareXTwitter style={{cursor:"pointer"}}/></a>
        <a href="https://instagram.com"><FaInstagram style={{cursor:"pointer"}}/></a>
        </div>
       </div>
    
    </div>  
  )
}

export default About
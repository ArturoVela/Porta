import React from 'react';
import HeroBanner2 from '../Components/HeroBanner/HeroBanner2';
import Marquee2 from '../Components/Marquee/Marquee2';
import About2 from '../Components/About/About2';
import Skill2 from '../Components/Skill/Skill2';
import Experience from '../Components/Experience/Experience';
import Project2 from '../Components/Project/Project2';
import Brand1 from '../Components/Brand/Brand1';
import Services2 from '../Components/Services/Services2';
import Pricing2 from '../Components/Pricing/Pricing2';
import Testimonail2 from '../Components/Testimonial/Testimonail2';

const page = () => {
    return (
        <div>
           <HeroBanner2></HeroBanner2> 
           <Marquee2></Marquee2>
           <About2></About2>
           <Skill2></Skill2>
           <Experience></Experience>  
           <Project2></Project2>
           <Brand1></Brand1>      
           <Services2></Services2> 
           <Pricing2
                addclass="pricing-area space"
            ></Pricing2>  
             <Testimonail2
                addclass="testimonial-area space bg-theme2"
            ></Testimonail2>   
                          
        </div>
    );
};

export default page;
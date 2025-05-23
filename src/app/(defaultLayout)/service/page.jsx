import Brand2 from '@/app/Components/Brand/Brand2';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Pricing2 from '@/app/Components/Pricing/Pricing2';
import Services from '@/app/Components/Services/Services';
import Testimonail2 from '@/app/Components/Testimonial/Testimonail2';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                addclass="breadcumb-wrapper space-bottom bg-theme2"
                Title1="VEAMOS"
                title2="MIS SERVICIOS"
            ></BreadCumb>  
            <Services></Services>   
            <Pricing2
                addclass="pricing-area space bg-theme2"
            ></Pricing2>
            <Testimonail2
                addclass="testimonial-area space-bottom bg-theme2"
            ></Testimonail2> 
            <Brand2></Brand2>                   
        </div>
    );
};

export default page;
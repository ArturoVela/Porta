import Blog3 from '@/app/Components/Blog/Blog4';
import BreadCumb from '@/app/Components/Common/BreadCumb';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                addclass="breadcumb-wrapper pb-0 bg-theme2"
                Title1="VEAMOS"
                title2="ARTÍCULOS"
            ></BreadCumb>
            <Blog3></Blog3>  
        </div>
    );
};

export default page;
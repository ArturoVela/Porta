import BreadCumb from '@/app/Components/Common/BreadCumb';
import Project3 from '@/app/Components/Project/Project3';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                addclass="breadcumb-wrapper pb-0 bg-theme2"
                Title1="VEAMOS"
                title2="MIS TRABAJOS"
            ></BreadCumb>
            <Project3></Project3>            
        </div>
    );
};

export default page;
import BreadCumb from '@/app/Components/Common/BreadCumb';
import Eventos2 from '@/app/Components/Eventos/Eventos2';
import React from 'react';

const page = () => {
    return (
        <div>
            <BreadCumb
                addclass="breadcumb-wrapper pb-0 bg-theme2"
                Title1="EVENTOS"
                title2="A los que asistí"
            ></BreadCumb>
            <Eventos2></Eventos2>            
        </div>
    );
};

export default page;
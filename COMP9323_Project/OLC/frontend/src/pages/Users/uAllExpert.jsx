import React, { useState, useEffect } from 'react';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import apiRequest from '../../api/api';
import AAuthorCard from '../../components/aauthorCard'
import { useHistory } from 'react-router-dom';

const AllExpert = () => {
    const history = useHistory();
    const [Q,setQ]=React.useState([]);
    React.useEffect(()=>{
        const getExpert = async () => {
            const response = await apiRequest('expertApplication','GET',[],'?status=1');
            const res=response.json();
            res.then((data)=>{
                setQ(data['expert application']);
            })
        }
        getExpert();
    },[])

    return (
        <>
            <UHeader/>
            <div class="container">
                <div class="row mt-4">
                    <div class="column col-md-4 float-sm-end"></div>
                </div>
                {/* List all experts */}
                <div class="row gy-4 mt-4">
                    {Q.map((item)=><AAuthorCard Author={item.expert_name} id={item.user_id} user={1}/>)}
                </div>
            </div>
            <UFooter/>
        </>
    )
}

export default AllExpert;
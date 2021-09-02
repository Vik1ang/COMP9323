import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import ULetterCard from '../../components/uLetter';
import apiRequest from '../../api/api'

const ULetter =()=> {
    // const URL = "http://localhost:5000"
    const URL ='http://121.5.155.221:80';
    const [Q,setQ]=React.useState([]);
    const [newL,setNew]=React.useState(true);
    const [unread,setR]=React.useState(0);
    React.useEffect(()=>{
        const getLetter = async()=>{
            const response = await apiRequest('userLetter','GET');
            const res=response.json();
            res.then((data)=>{
                setQ(data['notification_list']);
                let num=0
                let list=[]
                for(let i=0;i<data['notification_list'].length;i++){
                    if(data['notification_list'][i]['is_read']==0){
                        num++
                        list.push(data['notification_list'][i])
                    }
                    if(i==data['notification_list'].length-1){
                        console.log(num);
                        setR(num);
                        setQ(list);
                    }
                }
            })
        }
        getLetter();
    },[newL])
    const newLetter = () => {
        setNew(!newL)
    }
    return (
        <>
            <UHeader/>
            <div class="container">
                {unread==0?<h5 class="post-title mb-0 mt-2">No unread notifications</h5>
                    :
                    <div class="row gy-4">
                        {Q.map((item)=>
                            <ULetterCard date={item.create_time} title={item.title} content={item.content} id={item.id} read={item.is_read} orderid={item.order_id} newLetter={newLetter} type={item.type} linka={item.link}></ULetterCard>
                        )}
                    </div>
                    }
            </div>
            <UFooter />
        </>
    );
}

export default ULetter;

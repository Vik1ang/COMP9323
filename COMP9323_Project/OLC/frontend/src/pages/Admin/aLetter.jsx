import React from 'react';
import { useHistory } from 'react-router-dom';
import AHeader from '../../components/aHeader';
import ANav from '../../components/aNav';
import UFooter from '../../components/uFooter';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/aGeneralQCard';
import ALERT from '../../components/alert';
import context from 'react-bootstrap/esm/AccordionContext';
import apiRequest from '../../api/api';

const ALetter =()=> {
    const [Q,setQ]=React.useState([]);
    const [qlen,setQlen]=React.useState(0);
    const [modify,setModify]=React.useState(0)
    React.useEffect(()=>{
        const getAllPosts = async () => {
            const response = await apiRequest('adminLetter','GET');
            const res=response.json();
            res.then((data)=>{
                setQ(data['report_list']);
            })
        }
        getAllPosts();
    },[modify])
    const update=()=>{
        setModify(!modify)
    }
    React.useEffect(()=>{
        if(Q.length!==0){setQlen(1)};
    },[Q])
    return (
        <>
            <AHeader />
            <ANav show={[1,0,0]}/>
            <div class="container">
            {qlen!=0?
            <div>
            <h5 class="post-title mb-0 mt-2">All Report Posts list here :</h5>
                <div class="container mt-4">
                    <div class="row gy-4">
                        {Q.map((item)=><GeneralQCard Title={item.title} Date={item.update_time} Q={item.contents} Author={item.username} id={item.post_uuid} header={1} update={update}/>)}
                    </div>
                </div>
            </div>
            :<h5 class="post-title mb-0 mt-2">No Report</h5>}
            </div>
            <UFooter />
        </>
    );
}

export default ALetter;

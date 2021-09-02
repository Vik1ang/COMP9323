import React from 'react';
import { useHistory } from 'react-router-dom';
import AHeader from '../../components/aHeader';
import ANav from '../../components/aNav';
import UFooter from '../../components/uFooter';
import AAuthorCard from '../../components/aauthorCard'
import AExpertOrder from '../../components/aExpertOrder'
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/aGeneralQCard';
import apiRequest from '../../api/api';

const AExperts =()=> {
    const history = useHistory();
    const [eId,seteId]=React.useState();
    const [Q,setQ]=React.useState([]);
    React.useEffect(()=>{
        console.log('test!!!')
        const getExpert = async () => {
            const response = await apiRequest('expertApplication','GET',[],'?status=1');
            console.log('expert',response);
            const res=response.json();
            res.then((data)=>{
                console.log(data);
                setQ(data['expert application']);
            })
        }
        getExpert();
    },[])
    // }
    const changeeId =(e)=>{
        console.log(e.target.value)
        seteId(e.target.value);
    }
    const searcheId = async() => {
        const optional=`?expert_id=${eId}`
        const response = await apiRequest('expertApplication','GET',[],optional);
        const res=response.json();
        await res.then((data)=>{
            console.log('asf',data);
            // setQ([]);
            if(data['expert application'].length==0){
                alert("inValid Expert ID")
            }
            else{
                setQ(data['expert application']);
            }
        })
    }

    return (
        <>
            <AHeader />
            <ANav show={[0,1,0]}/>
            <div class="container">
                <div class="row mt-4">
                    <div class="column col-md-4 float-sm-end"></div>
                    <div class="column col-md-4 p-0 float-sm-end">
                        <span>
                            <input name="KeyWord" class="form-control" type="number" placeholder="Search Expert ID" style={{display:"inline-flex"}} onChange={changeeId}/>
                        </span>
                    </div>
                    <div class="column col-md-4 float-sm-end">
                         <span class="search icon-button float-sm-front">
                            <i class="icon-magnifier" onClick={searcheId}></i>
                        </span>
                    </div>
                </div>
                {/* List all experts */}
                <div class="row gy-4 mt-4">
                    {Q.map((item)=><AAuthorCard Author={item.expert_name} id={item.expert_id} user={0}/>)}
                </div>
            </div>
            <UFooter />
        </>
    );
}

export default AExperts;

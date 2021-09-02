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

const AExpertsOrder =()=> {
    const [Q,setQ]=React.useState([]);
    const [oId,setoID]=React.useState('');
    React.useEffect(()=>{
        const getExpert = async () => {
            const response = await apiRequest('expertOrder','GET',[],'');
            const res=response.json();
            res.then((data)=>{
                console.log('111',data['payments']);
                setQ(data['payments']);
            })
        }
        getExpert();
    },[])
    const changeOId =(e)=>{
        setoID(e.target.value);
    }
    const searchoId = async() => {
        const optional=`?order_id=${oId}`
        const response = await apiRequest('expertOrder','GET',[],optional);
        const res=response.json();
        await res.then((data)=>{
            if(data['payments'].length==0){
                alert("inValid Order ID");
            }else{
                setQ(data['payments']);
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
                            <input name="KeyWord" class="form-control" type="number" placeholder="Search Order ID" style={{display:"inline-flex"}} onChange={changeOId}/>
                        </span>
                    </div>
                    <div class="column col-md-4 float-sm-end">
                         <span class="search icon-button float-sm-front">
                            <i class="icon-magnifier" onClick={searchoId}></i>
                        </span>
                    </div>
                </div>
                {/* expert orders */}
                <table class="table mt-4">
                    <thead>
                        <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Time</th>
                        <th scope="col">User</th>
                        <th scope="col">Expert</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Q.map((item)=><AExpertOrder id={item.orderId} time={item.start_time} date={item.start_time} user={item.user_name} expert={item.expert_name} duration={item.duration} price={item.price} status={item.status} show={[1,1,1,1,1,1,1,1]}/>)}
                    </tbody>
                </table>
            </div>
            <UFooter />
        </>
    );
}

export default AExpertsOrder;

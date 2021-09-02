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

const AExpertApplication =()=> {
    // const history = useHistory();
    const [Q,setQ]=React.useState([]);
    const [eID,seteID]=React.useState('');
    const [show,setShow]=React.useState([1,0,0,0]);
    const getApp = async (path,optional) => {
        const response = await apiRequest(path,'GET',[],optional);
        const res=response.json();
        await res.then((data)=>{
            setQ([]);
            setQ(data['expert application']);
        })
    }
    const all=()=>{
        setShow([1,0,0,0]);
    }
    const process=()=>{
        setShow([0,1,0,0]);
    }
    const approved=async()=>{
        setShow([0,0,1,0]);
    }
    const rejected=async()=>{
        setShow([0,0,0,1]);
    }
    React.useEffect(()=>{
        const path='expertApplication'
        if(show[0]==1){
            getApp(path,'');
        }
        else if(show[1]==1){
            getApp(path,'?status=0');
        }
        else if(show[2]==1){
            getApp(path,'?status=1');
        }
        else if(show[3]==1){
            getApp(path,'?status=2');
        }
    },[show])
    React.useEffect(()=>{
        console.log('QRefresh',Q)
    },[Q])
    const changeEId =(e)=>{
        seteID(e.target.value);
    }
    const searcheId = async() => {
        const path='expertApplication'
        const optional=`?expert_id=${eID}`
        const response = await apiRequest(path,'GET',[],optional);
        const res=response.json();
        await res.then((data)=>{
            if(data['expert application'].length==0){
                alert("inValid")
            }else{
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
                            <input name="KeyWord" class="form-control" type="number" placeholder="Search Expert ID" style={{display:"inline-flex"}} onChange={changeEId}/>
                        </span>
                    </div>
                    <div class="column col-md-4 float-sm-end" onClick={searcheId}>
                         <span class="search icon-button float-sm-front">
                            <i class="icon-magnifier"></i>
                        </span>
                    </div>
                </div>
                <div class="d-flex align-items-start mt-4" >
                    <div class="nav flex-column nav-pills me-3 m-10" >
                        <button class={show[0]?"nav-link active":"nav-link"} style={{color:"#79889e",backgroundColor:"white"}} onClick={all}>All</button>
                        <button class={show[1]?"nav-link active":"nav-link"} style={{color:"#79889e",backgroundColor:"white"}} onClick={process}>Processing</button>
                        <button class={show[2]?"nav-link active":"nav-link"} style={{color:"#79889e",backgroundColor:"white"}} onClick={approved}>Approved</button>
                        <button class={show[3]?"nav-link active":"nav-link"} style={{color:"#79889e",backgroundColor:"white"}} onClick={rejected}>Rejected</button>
                    </div>
                    {show[0]?
                    <table class="table mt-4">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Q.map((item)=><AExpertOrder id={item.expert_id} time={item.application_time} user={item.expert_name} status={item.status} show={[1,1,1,1,0,0,0,0,1]}/>)}
                        </tbody>
                    </table>
                    :null}
                    {/* Processing */}
                    {show[1]?
                    <table class="table mt-4">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Q.map((item)=><AExpertOrder id={item.expert_id} time={item.application_time} user={item.expert_name} status={item.status} show={[1,1,1,1,0,0,0,0,1]}/>)}
                        </tbody>
                    </table>
                    :null}
                    {/* approved */}
                    {show[2]?
                    <table class="table mt-4">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Q.map((item)=><AExpertOrder id={item.expert_id} time={item.application_time} user={item.expert_name} status={item.status} show={[1,1,1,1,0,0,0,0,1]}/>)}
                        </tbody>
                    </table>
                    :null}
                    {/* rejected */}
                    {show[3]?
                    <table class="table mt-4">
                        <thead>
                            <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Time</th>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Q.map((item)=><AExpertOrder id={item.expert_id} time={item.application_time} user={item.expert_name} status={item.status} show={[1,1,1,1,0,0,0,0,1]}/>)}
                        </tbody>
                    </table>
                    :null}
                </div>

            </div>
            <UFooter />
        </>
    );
}

export default AExpertApplication;

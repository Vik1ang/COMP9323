import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralQCard from '../../components/aGeneralQCard';
import apiRequest from '../../api/api'
import AHeader from '../../components/aHeader';
import ANav from '../../components/aNav';
import UFooter from '../../components/uFooter';
import { useHistory } from 'react-router-dom';

const ExpertCard=({match})=>{
    const history = useHistory();
    const show=match.params.type;
    const id=match.params.ExpertID;
    const [Q,setQ]=React.useState([]);
    const [refuse,setRefuse]=React.useState(false);
    const [reason,setReason]=React.useState('');
    const [len,setLen]=React.useState([]);
    // show==1 means expert，show==2 means processiong
    const goExpert = () => {
        history.push("/adminExpert");
    }
    const EApprove = async() => {
        const response = await apiRequest('adminExpertPassorNot','POST',[id,1]);
        history.push("/adminExpertApplications");
    }
    const ERefuse = async() => {
        setRefuse(true);
    }
    const EBack = ()=>{
        history.push("/adminExpertApplications");
    }
    React.useEffect(()=>{
        const getExpert = async () => {
            const response = await apiRequest('adminExpertDetail','GET',[],`?expert_id=${id}`);
            const res=response.json();
            res.then((data)=>{
                setQ(data['expert']);
            })
        }
        getExpert();
    },[])
    React.useEffect(()=>{
        if(Q['personal_certificate']){
            setLen(Q['personal_certificate'].length)
        }
    },[Q])
    const CRefuse = async() => {
        const response = await apiRequest('adminExpertPassorNotNo','POST',[id,2,reason]);
        history.push("/adminExpertApplications");
    }
    const reasonValue = (e) =>{
        setReason(e.target.value);
    }
    const cancel = () => {
        setRefuse(false);
    }
    const revokeExpert = async() => {
        const response = await apiRequest('adminExpertRevoke','POST',id);
        setRefuse(false);
        alert('Revoke successful')
        history.push("/adminExpert");
    }
    return(
        <div>
            <AHeader />
            <ANav show={[0,1,0]}/>
            <div class="container  text-center">
                    <div class="row-xl">
                        <div style={{margin:100}}>
                            <h5 class="post-title mb-0 mt-2">Name:</h5>
                            <div style={{marginBottom:20}}>{Q.expert_name}</div>
                            <h5 class="post-title mb-0 mt-2">Expert ID:</h5>
                            <div style={{marginBottom:20}}> {Q.expert_id}</div>
                            <h5 class="post-title mb-0 mt-2">Related Experience: </h5>
                            <div>
                            {Q.related_experience==null?<div style={{marginBottom:20}}>Null</div>:<div style={{marginBottom:20}}>{Q.related_experience}</div>}
                            </div>
                            <h5 class="post-title mb-0 mt-2">Personal Certificate:</h5> 
                            <div>
                                {len==0?<div>Null</div>
                                    :<div style={{marginBottom:20}}>
                                        {Q['personal_certificate'].map((item)=>
                                            <img src={item} ></img>
                                        )}
                                    </div>}
                            </div>
                        </div>
                        {show=='expert'
                        ?
                        <div>
                            <div> <button class="btn btn-default btn-full " style={{width:"30%",marginBottom:20}} onClick={goExpert}><div className="smallText">Back</div></button></div>
                            <div> <button class="btn btn-default btn-full " style={{width:"40%"}} onClick={revokeExpert}><div className="smallText">Revoke expert status</div></button></div>
                        </div>
                        :<div>
                            {refuse?
                            <div>
                                <input class="form-control" type="text" placeholder="Please type the reason for rejection" style={{display:"inline-flex",marginBottom:20}} required="required" onChange={reasonValue} />
                                <button class="btn btn-default btn-full" style={{width:"30%", marginBottom:20,marginRight:20}}><div className="smallText" onClick={cancel}>Cancel</div></button>
                                <button class="btn btn-default btn-full" style={{width:"30%", marginBottom:20}}><div className="smallText" onClick={CRefuse}>Confirm Refuse</div></button>
                            </div>
                            :
                            <div>
                                <button class="btn btn-default btn-full" style={{width:"30%",marginBottom:20,marginRight:20}}><div className="smallText" onClick={EApprove}>Approve</div></button>
                                <button class="btn btn-default btn-full" style={{width:"30%",marginBottom:20}}><div className="smallText" onClick={ERefuse}>Refuse</div></button>
                                <button class="btn btn-default btn-full" style={{width:"40%",marginBottom:20}}><div className="smallText" onClick={EBack}>Back</div></button>
                            </div>
                            }
                            
                            </div>}
                    </div>
            </div>
            <UFooter />
        </div>
    )
}

ExpertCard.propTypes = {
    match: PropTypes.objectOf(PropTypes.object),
    params: PropTypes.objectOf(PropTypes.object),
};

ExpertCard.defaultProps = {
    match: PropTypes.objectOf(PropTypes.object),
    params: PropTypes.objectOf(PropTypes.object),
};

export default ExpertCard;
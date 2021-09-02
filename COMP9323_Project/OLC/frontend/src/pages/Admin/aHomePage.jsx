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
import { Overlay, OverlayTrigger,Button,Tooltip } from 'react-bootstrap';

const AHomePage =()=> {
    const [pop,setPop]=React.useState([true]);
    const [searchID,setSearchID]=React.useState(['']);
    const [Q,setQ]=React.useState([]);
    const [search,setSearch]=React.useState([]);
    const [qlen,setQlen]=React.useState(0);
    const [modify,setModify]=React.useState(0)
    const [community,setC]=React.useState('');
    const [detail,setD]=React.useState([]);
    const [ttt,setNew]=React.useState(true);
    const popSearchResult = async() =>{
        setPop(false);
        const getSinglePosts = async () => {
            console.log('sss',searchID)
            const response = await apiRequest('getAllPosts','GET',[],`?post_uuid=${searchID}`);
            const res1=response.json();
            res1.then((data)=>{
                console.log(data)
                if(data['list'].length==0){
                    // alert("inValid Post ID")
                    setPop(true)
                }
                else{
                    setSearch(data['list']);
                }
            })
        }
        if(searchID==''){
            alert('Search ID can not be empty')
        }
        else{
            getSinglePosts();
        }
    }
    const changeID = (e) => {
        setSearchID(e.target.value);
    }
    React.useEffect(()=>{
        const getAllPosts = async () => {
            const response = await apiRequest('getAllPosts','GET',[],'');
            const res=response.json();
            res.then((data)=>{
                setQ(data['list']);
            })
        }
        getAllPosts();
    },[modify])
    const unpopSearchResult = () => {
        setPop(true);
    }
    React.useEffect(()=>{
        if(Q!=[]){setQlen(1)}
    },[Q])
    React.useEffect(()=>{
        if(search.length>0){console.log('set');setPop(false)};
    },[search])
    const update=()=>{
        setModify(!modify)
    }
    const changeCommunity = (e)=>{
        setC(e.target.value)
    }
    const addCommunity = async() => {
        if(community==''){
            alert('Community name can not be empty')
        }
        else{
            await apiRequest('addCommunity','POST',community);
            setNew(!ttt)
        }
            
    }
    React.useEffect(async()=>{
        const response = await apiRequest('getAllcommunity','GET');
        const res=response.json();
        res.then((data)=>{
            let list=[]
            const clen=data['communities'].length
            for(let i=0;i<clen;i++){
                list.push(data['communities'][i]['name'])
                if(i==clen-1){
                    setD(list)
                }
            }
        })
    },[ttt])
    const communityHint = props => (
        <Tooltip {...props}>Click to delete community</Tooltip>
    );
    const deleteC = async(e) =>{
        await apiRequest('deleteCommunity','POST',e.target.innerText);
        setNew(!ttt)
    }
    return (
        <>
            <AHeader />
            <ANav show={[1,0,0]}/>
            <div class="container">
                <div class="row mt-4">
                    <div class="column col-md-4 float-sm-end"></div>
                    <div class="column col-md-4 p-0 float-sm-end">
                        <span>
                            <input class="form-control" type="text" placeholder="New comminity" style={{display:"inline-flex"}} onChange={changeCommunity} required="required"/>
                        </span>
                    </div>
                    <div class="column col-md-4 float-sm-end">
                        <button class="btn btn-default btn-full" style={{width:200}} onClick={addCommunity}>
                            <span className="smallText">+ Add a new community</span>
                        </button>
                    </div>
                </div>
                {detail.map((item)=>
                    <OverlayTrigger placement="top" overlay={communityHint} >
                        <button class="btn btn-default btn-full" style={{margin:20,width:150}} onClick={deleteC} >
                            <span className="smallText">{item}</span>
                        </button>
                    </OverlayTrigger>
                )}

                <div class="row mt-4">
                    <div class="column col-md-4 float-sm-end"></div>
                    <div class="column col-md-4 p-0 float-sm-end">
                        <span>
                            <input name="KeyWord" class="form-control" type="text" placeholder="search post ID" style={{display:"inline-flex"}} onChange={changeID}/>
                        </span>
                    </div>
                    <div class="column col-md-4 float-sm-end">
                         <span class="search icon-button float-sm-front">
                            <i class="icon-magnifier" onClick={popSearchResult}></i>          
                        </span>
                    </div>
                </div>
                {pop&&qlen!=0?<div class="container mt-4">
                    <div class="row gy-4">
                        {Q.map((item)=><GeneralQCard Title={item.title} Date={item.update_time} Q={item.contents} Author={item.creator_id} id={item.post_uuid} update={update} popSearchResult={popSearchResult} status={0}/>)}
                    </div>
                </div>
                :<div style={{paddingTop:"10%"}}>
                <div onClick={unpopSearchResult}>&#9668; Return</div>
                    {search.map((item)=><GeneralQCard Title={item.title} Date={item.update_time} Q={item.contents} Author={item.creator_id} id={item.post_uuid} update={update} popSearchResult={popSearchResult} status={1}/>)}
                </div>}
            </div>
            <UFooter />
        </>
    );
}

export default AHomePage;

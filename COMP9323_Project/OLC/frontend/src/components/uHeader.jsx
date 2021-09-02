import { notification } from 'antd';
import React from 'react';
import { Overlay, OverlayTrigger,Button,Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import apiRequest from '../api/api';
import PropTypes from 'prop-types';

const UHeader = (props) => {
    const {num}=props
    const history = useHistory();
    const [Q,setQ]=React.useState(0);
    const [sss,setS]=React.useState('');
    const goLogin = async() => {
        console.log('hi')
        localStorage.setItem('token', "null");
        const response= await apiRequest('logout', 'GET');
        history.push('/login');
    }
    const goUserinfo = () => {
        localStorage.setItem("isList", '0');
        history.push('/UserInfo');
    }
    const changeSearch = (e) => {
        console.log('aaa',e.target.value)
        setS(e.target.value)
    }
    const goResult = () => {
        console.log('hi')
        if(sss==''){
            alert('Search content can not be empty')
        }
        else{
            history.push(`/search/${sss}`);
        }
    }
    const goLetter = () => {
        history.push('/uletter');
    }
    const backHomepage = () => {
        history.push('/userHomepage')
    }

    const personal = props => (
        <Tooltip {...props}>Personal Info</Tooltip>
      );
    const notification = props => (
        <Tooltip {...props}>Notification</Tooltip>
    );
    const search = props => (
        <Tooltip {...props}>Search Now</Tooltip>
    );
    React.useEffect(()=>{
        const getLetter = async()=>{
            const response = await apiRequest('userLetter','GET');
            console.log('letter',response);
            const res=response.json();
            let num=0
            res.then((data)=>{
                console.log(data);
                for(let i=0;i<data['notification_list'].length;i++){
                    if(data['notification_list'][i]['is_read']==0){
                        num++
                    }
                    if(i==(data['notification_list'].length)-1){
                        setQ(num)
                    }
                }
            })
        }
        getLetter();
    },[])

    const goInfo = () => {
        const currentId = localStorage.getItem('currentID');
        history.push(`/UserInfo/${currentId}`);
    } 
    
    
        return (
            <>
                <header class="header-personal">
                    <div class="container-xl header-top">
                        <div class="row align-items-center">
                            <div class="col-md-6 col-sm-12 col-xs-12 text-center" onClick={backHomepage}>
                                <div class="d-block text-logo">RWT<span class="dot">.</span></div>
                                <div>A communication platform about <b>R</b>emote <b>W</b>orking <b>T</b>ools</div>
                            </div>
                            <div class="col-md-6 col-sm-12 col-xs-12">
                                <div class="header-buttons float-md mt-4 mt-md-0">
                                    <input style={{ width: 250,display: "inline-block", }}
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="input search"
                                        aria-label="Search"
                                        onChange={changeSearch}
                                    />
                                    <OverlayTrigger placement="top" overlay={search}>
                                        <button class="search icon-button" onClick={goResult} style={{marginRight:'10%'}}>
                                            <i class="icon-magnifier"></i>
                                        </button >
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={personal}>
                                        <button class="burger-menu1 icon-button ms-2 float-end float-md-none" onClick={goInfo}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                            </svg>
                                        </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={notification}>
                                    <button class="burger-menu icon-button ms-2 float-end float-md-none" onClick={goLetter}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                                        </svg>
                                        {typeof(num)=='number'?
                                            <span>{num>0?<div>/{num}</div>:null}</span>
                                        :<span>{Q==0?null:<div>/{Q}</div>}</span>
                                        }   
                                    </button>
                                    </OverlayTrigger>
                                    <div class="header-buttons float-md-end mt-4 mt-md-0">
                                        <span className="nav-link" href='#footer' onClick={goLogin}><a style={{ fontSize: "16px", color: "#6c757d" }}>LogOut &#x25ba;</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div class="post post-list-sm circle"></div>
            </>
        )
    }


    UHeader.propTypes = {
        num:PropTypes.number,
    };
    
    UHeader.defaultProps = {
        num:PropTypes.number,
    };

    export default UHeader;
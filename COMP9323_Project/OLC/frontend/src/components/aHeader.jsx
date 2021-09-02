import React from 'react';
import { useHistory } from 'react-router-dom';
import { Overlay, OverlayTrigger,Button,Tooltip } from 'react-bootstrap';
import apiRequest from '../api/api';

const AHeader = () => {
    const history = useHistory();
    const [Q,setQ]=React.useState(0);
    const goLogin=async()=>{
        console.log('hi')
        localStorage.setItem('token', "null");
        const response= await apiRequest('logout', 'GET');
        console.log('logOut',response)
        history.push('/login');
    }
    const goHomepage=()=>{
        history.push('/adminHomePage');
    }
    const goLetter=()=>{
        history.push('/adminLetter');
    }
    const notification = props => (
        <Tooltip {...props}>Report Notification</Tooltip>
    );
    React.useEffect(()=>{
        const getLetter = async()=>{
            const response = await apiRequest('adminLetter','GET');
            // const res = await response.json();
            console.log('letter',response);
            const res=response.json();
            res.then((data)=>{
                console.log(data);
                setQ(data['report_list'].length);
            })
        }
        getLetter();
    },[])
    return(
        <>
            <header class="header-personal">
                <div class="container-xl header-top">
                    <div class="row align-items-center">

                        <div class="col-4 d-none d-md-block d-lg-block">
                            
                        </div>

                        <div class="col-md-4 col-sm-12 col-xs-12 text-center">
                            <div class="d-block text-logo" onClick={goHomepage}>RWT<span class="dot">.</span></div>
                            <div>A communication platform about <b>R</b>emote <b>W</b>orking <b>T</b>ools</div>
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12">
                            <div class="header-buttons float-md mt-4 mt-md-0">
                                <OverlayTrigger placement="top" overlay={notification}>
                                    <button class="burger-menu icon-button ms-2 float-end float-md-none" onClick={goLetter}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                                        </svg>
                                        {Q==0?null:<div>/{Q}</div>}
                                    </button>
                                </OverlayTrigger>
                                <div class="header-buttons float-md-end mt-4 mt-md-0">
                                    <span className="nav-link" onClick={goLogin}><a style={{fontSize:"16px",color:"#6c757d"}}>LogOut &#x25ba;</a></span>
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

export default AHeader;
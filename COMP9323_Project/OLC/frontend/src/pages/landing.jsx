import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container,Button, Row} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import welcome from '../images/welcomeBackground.jpg'
import wave from '../images/wave.svg'
import go from '../images/go.svg'

const Landing =()=> {
    const history = useHistory();
    const goLogin=()=>{
        history.push('/login');
    };
    return (
        <div class="welcomePage">
            <section className="login-page section-b-space">
                <div className="container" style={{paddingTop:'20%',paddingBottom:'30%'}}>
                    <div className="row">
                        <div class="widget-header text-center" style={{marginBottom:20}}>
                            <span class="column col-md-12" >
                            <div class="d-block text-logo" style={{fontSize:80}}>RWT<span class="dot">.</span></div>
                            <h3 class="widget-title text-center" style={{fontSize:15}}>
                            <i>The best <b>R</b>emote <b>W</b>orking <b>T</b>ool communication platform</i>
                            </h3>
                            </span>
                        </div>
                            <button class="btn btn-default btn-full" onClick={goLogin} style={{marginTop:40}}>
                                <span className="smallText">Start Your Remote Work From Here</span>
                            </button>
                            <dic class="container" style={{marginTop:50}}>
                                <div class="widget-header text-center">
                                    <span class="column col-md-12" >
                                    <div class="d-block text-logo">Welcome to RWT<span class="dot">.</span></div>
                                </span>
                                    <img src={wave} class="wave" alt="wave" />
                                </div>
                                <div class="container">
                                    <div className="theme-card authentication-right">
                                        <h3 class="widget-title text-center" style={{fontSize:15}}>
                                        Our website is a communication platform about remote working tools<span class="text-logo">.</span><br/>
                                        Everyone is welcome to share their own experience and seek help from others<span class="text-logo">.</span><br/>
                                        We provide tutorials, q&a, and experience sharing for each individual remote working tool<span class="text-logo">.</span><br/>
                                        Special expert services are also provided, allowing you to directly connect with experts to solve your problems without wasting unnecessary time<span class="text-logo">.</span><br/>
                                        </h3>
                                    </div>
                                </div>
                            </dic>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Landing;

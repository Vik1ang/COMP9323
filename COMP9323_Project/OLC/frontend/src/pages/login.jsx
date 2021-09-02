import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';
import wave from '../images/wave.svg'
import go from '../images/go.svg'
import apiRequest from '../api/api';
import { useForm } from "react-hook-form";

const Login =()=> {
    const history = useHistory();
    const {
        register,
        handleSubmit,
      } = useForm();
    const onSubmit = async (data) => {
        const response= await apiRequest('login', 'POST',[data.name,data.password]);
        if(response.status===200){
            const res = response.json();
            res.then(
                (data)=>{
                    localStorage.setItem('token', `${data.token}`)
                    localStorage.setItem('role', `${data.role}`)
                    localStorage.setItem('user_id', `${data.user_id}`)
                    localStorage.setItem('currentID', `${data.user_id}`)
                    localStorage.setItem('isExpert', `${data.role}`)
                    localStorage.setItem('expertWaiting', `${data.expert_status}`)
                    // 0:admin 1:user  2:expert
                    if(data.role==0){
                        history.push('/adminHomepage')
                    }
                    else if (data.role==1){
                        history.push('./userHomepage')
                    }
                    else{
                        history.push('./userHomepage')
                    }
                }
            );
        }
        else{
            alert('Unmatch username/password')
        }
    };
    return (
        <div id="body">
            <section className="login-page section-b-space">
                
                <div className="container" style={{paddingTop:'5%',paddingBottom:'8%'}}>
                <div class="widget-header text-center" style={{marginBottom:100}}>
                    <span class="column col-md-12" >
                    <div class="d-block text-logo" style={{fontSize:80}}>RWT<span class="dot">.</span></div>
                    <h3 class="widget-title text-center" style={{fontSize:15}}>
                    <i>The best <b>R</b>emote <b>W</b>orking <b>T</b>ool communication platform</i>
                    </h3>
                    </span>
                </div>
                    <hr/>
                    <div className="row" style={{marginBottom:40}}>
                        <div className="col-lg-6">
                            <div class="d-block text-logo">Login<span class="dot">.</span></div>
                            <div class="container">
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="column col-md-12">
                                            <div class="form-group mt-4">
                                                <input {...register('name')} type="text" class="form-control" id="loginname" name="name" placeholder="Name" required="required" data-error="Subject is required." />
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="column col-md-12">
                                            <div class="form-group">
                                                <input {...register('password')} type="password" class="form-control" id="InputSubject" name="password" placeholder="Password" required="required" data-error="Subject is required." />
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="column col-md-6 float-sm-end">
                                            <button class="btn btn-default btn-full" type="submit" >
                                                <span className="smallText">Login</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 right-login" style={{display:'inline-block',float:'none',textalign:'left',marginright:'-4px'}}>
                        <Link to={'/signup'} style={{textDecoration: 'none'}}>
                            <dic class="container">
                                <div class="widget-header text-center">
                                    <h3 class="widget-title">New Customer</h3>
                                    <img src={wave} class="wave" alt="wave" />
                                </div>
                                <div class="container">
                                    <div className="theme-card authentication-right">
                                        <h3 class="widget-title text-center" style={{fontSize:15}}>Sign up for a free account at our website<span class="text-logo">.</span><br/>
                                        Registration is quick and easy<span class="text-logo">.</span>
                                        </h3>
                                    </div>
                                </div>
                                <div class="d-block text-logo float-md-end mt-4">REGISTER NOW<img src={go} ></img></div>
                            </dic>
                        </Link>
                        </div>
                    </div>
                <hr/>
                </div>
                <div class="widget-header text-center">
                    <span class="column col-md-12" >
                    <div class="d-block text-logo">About Us<span class="dot">.</span></div>
                    </span>
                    <img src={wave} class="wave" alt="wave" />
                </div>
                <div class="container" style={{marginBottom:30}}>
                    <div className="theme-card authentication-right">
                        <h3 class="widget-title text-center" style={{fontSize:15}}>
                        Our website is a communication platform about remote working tools<span class="text-logo">.</span><br/>
                        Everyone is welcome to share their own experience and seek help from others<span class="text-logo">.</span><br/>
                        We provide tutorials, q&a, and experience sharing for each individual remote working tool<span class="text-logo">.</span><br/>
                        Special expert services are also provided, allowing you to directly connect with experts to solve your problems without wasting unnecessary time<span class="text-logo">.</span><br/>
                        </h3>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Login;

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
    console.log('tkkk',localStorage.getItem('token'))
    const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        const response= await apiRequest('login', 'POST',[data.name,data.password]);
        if(response.status===200){
            const res = response.json();
            res.then(
                (data)=>{
                    localStorage.setItem('token', `${data.token}`)
                    localStorage.setItem('role', `${data.role}`)
                    localStorage.setItem('user_id', `${data.user_id}`)
                    console.log('loginData',data);
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
                <div className="container" style={{paddingTop:'30%',paddingBottom:'30%'}}>
                    <div className="row">
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
                </div>
            </section>
            {/* <div class="column col-md-4 float-sm-end">
                <button class="btn btn-default btn-full">
                    <span className="smallText">For admin page test</span>
                </button>
            </div> */}
        </div>
    )
};

export default Login;

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useHistory } from 'react-router-dom';
import back from '../images/back.svg'
import apiRequest from '../api/api';
import { useForm } from "react-hook-form";

const Sign =() => {
    const history = useHistory();
    const goLogin=()=>{
        history.push('/login');
    }
    const {
        register,
        handleSubmit,
      } = useForm();
    const onSubmit = async (data) => {
        const reg=new RegExp("(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*\+.~!@#$%^&*()]{8,}$")
        if(data.Rpassword!=data.RCpassword){
            alert("Unmatch password")
        }
        else if(data.Rpassword.length<8||!reg.test(data.Rpassword)){
            alert("Password does not meet requirements")
        }
        else{
            const response= await apiRequest('register', 'POST',[data.Rname,data.Rpassword]);
            if(response.status===602){
                alert("Username exists")
            }else{
                alert("Registration completed")
                history.push('/login');
            }
        }
    };
    return (
        <div id="body">
            <section className="login-page section-b-space">
                <div className="container" style={{paddingTop:'30%',paddingBottom:'30%'}}>
                    <div className="row">
                        <div className="col-lg-6" onClick={goLogin} style={{marginTop:'15%'}}>
                            <span class="d-block text-logo" ><img src={back} ></img> Back Login</span>
                        </div>
                        <div className="col-lg-6 right-login" style={{display:'inline-block',float:'none',textalign:'left',marginright:'-4px'}}>
                            <div class="d-block text-logo">Sign Up<span class="dot">.</span></div>
                            <div class="container">
                                <div className="theme-card">
                                    <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                        <div class="column col-md-12">
                                            <div class="form-group mt-4">
                                                <input {...register('Rname')} type="text" class="form-control" placeholder="Username" required="required" data-error="Subject is required." />
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="column col-md-12">
                                            <div class="form-group">
                                                <input {...register('Rpassword') } type="password" class="form-control" placeholder="Password" required="required" data-error="Subject is required." />
                                                <div class="help-block with-errors"></div>
                                                <div style={{fontSize:10}}>* At least 8 characters and must have word and digit. </div>
                                            </div>
                                        </div>
                                        <div class="column col-md-12">
                                            <div class="form-group">
                                                <input  {...register('RCpassword')} type="password" class="form-control" placeholder="Confirm Password" required="required" data-error="Subject is required." />
                                                <div class="help-block with-errors"></div>
                                            </div>
                                        </div>
                                        <div class="column col-md-6 float-sm-end">
                                            <button class="btn btn-default btn-full" >
                                                <span className="smallText" type="submit">Sign Now</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Sign;
import React, { Component, useState } from "react";
import UHeader from "../../components/uHeader";
import UFooter from '../../components/uFooter';
import "./Users/user.css";
import { getUserInfo, getMyPosts, getAnswers, getFollowAnswers,following ,unfollowing} from "../../api/request";
import PostListCard from '../../components/postList'
import AnswerListCard from '../../components/answerList'
import QuestionListCard from '../../components/questionList'
import LikeListCard from '../../components/likesList'
import creatHistory from 'history/createBrowserHistory'
import PropTypes from 'prop-types';
import apiRequest from '../../api/api'
import likeList from "../../components/likesList";
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Modify = () => {
    const history = useHistory();
    const {
      register,
      handleSubmit,
      // formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
      alert('Modify Successful')
      const id=localStorage.getItem('currentID');
      history.push(`/UserInfo/${id}`)
    };
    const backInfo = () => {
      const id=localStorage.getItem('currentID');
      history.push(`/UserInfo/${id}`)
    }

    return(
        <>
        <UHeader />

        <div className="container">


          <div className="container-xl text-centre" style={{textAlign:'center'}}>
          <div className="info-top">
            <div style={{ textAlign: "left" }}>
              <button className="burger-menu icon-button  float-end float-md-none " onClick={backInfo} >
                <span className="icon-arrow-left"></span>
              </button>
            </div>
            </div>

            <div className="text-centre" style={{textAlign:'center'}}>
            <h1>Modify Personal Information</h1>
            </div>
            <br />
            <br />
            <div className="file-img">
            <img
                src={require("./../../images/other/avatar-lg.png").default}
                alt=""
            />
            <br />
            <br />
            <div className="row" style={{marginLeft:'30%',width:'40%'}}>
                <div className="column">
                    <div class="container">
                        <div className="theme-card">
                            <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                <div class="column">
                                    Name:
                                    <div class="form-group">
                                        <input {...register('name')} type="text" class="form-control" id="InputSubject" name="duration" placeholder="Name" required="required" data-error="Subject is required." />
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="column">
                                    Email:
                                    <div class="form-group">
                                        <input {...register('email')} type="email" class="form-control" id="InputSubject" name="duration" placeholder="Email" required="required" data-error="Subject is required." />
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="column">
                                    Password:
                                    <div class="form-group">
                                        <input {...register('password')} type="password" class="form-control" id="InputSubject" name="duration" placeholder="Password" required="required" data-error="Subject is required." />
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div class="column col-md-4 float-sm-end">
                                    <button class="btn btn-default btn-full" type="submit" >
                                        <span className="smallText">Modify Now</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
          </div>
          </div>
          </div>
        <UFooter/>
      </>
    )
}

export default Modify;
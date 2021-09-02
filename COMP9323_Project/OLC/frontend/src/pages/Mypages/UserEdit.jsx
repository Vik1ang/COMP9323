
import React, { Component, useState, useEffect } from "react";
import UHeader from "../../components/uHeader";
import "./Users/user.css";
import apiRequest from '../../api/api';
import creatHistory from 'history/createBrowserHistory'
// import { useHistory } from 'react-router-dom';

import { applyExpert } from "../../api/request";

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      first_name: '',
      last_name: '',
      related_experience: "",
      personal_certificate: "",
    };
  }
  handelSubmit = (e) => {
    if (!this.state.first_name) {
      alert("please enter first_name！");
      return
    }
    if (!this.state.last_name) {
      alert("please enter first_name！");
      return
    }
    if (!this.state.related_experience) {
      alert("please enter related_experience！");
      return
    }
    // 一点提交就会刷新，阻止submit事件
    e.preventDefault();
    var form = new FormData(document.getElementById("addForm"));
    var params = {
      personal_certificate:[],
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      related_experience: this.state.related_experience,
    };
    var fileObjArray = document.getElementById("certificate").files;
    if (fileObjArray.length==0) {
      alert("please enter personal_certificate！");
      return
    }else{
      for(var i=0;i<fileObjArray.length;i++){
        const reader = new FileReader();
        reader.readAsDataURL(fileObjArray[i]);
        var that = this;
        reader.onload = function (ev) {
          // base64
          var imgFile = ev.target.result;
          params.personal_certificate.push(imgFile) ;
          that.setState({
            personal_certificate: params.personal_certificate
          });
          that.applyExpertPort(params)
        }
      }
    }

  }
  applyExpertPort(params) {
    applyExpert(params).then(
      (res) => {
        alert("Apply succussful")
        const id=localStorage.getItem("currentID")
        localStorage.setItem('expertWaiting', 0)
        this.props.history.push(`/UserInfo/${id}`);
      },
      (error) => {
        console.log("get response failed!");
      }
    );
  }
  async onSubmit(data) {
    const response = await apiRequest('apply_expert', 'POST', data);
    if (response.status === 200) {
      alert("successful！")
    }
    else {
      alert('Unmatch username/password')
    }
  }
  /**
   * firstname
   * @param {*} e 
   */
  handelFirstName = (e) => {
    this.setState({
      first_name: e.target.value
    })
  }
  /**
 * lastname
 * @param {*} e 
 */
  handelLastName = (e) => {
    this.setState({
      last_name: e.target.value
    })
  }
  /**
* related_experience输入事件
* @param {*} e 
*/
  handelRelatedExperience = (e) => {
    this.setState({
      related_experience: e.target.value
    })
  }
  handelSex = (e) => {
    this.setState({
      sex: e.target.value
    })
  }
  oncity = (e) => {
    this.setState({
      cty: e.target.value
    })
  }
  handelChecked = (key) => {
    var hobby = this.state.hobby;
    hobby[key].checked = !hobby[key].checked;

    this.setState({
      hobby: hobby

    })
  }
  handelinfo = () => {
    this.setState({
      info: this.refs.info.value
    })
  }
  /**
  * 返回上一页
  */
  back() {
    const history = creatHistory();
    history.push('./homepage');
  }
  render() {
    return (
      <div className="user-edit" >
        <UHeader />

        <div className="container-xl content">
          <div className="info-top">
            <div style={{ textAlign: "left" }}>
              <button className="burger-menu icon-button  float-end float-md-none " onClick={this.back.bind(this)} >
                <span className="icon-arrow-left"></span>
              </button>
            </div>
            <div style={{ flex: 2 }}>
              <h1>Apply to be an expert</h1>
            </div>
            <div>&nbsp; </div>
          </div>
          <br />
          <br />
          <div className="file-img">
            <img
              src={require("./../../images/other/avatar-lg.png").default}
              alt=""
            />
            <h2>{localStorage.getItem("username")}</h2>
          </div>
          <br />
          <br />
          <div className="file row">
            <form className=" search-form contact-form col-md-8 col-offset-2" onSubmit={this.handelSubmit} id="addForm" enctype="multipart/form-data" method="post">
              <div className="form-group">
                <p>first name:</p>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="input first name ..."
                  aria-label="Search"
                  value={this.state.first_name} onChange={this.handelFirstName}
                />
              </div>
              <div className="form-group">
                <p>last name:</p>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="input last name ..."
                  aria-label="Search"
                  value={this.state.last_name} onChange={this.handelLastName}
                />
              </div>
              <div className="form-group">
                <p>Related experience:</p>
                <textarea
                  class="form-control"
                  rows="4"
                  placeholder="Your related experience here..."
                  required="required"
                  data-error="Message is required."
                  value={this.state.related_experience} onChange={this.handelRelatedExperience}
                ></textarea>
              </div>
              <div className="form-group">
                <p>personal certificate:</p>
                <p className="file-text">
                  upload certificate <span className="icon-plus"></span>
                  <input id="certificate" type="file" ref={this.fileInput} multiple="multiple" />
                </p>
              </div>
              <div className="form-group">
                <button className="burger-menu icon-button  float-end float-md-none submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}
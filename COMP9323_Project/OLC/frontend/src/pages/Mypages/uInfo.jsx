import React, { Component, useState } from "react";
import UHeader from "../../components/uHeader";
import UFooter from '../../components/uFooter';
import "./Users/user.css";
import { getUserInfo, getMyPosts, getAnswers, getFollowAnswers,following ,unfollowing} from "../../api/request";
import PostListCard from '../../components/postList'
import AnswerListCard from '../../components/answerList'
import PropTypes from 'prop-types';
import apiRequest from '../../api/api'
import { useHistory } from 'react-router-dom';
import star from '../../images/star.svg'

const UserInfo = ({match}) => {
    const types = ['Tutorials', 'QnA', 'Experiences'];
    const history = useHistory();
    const id=match.params.userID;
    const [modify,setModify]=React.useState(0);
    //isExpert 0:admin,1:user,2:expert
    //expertWaiting 0:waiting,1:expert,2:nothing
    const currentId = localStorage.getItem('currentID');
    const isExpert = localStorage.getItem('isExpert');
    const expertWaiting = localStorage.getItem('expertWaiting');
    console.log('aaaEx',expertWaiting)
    const [my,setMy]=React.useState(0);
    const [post,setP] = React.useState([]);
    const [answer,setA] = React.useState([]);
    const [questions,setQ]=React.useState([]);
    const [like,setLike] =React.useState([]);
    const [show,setShow] = React.useState([1,0,0,0]);
    const [user,setUser] = React.useState([]);
    const [follow,setF] = React.useState(0);
    const [role,setR] = React.useState(0);
    const [f,sf]=React.useState(true);
    const [expertId,setExpertID] =React.useState(null);

    const getUserInfo = async()=>{
        const response = await apiRequest('getUserInfo','GET','',`?user_id=${id}`);
        const res=response.json();
        res.then((data)=>{
            console.log('c1111onetens',data);
            setUser(data)
            setF(data.is_followed)
            setR(data.role)
            setExpertID(data.expert_id)
        })
    }
    React.useEffect(()=>{
        if(currentId==id){
            setMy(1);
        }
        const getPost = async()=>{
            const response = await apiRequest('InfoP','GET','',`?user_id=${id}`);
            const res=response.json();
            res.then((data)=>{
                setP(data['post_list'])
            })
        }
        const getAnswer = async()=>{
            const response = await apiRequest('InfoA','GET','',`?user_id=${id}`);
            const res=response.json();
            res.then((data)=>{
                setA(data['answer_list'])
            })
        }
        const getQuestions = async()=>{
            const response = await apiRequest('InfoP','GET','',`?user_id=${id}&&type=1`);
            const res=response.json();
            res.then((data)=>{
                setQ(data['post_list'])
            })
        }
        const getLike = async()=>{
            const response = await apiRequest('InfoA','GET','',`?is_follow=1&user_id=${id}`);
            const res=response.json();
            res.then((data)=>{
                setLike(data['answer_list'])
            })
        }
        getUserInfo();
        getAnswer();
        getPost();
        getQuestions();
        getLike();
    },[modify])
    const showPost=()=>{
        setShow([1,0,0,0])
    }
    const showAnswer = () => {
        setShow([0,1,0,0])
    }
    const showQuestions = () => {
        setShow([0,0,1,0])
    }
    const showLike = () => {
        setShow([0,0,0,1])
    }
    const followNow = async () => {
        await apiRequest('followingU','POST',id);
        sf(!f)
        setF(!follow)
    }
    const unfollow= async () => {
        await apiRequest('unfollowingU','POST',id);
        sf(!f)
        setF(!follow)
    }
    React.useState(()=>{
        getUserInfo();
    },[f])
    const goPay = () => {
        history.push(`/pay/${id}/${expertId}`)
    }
    const applyE = () => {
        history.push('/UserEdit')
        localStorage.setItem("username", user.username)
    }
    const edit = () => {
        history.push('/InfoEdit')
    }
    const back = () =>{
      history.goBack()
    }
    const update= ()=>{
      setModify(!modify)
    }
    return(
        <>
        <UHeader />
        <div class="container">
        <div className="info-top">
            <div style={{ textAlign: "left" }}>
              <button className="burger-menu icon-button  float-end float-md-none " onClick={back} >
                <span className="icon-arrow-left"></span>
              </button>
            </div>
            </div>
        <div className="text-centre">
          <div className="container-xl text-centre" style={{textAlign:'center'}}>

                <div className="text-centre" style={{textAlign:'center'}}>
                {my==1?<h1>My Information</h1>:<h1>Personal Information</h1>}
                </div>
                <br />
                <br />
                <div className="file-img">
                <img
                    src={require("./../../images/other/avatar-lg.png").default}
                    alt=""
                    />
                    {role==2?
                    <div>
                      <div style={{textAlign:'center',color:'gold',fontSize:15}} ><img src={star} class="star" alt="star" style={{width:14}}/>Certified Expert<img src={star} class="star" alt="star" style={{width:14}}/></div>
                    </div>
                    :null}
                <div class="d-block text-logo" style={{margin:20}}>{user.username}</div>
                {my==1?
                    <div> 
                        {expertWaiting==2||expertWaiting==-1?
                        <button class="btn btn-default btn-full " style={{width:"20%",marginBottom:20,marginRight:20}} onClick={applyE}><div className="smallText">Apply for expert</div></button>
                        :
                        <div>
                          {expertWaiting==0?
                          <div style={{marginBottom:20}}>Your expert application is processing, please wait. </div>
                          :
                          null
                          }
                        </div>
                        }
                        <button class="btn btn-default btn-full " style={{width:"10%",marginBottom:20}} onClick={edit}><div className="smallText">Edit Info</div></button>
                    </div>
                :
                <div>
                    {follow==0?
                        <button class="btn btn-default btn-full " style={{width:"10%",marginBottom:20}} onClick={followNow}><div className="smallText">Follow Now</div></button>
                        :
                        <button class="btn btn-default btn-full " style={{width:"10%",marginBottom:20}} onClick={unfollow}><div className="smallText">Unfollow</div></button>
                    }
                    {role==2?
                        <button class="btn btn-default btn-full " style={{width:"10%",marginBottom:20}} onClick={goPay}><div className="smallText">Ask for help</div></button>
                        :null}
                </div>
                }
                </div>
            {/* </div> */}
            <br />
            <br />
            <div>
              <nav class=" navbar-expand-lg  my-user-nav">
                <ul class="navbar-nav mr-auto">
                  <li
                    onClick={showPost}
                  >
                    <a class="nav-link">{post.length} Post</a>
                  </li>
                  <li
                    onClick={showAnswer}
                  >
                    <a class="nav-link ">{answer.length} Answers</a>
                  </li>
                  <li
                    onClick={showQuestions}
                  >
                    <a class="nav-link ">{questions.length} Questions</a>
                  </li>
                  <li
                    onClick={showLike}
                  >
                    <a class="nav-link ">{like.length} Likes</a>
                  </li>
                </ul>
              </nav>

              <div className="conents-wrap">
                  {show[0]==1?
                  <div>
                  {post.map((item) => <PostListCard
                    title={item.title}
                    category={item.category}
                    contents={item.contents}
                    // goArticle={goArticle}
                    community={item.category}
                    time={item.create_time}
                    followingNum={item.follow_num}
                    type={types[item.type - 1]}
                    id={item.id}
                    my={my}
                    update={update}
                  />)}
                  </div>
                  :null}
                {show[1]==1?
                <div>
                  {answer.map((item) => <AnswerListCard
                    contents={item.content}
                    // goArticle={goArticle}
                    community={item.category}
                    type={types[item.type - 1]}
                    id={item.post_id}
                    time={item.create_time}
                    likeNum={item.like_num}
                    my={my}
                    update={update}
                  />)}
                  </div>
                  :null}
                {show[2]==1?
                <div>
                {questions.map((item) => <PostListCard
                    title={item.title}
                    category={item.category}
                    contents={item.contents}
                    // goArticle={goArticle}
                    community={item.category}
                    time={item.create_time}
                    followingNum={item.follow_num}
                    type={types[item.type - 1]}
                    id={item.id}
                    my={my}
                    update={update}
                />)}
                </div>
                :null}
                {show[3]==1?
                <div>
                  {like.map((item) => <AnswerListCard
                    contents={item.content}
                    // goArticle={goArticle}
                    community={item.category}
                    type={types[item.type - 1]}
                    id={item.post_id}
                    time={item.create_time}
                    likeNum={item.like_num}
                    my={my}
                    update={update}
                  />)}
                  </div>
                  :null}
              </div>
            </div>

            <br />
            <br />
            <br />
            <br />
          </div>
          <div style={{ width: "400px" }}>
            <div style={{ marginTop: "320px" }}>

            </div>
          </div>
        </div>
        </div>
        <UFooter/>
      </>
    )
}

UserInfo.propTypes = {
    match: PropTypes.objectOf(PropTypes.object),
};

UserInfo.defaultProps = {
    match: PropTypes.objectOf(PropTypes.object),
};

export default UserInfo;
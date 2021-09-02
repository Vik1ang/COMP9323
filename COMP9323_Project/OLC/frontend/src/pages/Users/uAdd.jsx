import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams, } from 'react-router-dom';
import { Form, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import UNav from '../../components/uNav';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/generalQCard';

const UAdd =()=> {    
    const {
        handleSubmit,
      } = useForm();
    const params = useParams();
    const [community, setCommunity] = useState(params.community);
    const [type, setType] = useState(params.type);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [video, setVideo] = useState(null);
    const [communities, setCommunities] = useState([]);
    const types = ['Tutorials', 'QnA', 'Experiences'];
    const typecode = types.indexOf(type) + 1;

    // const URL = "http://localhost:5000"
    const URL ='http://121.5.155.221:80';

    function getzImg(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);//data url
        reader.onload = function (e) {
          setVideo(e.target.result)
        }
        return false;
      }

    const history = useHistory();
    const goHomepage=()=>{
        history.push('/userHomePage');
    }
	const goBack=(c, t)=> {
        if (c==='General') {
            history.push('/userHomePage');
        } else {
            if (t==='Tutorials') {
                history.push(`/userTutorial/${community}`);
            }
            else if (t==='QnA') {
                history.push(`/userQnA/${community}`);
            } 
            else if (t==='Experiences') {
                history.push(`/userExperience/${community}`);
            }
            else {
                console.log('no');
            }
        }
	}

    const handleCChange = (event) => {
        setCommunity(event.target.value);
    };
    const handleTChange = (event) => {
    setType(event.target.value);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
      
    const getAllCommunities = async () => {
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/community/getAllCommunity`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              setCommunities(result.communities);
            });
          } else {
            alert('Invalid Community!');
          }
        });
    }

    useEffect(getAllCommunities, []);

    const submitPost = async () => {
        var postdata = new FormData(document.getElementById("post-form"))
        postdata.append("title", title);
        postdata.append("contents", content);
        postdata.append("category", community);
        postdata.append("type", typecode);
        postdata.append("video", video);
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/post/posting`, {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${loggedinToken}`,
          },
          contentType: false,
          processData: false,
          dataType: "text",
          body: postdata,
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              goBack(community, type);
            //   alert('Posted successfully!');
            });
          } else {
            alert('Invalid Input!');
          }
        });
      }

    return (
        <>
            <UHeader />
            <section class="main-content">
                <div className="container-xl">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="#" onClick={goHomepage}>Home</a></li>
                            {(community === 'General')
                                ?
                                null
                                :
                                <li class="breadcrumb-item"><a href="#" onClick={e => goBack(community, type)}>{type}</a></li>
                            }
                        </ol>
                    </nav>
                    <div class="row-xl">
                        {
                            (type==='QnA') 
                            ? <h3 class="widget-title text-center">Ask Your Question</h3>
                            : (type==='Tutorials') 
                                ? <h3 class="widget-title text-center">Share Your insights</h3>
                                : <h3 class="widget-title text-center">Share Your Experience</h3>
                        }
                        <div class="comment-form rounded bordered padding-30">
                            <form 
                                id="post-form" 
                                class="comment-form" 
                                method="post" 
                                onSubmit={handleSubmit(submitPost)}
                                enctype="multipart/form-data" 
                                method="post"
                                // action=""
                            >
                                <div class="messages"></div>
                                <div class="row">
                                    <div class="column col-md-6">
                                        <div class="form-group">
                                            <select 
                                                class="form-control-title" 
                                                name="chooseCommunity" 
                                                id="chooseCommunity" 
                                                placeholder="Choose Community" 
                                                required="required" 
                                                data-error="Community is required."
                                                value={community}
                                                onChange={handleCChange}
                                            >
                                                <option>General</option>
                                                {communities.map((val)=> {
                                                    if (community===val.name){
                                                        return <option value={val.name} selected>{val.name}</option>
                                                    }
                                                    return <option value={val.name}>{val.name}</option>
                                                })}
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="column col-md-6">
                                        <div class="form-group">
                                            <select
                                                class="form-control-title" 
                                                id="chooseType" 
                                                name="chooseType" 
                                                placeholder="Choose Type" 
                                                required="required" 
                                                data-error="Email is required."
                                                value={type}
                                                onChange={handleTChange}
                                            >
                                                {types.map((val)=> {
                                                    if (type===val){
                                                        return <option value={val} selected>{val}</option>
                                                    }
                                                    return <option value={val}>{val}</option>
                                                })}
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="column col-md-12">
                                        <div class="form-group">
                                            <textarea 
                                                name="InputTitle" 
                                                id="InputTitle" 
                                                class="form-control-title" 
                                                rows="1" 
                                                placeholder="Your title here..." 
                                                required="required"
                                                onChange={e => setTitle(e.target.value)}
                                                value={title}
                                            >
                                            </textarea>
                                        </div>
                                        {(type==='Tutorials')
                                            ?
                                            <div className="form-group">
                                                Upload Video Here:
                                                <br></br>
                                                <input
                                                    type="file" 
                                                    id="tut-video"
                                                    accept="video" 
                                                    placeholder="Upload"
                                                    onChange={e => setVideo(e.target.files[0])}
                                                />
                                            </div>
                                            :null
                                        }
                                        <div class="form-group">
                                            {(type === 'QnA')
                                            ?
                                            <textarea
                                                name="InputContent" 
                                                id="InputContent" 
                                                class="form-control-article" 
                                                rows="15" 
                                                placeholder="Describe Your Question..." 
                                                required="required"
                                                onChange={e => setContent(e.target.value)}
                                                value={content}
                                            >                                                
                                            </textarea>
                                            :
                                            <textarea
                                                name="InputContent" 
                                                id="InputContent" 
                                                class="form-control-article" 
                                                rows="15" 
                                                placeholder="Your Content here..." 
                                                required="required"
                                                onChange={e => setContent(e.target.value)}
                                                value={content}
                                            >                                                
                                            </textarea>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="center">
                                    <div className="container-buttons-2-center">
                                        <div className="item-buttons">
                                        <button 
                                            type="submit" 
                                            name="submit" 
                                            id="submit" 
                                            value="Submit" 
                                            class="btn btn-default"
                                        >
                                            <span className="smallText">Submit</span>
                                            
                                        </button>
                                        </div>
                                        <div className="item-buttons">
                                        <button 
                                            type="Cancel" 
                                            name="Cancel" 
                                            id="Cancel" 
                                            value="Cancel" 
                                            class="btn btn-light"
                                            onClick={e => goBack(community, type)}
                                        >
                                            Cancel
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <UFooter />
        </>
    );
}

export default UAdd;
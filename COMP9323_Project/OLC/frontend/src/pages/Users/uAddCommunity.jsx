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

const UAddCommunity =()=> {    
    const {
        handleSubmit,
      } = useForm();
    const [newCommunity, setNewCommunity] = useState('');
    const [Added, setAdded] = useState(false);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [video, setVideo] = useState(null);
    const [communities, setCommunities] = useState([]);
    const types = ['Tutorials', 'QnA', 'Experiences'];
    const typecode = types.indexOf(type) + 1;

    // const URL = "http://localhost:5000"
    const URL ='http://121.5.155.221:80';

    const history = useHistory();
    const goHomepage=()=>{
        history.push('/userHomePage');
    }

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
        const PostBody = {
          title: title,
          contents: content,
          category: newCommunity,
          type: typecode,
        };
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/post/posting`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
          body: JSON.stringify(PostBody),
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              alert('Posted successfully!');
            });
          } else {
            alert('Invalid Input!');
          }
        });
      }
      
    const addCommunity = async () => {
        const addBody = {
            community_name: newCommunity,
        };
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/community/addCommunity`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
          body: JSON.stringify(addBody),
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              setAdded(true);
              alert('Community Added successfully!');
            });
          } else if (data.status === 605) {
            alert('Community Already Exist!');
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
                        </ol>
                    </nav>
                    <div class="row-xl">
                        {Added
                            ? <h3 class="widget-title text-center">Add the First Post in {newCommunity}</h3>
                            : <h3 class="widget-title text-center">Add New Community</h3>
                        }
                        <div class="comment-form rounded bordered padding-30">
                            {!Added &&
                            <div>
                                <div className="add-community">Input New Community Name Below:</div>
                                <div class="row">
                                    <div class="column col-md-6">
                                        <div class="form-group">
                                            <input
                                                name="community" 
                                                id="community" 
                                                class="form-control-title" 
                                                rows="1" 
                                                placeholder="New community name" 
                                                required="required"
                                                list="communities"
                                                onChange={e => setNewCommunity(e.target.value)}
                                                value={newCommunity}
                                            />
                                            <datalist id="communities">
                                                <option>Exist Communities Below: </option>
                                                {communities.map((item)=>{
                                                return <option>{item.name}</option>
                                                })}
                                            </datalist>
                                            <div class="help-block with-errors"></div>
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
                                            onClick={addCommunity}
                                        >
                                            Submit
                                        </button>
                                        </div>
                                        <div className="item-buttons">
                                            <button 
                                                type="Cancel" 
                                                name="Cancel" 
                                                id="Cancel" 
                                                value="Cancel" 
                                                class="btn btn-light"
                                                onClick={goHomepage}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            {Added &&
                            <form id="comment-form" class="comment-form" method="post" onSubmit={handleSubmit(submitPost)}>
                                <div class="messages"></div>
                                <div class="row">
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
                                                <option>select a post type</option>
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
                                                     accept="video" 
                                                     placeholder="Upload"
                                                     onChange={e => setVideo(e.target.files[0])}
                                                 />
                                             </div>
                                            :null
                                        } 
                                        <div class="form-group">
                                            <textarea
                                                name="InputContent" 
                                                id="InputContent" 
                                                class="form-control-article" 
                                                rows="15" 
                                                placeholder="Your insights here..." 
                                                required="required"
                                                onChange={e => setContent(e.target.value)}
                                                value={content}
                                            >                                                
                                            </textarea>
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
                                                onClick={goHomepage}
                                            >
                                                
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <UFooter />
        </>
    );
}

export default UAddCommunity;

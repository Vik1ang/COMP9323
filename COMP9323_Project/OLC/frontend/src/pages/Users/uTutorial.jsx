import React, { useState, useEffect } from 'react';
import { useHistory, useParams, } from 'react-router-dom';
import { Radio } from 'antd';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import UNav from '../../components/uNav';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCardCommunity from '../../components/generalQCardCommunity';
import axios from 'axios';

const UTutorial =()=> {
    const params = useParams();
    const community = params.community;
    const [postList, setPostList] = useState([]);

    const loadMorePost = 6;
    const [totalPost, setTotalPost] = useState(loadMorePost);
    const [loadMore, setLoadMore] = useState(true);
    const [shownList, setShownList] = useState([]);

    const [sortBy, setSortBy] = useState("Latest");
    const sortIndex = ['follow_asc', 'Following Numbers', 'Oldest', 'Latest'];

    const onChange = e => {
      setSortBy(e.target.value);
    };

    // const URL = "http://localhost:5000"
    const URL ='http://121.5.155.221:80';

    // zoom
    const [zoom, setZoom] = useState("");
    const zoomMeeting = () => {
        const data = {
            email: "haona0619@gmail.com",
        };
        axios
            .post(`http://localhost:3444/meeting`, data)
            .then((response) => {
                let URL1 =
                    response.data.join_url.replaceAll(
                        "https//us04web.zoom.us/j/",
                        "http://localhost:9999/?"
                    ) + `?role=1?name=${zoom}`;
                window.location.replace(`${URL1}`);
            })
            .catch((err) => console.log(err));
    };
    
    const history = useHistory();
    const goHomepage=()=>{
        history.push('/userHomePage');
    }
    const goArticle=(id)=>{
        history.push(`/userArticle/${community}/Tutorials/${id}`);
    };
    const goAdd=()=>{
        history.push(`/userAdd/${community}/Tutorials`);
    };

    const getPostByCommunity = async () => {
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/post/getAllPosts?community=${community}&type=1&sort=${sortIndex.indexOf(sortBy)}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              setPostList(result.post_list);
              if (result.post_list.length > totalPost) {
                setShownList(result.post_list.slice(0, totalPost));
                setLoadMore(true);
              } else {
                setShownList(result.post_list);
                setLoadMore(false);
              }
            });
          } else {
            alert('Invalid Input!');
          }
        });
      }

      useEffect(getPostByCommunity, [sortBy, totalPost]);

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
                        <h3 class="widget-title text-center" onClick={getPostByCommunity}>{community}</h3>
                        <UNav 
                            show={[1,0,0]}
                            community={community}
                        />
                        <button class="btn btn-default btn-full" style={{marginTop:20,marginBottom:20}} onClick={goAdd}>
                            <img src={add} class="wave" alt="wave" /><span className="smallText">Add New Tutorial</span>
                        </button>
                    </div>
                    <div className="filter">
                        <span className="sort">Sort By</span>
                        <Radio.Group onChange={onChange} value={sortBy}>
                            <Radio value="Latest" defaultChecked>Latest</Radio>
                            <Radio value="Oldest">Oldest</Radio>
                            <Radio value="Following Numbers">Following Numbers</Radio>
                        </Radio.Group>
                    </div>
                    <div class="row gy-4">
                        {shownList.map((item)=> {
                            if (shownList.length !== 0) {
                                return <GeneralQCardCommunity 
                                        Title={item.title} 
                                        Date={item.update_time} 
                                        Q={item.contents} 
                                        Author={item.username}
                                        Go={goArticle}
                                        id={item.id}
                                    />
                            }
                            return <h3 class="widget-title text-center">No post Yet!</h3>
                        })}
                    </div>
                    <div class="text-center">
                        <div className="item-buttons">
                        {loadMore &&
                            <button 
                            class="btn btn-simple" 
                            onClick={e => setTotalPost(totalPost + loadMorePost)}
                            >
                            Load More
                            </button>
                        }
                        </div>
                    </div>
                </div>
            </section>
            <UFooter />
        </>
    );
}

export default UTutorial;

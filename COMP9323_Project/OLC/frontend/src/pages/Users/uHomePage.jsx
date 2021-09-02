import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/generalQCard';
import GeneralQCardHome from '../../components/generalQCardHome';
import star from '../../images/star.svg'


function DisplayAllCommunities ({ goCommunity, item }) {
    return (
      <>
          <li><a href="#" onClick={e => goCommunity(item)}>{item}</a></li>
      </>
    )
  }
  
  DisplayAllCommunities.propTypes = {
    goCommunity: PropTypes.func,
    item: PropTypes.string,
  };

const UHomePage =()=> {
    // const token=localStorage.getItem('token');
    useEffect(()=>{
      if(localStorage.getItem('token')==="null"){
        alert('Please Login');
        history.push('/login');
        return(<div></div>)
      }
    },[])
    const [communities, setCommunities] = useState([]);
    const [allcommunities, setAllCommunities] = useState([]);
    const [searchedCommunities, setSearchedCommunities] = useState([]);
    const [searched, setSearched] = useState(false);
    const [postList, setPostList] = useState([]);
    const loadMorePost = 5;
    const loadMoreCommunity = 7;
    const [totalPost, setTotalPost] = useState(loadMorePost);
    const [totalCommunities, setTotalCommunities] = useState(loadMoreCommunity);
    const [totalFPost, setTotalFPost] = useState(loadMorePost);
    const [totalFUser, setTotalFUser] = useState(loadMorePost);
    const [shownList, setShownList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);
    const [loadMore, setLoadMore] = useState(true);
    const [loadMoreFP, setLoadMoreFP] = useState(true);
    const [loadMoreFU, setLoadMoreFU] = useState(true);
    const [loadMoreC, setLoadMoreC] = useState(true);

    const [searchCommunity, setSearchCommunity] = useState('');

    // const URL = "http://localhost:5000"
    const URL ='http://121.5.155.221:80';

    const [fListLen, setfListLen] = useState(0);
    const [fUserLen, setfUserLen] = useState(0);
    useEffect((()=>{
      if(followingList.length>0){setfListLen(1);}
    }),[followingList])
    useEffect((()=>{
      if(followingUsers.length>0){
        setfUserLen(1);
      }
    }),[followingUsers])

    
    const history = useHistory();
    const goCommunity=(community)=>{
        history.push(`/userTutorial/${community}`);
    };
    const goAdd=()=>{
        history.push('/userAdd/General/QnA');
    };
    const goAddCommunity=()=>{
      history.push('/userAddCommunity');
    };
    const goArticle=(id)=>{
      history.push(`/userArticle/General/QnA/${id}`);
    };
    const goUserInfo1=(creator_id,expert_id)=>{
      localStorage.setItem("user_id1",creator_id);
      localStorage.setItem("isList",'1');
      localStorage.setItem("expert_id",expert_id);
      


      history.push("/UserInfo");
    };
    const goFollowingArticle=(followingCommunity, id)=>{
      history.push(`/userArticle/${followingCommunity}/QnA/${id}`);
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
              setAllCommunities(result.communities);
              if (result.communities.length > totalCommunities) {
                setCommunities(result.communities.slice(0, totalCommunities));
                setLoadMoreC(true);
              } else {
                setCommunities(result.communities);
                setLoadMoreC(false);
              }
            });
          } else {
            alert('Invalid Community!');
          }
        });
    }
    const searchCommunities = async () => {
      const loggedinToken = localStorage.getItem('token');
      await fetch(`${URL}/community/getAllCommunity?search=${searchCommunity}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loggedinToken}`,
        },
      }).then((data) => {
        if (data.status === 200) {
          data.json().then(result => {
            setSearchedCommunities(result.communities);
            setSearched(true);
          });
        } else {
          alert('Invalid Community!');
        }
      });
    }


      const getPostByCommunity = async () => {
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/post/getAllPosts?community=general&type=2`, {
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

      const getFollowingPost = async () => {
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/post/getAllPosts?is_follow=1`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              if (result.post_list.length > totalFPost) {
                setFollowingList(result.post_list.slice(0, totalFPost));
                setLoadMoreFP(true);
              } else {
                setFollowingList(result.post_list);
                setLoadMoreFP(false);
              }
            });
          } else {
            alert('Invalid Input!');
          }
        });
      }
      const getFollowingUsers = async () => {
        const loggedinToken = localStorage.getItem('token');
        await fetch(`${URL}/getMyFollowing`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loggedinToken}`,
          },
        }).then((data) => {
          if (data.status === 200) {
            data.json().then(result => {
              if (result.following_list.length > totalFUser) {
                setFollowingUsers(result.following_list.slice(0, totalFUser));
                setLoadMoreFU(true);
              } else {
                setFollowingUsers(result.following_list);
                setLoadMoreFU(false);
              }
            });
          } else {
            alert('Invalid Input!');
          }
        });
      }

      useEffect(getPostByCommunity, [totalPost]);
      useEffect(getAllCommunities, [totalCommunities]);
      useEffect(getFollowingPost, [totalFPost]);
      useEffect(getFollowingUsers, [totalFUser]);

      const seeExpert = () => {
        history.push('/allExpert')
      }

    return (
        <>
            <UHeader />
            <section class="main-content">
                <div className="container-xl" style={{minwidth:1500}}>
                    <div class="row gy-4">
                        <div class="col-lg-3">
                            <div class="widget rounded">
                                <div class="widget-header text-center">
                                    <h3 class="widget-title" onClick={getAllCommunities}>Communities</h3>
                                    Find more details about a specific tool
                                    (e.g. tutorials, Q&A, experience sharing)
                                    <div className="filter"><img src={wave} class="wave" alt="wave" /></div>
                                    <div class="d-flex search-form">
                                      <input 
                                        name="searchcommunity" 
                                        id="searchcommunity"
                                        list="communities"
                                        class="form-control me-2" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search"
                                        onChange={e => setSearchCommunity(e.target.value)}
                                        value={searchCommunity}
                                      />
                                      <datalist id="communities">
                                        {allcommunities.map((item)=>{
                                        return <option>{item.name}</option>
                                        })}
                                      </datalist>
                                      <button class="search icon-button" type="submit" onClick={searchCommunities}><i class="icon-magnifier"></i></button>
                                    </div>
                                </div>
                                <div class="widget-content">
                                    {(searched && searchedCommunities.length > 0)
                                      ?
                                      <ul class="list">
                                        {searchedCommunities.map((val, idx) =>
                                            <DisplayAllCommunities
                                                goCommunity={goCommunity}
                                                item={communities[idx].name}
                                            />
                                        )}
                                      </ul>
                                      : 
                                      <ul class="list">
                                        {communities.map((val, idx) =>
                                            <DisplayAllCommunities
                                                goCommunity={goCommunity}
                                                item={communities[idx].name}
                                            />
                                        )}
                                      </ul>
                                    }
                                </div>

                                {(searched && searchedCommunities.length > 0)
                                  ?
                                  <div class="text-center">
                                    <div className="item-buttons">
                                        <button 
                                          class="btn btn-simple" 
                                          onClick={e => setSearched(false)}
                                        >
                                          back
                                        </button>
                                    </div>
                                  </div>
                                  :
                                  <div class="text-center">
                                    <div className="item-buttons">
                                      {loadMoreC &&
                                        <button 
                                          class="btn btn-simple" 
                                          onClick={e => setTotalCommunities(totalCommunities + loadMoreCommunity)}
                                        >
                                          Load More
                                        </button>
                                      }
                                    </div>
                                  </div>
                                }
                                
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="row-xl">
                                <h3 class="widget-title text-center">General Questions</h3>
                                  <button class="btn btn-default btn-full" style={{marginTop:20,marginBottom:20}}>
                                    <span className="smallText" onClick={goAdd}>Add a question</span>
                                  </button>
                            </div>
                            <div class="row gy-4">
                                {shownList.map((item)=>
                                    <GeneralQCardHome 
                                    Title={item.title} 
                                    Date={item.update_time} 
                                    Q={item.contents} 
                                    Author={item.username}
                                    Go={goArticle}
                                    goUserInfo={goUserInfo1}
                                    id={item.id}
                                    creator_id={item.creator_id}
                                    expert_id={item.expert_id}
                                />
                                )}
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
          <div class="col-lg-3">
            <button class="btn btn-default btn-full" style={{marginTop:20,marginBottom:20}}>
              <span className="smallText" onClick={seeExpert}>All Experts</span>
            </button>
            <div class="widget rounded">
							<div class="widget-header text-center">
								{fListLen!=0
                  ? <h3 class="widget-title">Following Posts</h3>
                  : <h3 class="widget-title">No Following Post</h3>
                }
								<img src={wave} class="wave" alt="wave" />
							</div>
                <div class="widget-content">
                  {followingList.map(
                    (item) => 
                      <ListFollowing 
                        Title={item.title} 
                        Date={item.update_time}
                        Go={goFollowingArticle}
                        id={item.id}
                        community={item.category}
                      />
                  )}
                  <div class="text-center">
                    <div className="item-buttons">
                      {loadMoreFP &&
                        <button 
                          class="btn btn-simple" 
                          onClick={e => setTotalFPost(totalFPost + loadMorePost)}
                        >
                          Load More
                        </button>
                      }
                    </div>
                  </div>
                </div>
						</div>
            <div class="widget rounded">
							<div class="widget-header text-center">
								{fUserLen!=0
                  ? <h3 class="widget-title">Following Users</h3>
                  : <h3 class="widget-title">No Following User</h3>
                }
								<img src={wave} class="wave" alt="wave" />
							</div>
                <div class="widget-content">
                  {followingUsers.map(
                    (item) => 
                      <ListFollowing 
                        Title={item.username}
                        id={item.user_id}
                        community={'users'}
                        star={star}
                      />
                  )}
                  <div class="text-center">
                    <div className="item-buttons">
                      {loadMoreFU &&
                        <button 
                          class="btn btn-simple" 
                          onClick={e => setTotalFUser(totalFUser + loadMorePost)}
                        >
                          Load More
                        </button>
                      }
                    </div>
                  </div>
                </div>
						</div>
          </div>
                    </div>
                </div>
            </section>
            <UFooter />
        </>
    );
}

export default UHomePage;

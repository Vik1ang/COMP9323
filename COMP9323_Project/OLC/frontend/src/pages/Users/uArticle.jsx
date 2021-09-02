import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useHistory, useParams, } from 'react-router-dom';
import { Radio } from 'antd';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/generalQCard';
import GeneralQCardAnswer from '../../components/generalQCardAnswer';

import author from '../../images/other/author-sm.png'
import featured from '../../images/posts/featured-lg.jpg'
import postpic from '../../images/posts/post-lg-2.jpg'
import single from '../../images/posts/single-sm-1.jpg'
import wave from '../../images/wave.svg'
import comment1 from '../../images/other/comment-1.png'
import comment2 from '../../images/other/comment-2.png'
import comment3 from '../../images/other/comment-3.png'
// import { useHistory } from 'react-router-dom';

const UArticle =()=> {
	const history = useHistory();
	const params = useParams();
	const pid = params.Pid;
	const type = params.type;
	const community = params.community;
	const [post, setPost] = useState('');
	const [isQnA, setIsQnA] = useState(false);
	const [addAns, setAddAns] = useState(false);
	const [followed, setFollowed] = useState(false);
	const [noType, setNoType] = useState(false);
	const [answer, setAnswer] = useState('');
	const [comment, setComment] = useState('');
	const [answerList, setAnswerList] = useState([]);
	const [commentList, setCommentList] = useState([]);
	const [totalAnswers, setTotalAnswers] = useState(0);
	const [totalComments, setTotalComments] = useState(0);
	const [render, setRender] = useState(0);

	const [sortBy, setSortBy] = useState("Latest");
	const sortIndex = ['follow_asc', 'Number of Likes', 'Oldesr', 'Latest'];

	const [au,setA]=useState('');
	const goInfo = () =>{
        history.push(`/UserInfo/${au}`);
    }
	const onChange = e => {
		setSortBy(e.target.value);
	};

	// const URL = "http://localhost:5000"
	const URL ='http://121.5.155.221:80';

	useEffect((()=>{
		if (type!=='Tutorials' && type!=='QnA' && type!=='Experiences') {
			setNoType(true);
		}
	}),[])

	const {
		handleSubmit,
	} = useForm();

	// const history = useHistory();
	const goHomepage=()=>{
			history.push('/userHomePage');
	}

	const goBack=(t)=> {
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

	const getPostByID = async () => {
		const loggedinToken = localStorage.getItem('token');
		await fetch(`${URL}/post/getAllPosts?post_id=${pid}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setA(result['post_list'][0]['creator_id'])
					if (type==='QnA') {
						setIsQnA(true);
					}
					if (result.post_list[0].is_follow===1) {
						setFollowed(true);
					}
					setPost(result.post_list[0]);
				});
			} else {
				alert('get post by ID failed!');
			}
		});
	}

	const followPost = async () => {
		const loggedinToken = localStorage.getItem('token');
		const followPostBody = {
			post_id: pid,
		};
		await fetch(`${URL}/follow_post`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(followPostBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setFollowed(true);
					alert('Followed successfully!')
				});
			} else {
				alert('Follow Failed!');
			}
		});
	}

	const unfollowPost = async () => {
		const loggedinToken = localStorage.getItem('token');
		const unfollowPostBody = {
			post_id: pid,
		};
		await fetch(`${URL}/unfollow_post`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(unfollowPostBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setFollowed(false);
					alert('Unfollowed successfully!')
				});
			} else {
				alert('Unfollow Failed!');
			}
		});
	}
	const getAnswers = async () => {
		const loggedinToken = localStorage.getItem('token');
		await fetch(`${URL}/answer/get_answers?post_id=${pid}&sort=${sortIndex.indexOf(sortBy)}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setAnswerList(result.answer_list);
					setTotalAnswers(result.answer_list.length);
					setCommentList(result.answer_list);
					setTotalComments(result.answer_list.length);
				});
			} else {
				alert('get answers Failed!');
			}
		});
	}
	const getComments = async (id) => {
		const loggedinToken = localStorage.getItem('token');
		await fetch(`${URL}/comment/get_comments?answer_id=${id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					console.log('get comments Successed!')
				});
			} else {
				alert('get comments Failed!');
			}
		});
	}

	const likeAnswer = async (id) => {
		const loggedinToken = localStorage.getItem('token');
		const followPostBody = {
			answer_id: id,
		};
		await fetch(`${URL}/answer/follow_answer`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(followPostBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setRender(render + 1);
					// alert('Followed successfully!')
				});
			} else {
				alert('Like Failed!');
			}
		});
	}
	const unlikeAnswer = async (id) => {
		const loggedinToken = localStorage.getItem('token');
		const unfollowPostBody = {
			answer_id: id,
		};
		await fetch(`${URL}/answer/unfollow_answer`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(unfollowPostBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					setRender(render + 1);
					// alert('Followed successfully!')
				});
			} else {
				alert('Unlike Failed!');
			}
		});
	}

	const postAnswers = async () => {
		const loggedinToken = localStorage.getItem('token');
		const AnswerBody = {
			post_id: pid,
			content: answer,
		};
		await fetch(`${URL}/answer/post_answer`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(AnswerBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					alert('Answered Successfully!');
					setRender(render + 1);
					setAddAns(false);
				});
			} else {
				alert('Answer Failed!');
			}
		});
	}

	const postComments = async () => {
		const loggedinToken = localStorage.getItem('token');
		const CommentBody = {
			post_id: pid,
			content: comment,
		};
		await fetch(`${URL}/answer/post_answer`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(CommentBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					alert('Commented Successfully!');
					setRender(render + 1);
				});
			} else {
				alert('Comment Failed!');
			}
		});
	}

	const Report = async (uuid) => {
		const loggedinToken = localStorage.getItem('token');
		const reportBody = {
			post_uuid: uuid,
		};
		await fetch(`${URL}/user/admit_report`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${loggedinToken}`,
			},
			body: JSON.stringify(reportBody),
		}).then((data) => {
			if (data.status === 200) {
				data.json().then(result => {
					alert('Reported Successfully!');
				});
			} else {
				alert('Report Failed!');
			}
		});
	}
    const goUserInfo1=(user_id)=>{
		localStorage.setItem("user_id1",user_id);
		localStorage.setItem("isList",'1');
		history.push("/UserInfo");
	};

	useEffect(getPostByID, [followed]);
	useEffect(getAnswers, [render, sortBy]);
	// useEffect(getComments, [render]);
	return (
			<>
					<UHeader />
					<section class="main-content mt-3">
							<div className="container-xl">
									<nav aria-label="breadcrumb">
											<ol class="breadcrumb">
													<li class="breadcrumb-item"><a href="#" onClick={goHomepage}>Home</a></li>
													{
														(!noType && community !== 'General') 
														? <li class="breadcrumb-item">
																<a href="#" onClick={e => goBack(type)}>{type}</a>
															</li>
														: null
													}
											</ol>
									</nav>
									<div class="post post-single">
					<div class="post-header">
						<h1 class="title mt-0 mb-3">{post.title}</h1>
						<ul class="meta list-inline mb-0">
							<li class="list-inline-item" onClick={goInfo}><a href="#"><img src={author} class="author" alt="author"/>{post.username}</a></li>
							<li class="list-inline-item">{post.update_time}</li>
						</ul>
					</div>
					<div class="post-content clearfix">
						<div>
								{(type==='Tutorials' && post.video && post.video.length > 0)
									? <video width="540px" src={post.video} controls></video>
									:null 
								}
						</div>
						<p>
							{post.contents}
						</p>
						{isQnA
							?
							<div className="container-buttons-2">
								<div className="item-buttons">
									{followed ?
										<button 
											name="Follow" 
											id="Follow" 
											value="Follow" 
											class="btn btn-default" 
											onClick={unfollowPost}
										>

											Unfollow the Question
										</button>
										:
										<button 
											name="Follow" 
											id="Follow" 
											value="Follow" 
											class="btn btn-default" 
											onClick={followPost}
										>
											<span className="smallText">Follow the Question</span>
											
										</button>
									}
								</div>
								<div className="item-buttons">
									{addAns ?
										<button 
											name="Answer" 
											id="Answer" 
											value="Answer" 
											class="btn btn-answer"
											onClick={e => setAddAns(true)}
											disabled
										>
											Answer the Question
										</button> 
										:
										<button 
										name="Answer" 
										id="Answer" 
										value="Answer" 
										class="btn btn-answer"
										onClick={e => setAddAns(true)}
									>
										Answer the Question
									</button>
									}
								</div>
							</div>
							:
							<div>
								{followed 
									?
									<div classname="border-test" onClick={unfollowPost}>
										<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
										<FavoriteIcon></FavoriteIcon> ({post.follow_num})
									</div>
									:
									<div onClick={followPost}>
										<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
										<FavoriteBorderIcon></FavoriteBorderIcon> ({post.follow_num})
									</div>
								}
							</div>
						}
						{addAns &&
							<div class="comment-form rounded bordered padding-30">
								<form 
									id="comment-form" 
									class="comment-form" 
									method="post" 
									onSubmit={handleSubmit(postAnswers)}
								>
						
									<div class="messages"></div>
									
									<div class="row">
										<div class="column col-md-12">
											<div class="form-group">
												<textarea 
													name="InputComment" 
													id="InputComment" 
													class="form-control" 
													rows="4" 
													placeholder="Your answer here..." 
													required="required"
													onChange={e => setAnswer(e.target.value)}
													value={answer}
												>
												</textarea>
											</div>
										</div>
									</div>
									<div className="container-buttons-2">
										<div className="item-buttons"><button type="submit" name="submit" id="submit" value="Submit" class="btn btn-default">
											<span className="smallText">Submit</span>
										</button></div>
										<div className="item-buttons">
											<button 
												type="submit" 
												name="submit" 
												id="submit" 
												value="Submit" 
												class="btn btn-light"
												onClick={e => setAddAns(false)}
											>
												Cancel
											</button>
										</div>
									</div>
								</form>
							</div>
						}
					</div>
					<div class="post-bottom">
						<div class="row d-flex align-items-center">
							<div class="col-md-6 col-12 text-center text-md-start">
							</div>
							<div class="col-md-6 col-12">
								<ul class="social-icons list-unstyled list-inline mb-0 float-md-end">
									{/* <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
									<li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
									<li class="list-inline-item"><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
									<li class="list-inline-item"><a href="#"><i class="fab fa-pinterest"></i></a></li>
									<li class="list-inline-item"><a href="#"><i class="fab fa-telegram-plane"></i></a></li>
									<li class="list-inline-item"><a href="#"><i class="far fa-envelope"></i></a></li> */}
								</ul>
							</div>
						</div>
					</div>

									</div>

									<div class="spacer" data-height="50"></div>

				<div class="section-header">
					{
						isQnA ? <h3 className="section-title">Answers ({totalAnswers})</h3> 
						: <h3 className="section-title">Comments ({totalComments})</h3>
					}
					<img src={wave} class="wave" alt="wave" />
				</div>
				<div>
					Sort By
				</div>
				<Radio.Group onChange={onChange} value={sortBy}>
					<Radio value="Latest" defaultChecked>Latest</Radio>
					<Radio value="Oldest">Oldest</Radio>
					<Radio value="Number of Likes">Number of Likes</Radio>
				</Radio.Group>
				{
					isQnA ? 
					<div class="comments bordered padding-30 rounded">
						<ul class="comments">
						{answerList.map((item)=>
								<GeneralQCardAnswer
										Date={item.update_time} 
										Q={item.content} 
										Author={item.username}
										like={likeAnswer}
										unlike={unlikeAnswer}
										id={item.answer_id}
										is_liked={item.is_follow}
										report={Report}
										uuid={item.post_uuid}
										goUserInfo={goUserInfo1}
										user_id={item.user_id}
										nbOfLikes={item.like_num}
								/>
						)}
						</ul>
					</div>
					: 
					<div class="comments bordered padding-30 rounded">
						<ul class="comments">
						{commentList.map((item)=>
								<GeneralQCardAnswer
										Date={item.update_time} 
										Q={item.content} 
										Author={item.username}
										report={Report}
										uuid={item.post_uuid}
										goUserInfo={goUserInfo1}
										user_id={item.user_id}
										// Go={goArticle}
										// id={item.id}
										like={likeAnswer}
										unlike={unlikeAnswer}
										id={item.answer_id}
										is_liked={item.is_follow}
										uuid={item.post_uuid}
										nbOfLikes={item.like_num}
								/>
						)}
						</ul>
					</div>
				}
				{!isQnA &&
					<div>
						<div class="spacer" data-height="50"></div>
						<div class="section-header">
							<h3 class="section-title"><div className="section-header-top">Leave Comment</div></h3>
							<img src={wave} class="wave" alt="wave" />
						</div>
						<div class="comment-form rounded bordered padding-30">
							<form 
								id="comment-form" 
								class="comment-form" 
								method="post" 
								onSubmit={handleSubmit(postComments)}
							>					
								<div class="messages"></div>								
									<div class="row">
										<div class="column col-md-12">
											<div class="form-group">
												<textarea 
													name="InputComment" 
													id="InputComment" 
													class="form-control" 
													rows="4" 
													placeholder="Your comment here..." 
													required="required"
													onChange={e => setComment(e.target.value)}
													value={comment}
												>
												</textarea>
										</div>
									</div>
								</div>
								<button type="submit" name="submit" id="submit" value="Submit" class="btn btn-default"><span className="smallText">Submit</span></button>
							</form>
						</div>
					</div>
				}
									
							</div>
					</section>
					<UFooter />
			</>
	);
}

export default UArticle;
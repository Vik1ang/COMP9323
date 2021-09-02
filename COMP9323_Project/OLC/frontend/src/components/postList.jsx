import React from 'react';
import PropTypes from 'prop-types';
import { following } from '../api/request';
import { useHistory } from 'react-router-dom';
import apiRequest from '../api/api'
// import PropTypes from 'prop-types/prop-types';

const PostList = (props) =>  {
    const {title,category,contents,community,type,id,followingNum,time,my,update}=props
    const history = useHistory();
    const goArticle = () => {
        console.log('ss')
        history.push(`/userArticle/${community}/${type}/${id}`);
      };
      const deleteP = async() => {
        const response= await apiRequest('deleteOwnPost', 'POST',id);
        if(response.status===200){
            alert('Delete Successful')
            update();
        }
      }
    return (
        <div style={{height:"300px"}}>
          <div class="post post-grid rounded bordered">
              <div class="details" style={{height:"250px", overflow:"auto"}}>
                  <ul class="meta list-inline mb-0">
                      <li class="list-inline-item">{category}</li>
                      <li class="list-inline-item">{time}</li>
                  </ul>
                  <h5 class="post-title mb-3 mt-3" onClick={goArticle}>{title}</h5>
                  <p class="excerpt mb-0">{contents}</p>
          {my==1?
          <button class="btn btn-default btn-full " style={{width:"20%",marginTop:20,marginRight:20}} onClick={deleteP}><div className="smallText">Delete</div></button>
          :null}
              </div>
              <div class="post-bottom clearfix d-flex align-items-center">Following Number: {followingNum}</div>
          </div>
      </div>
    )
}
PostList.propTypes = {
    title:PropTypes.string,
    category:PropTypes.string,
    contents:PropTypes.string,
    goArticle:PropTypes.func,
    update:PropTypes.func,
    type:PropTypes.string,
    id:PropTypes.number,
    time:PropTypes.string,
    followingNum:PropTypes.number,
    my:PropTypes.number,
};

PostList.defaultProps = {
    title:PropTypes.string,
    category:PropTypes.string,
    contents:PropTypes.string,
    goArticle:PropTypes.func,
    update:PropTypes.func,
    type:PropTypes.string,
    id:PropTypes.number,
    time:PropTypes.string,
    followingNum:PropTypes.number,
    my:PropTypes.number,
};

export default PostList;
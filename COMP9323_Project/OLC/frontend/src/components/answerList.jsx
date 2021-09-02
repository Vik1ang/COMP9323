import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import apiRequest from '../api/api'

const AnswerList = (props) =>  {
    const history = useHistory();
    const {title,category,contents,community,type,id,time,likeNum,my,update}=props
    const deleteP = async() => {
        const response= await apiRequest('deleteOwnPost', 'POST',id);
        if(response.status===200){
            alert('Delete Successful')
            update();
        }
    }
    const goArticle = () => {
      history.push(`/userArticle/${community}/${type}/${id}`);
    };
    
    return (
        <div style={{height:"250px"}} >
            <div class="post post-grid rounded bordered" >
                <div class="details" style={{height:"200px", overflow:"auto"}} onClick={goArticle}>
                    <ul class="meta list-inline mb-0">
                        <li class="list-inline-item">{time}</li>
                        <li class="list-inline-item">Liked Number: {likeNum}</li>
                    </ul>
                    <h5 class="post-title mb-3 mt-3">{contents}</h5>
                </div>
            {my==1?
          <button class="btn btn-default btn-full " style={{width:"20%",marginBottom:20,marginRight:20}} onClick={deleteP}><div className="smallText">Delete</div></button>
          :null}
            </div>
        </div>
    )
}
AnswerList.propTypes = {
    contents:PropTypes.string,
    community:PropTypes.string,
    type:PropTypes.string,
    id:PropTypes.number,
    likeNum:PropTypes.number,
    time:PropTypes.string,
    my:PropTypes.number,
    update:PropTypes.func,
};

AnswerList.defaultProps = {
    contents:PropTypes.string,
    community:PropTypes.string,
    type:PropTypes.string,
    id:PropTypes.number,
    likeNum:PropTypes.number,
    time:PropTypes.string,
    my:PropTypes.number,
    update:PropTypes.func,
};

export default AnswerList;
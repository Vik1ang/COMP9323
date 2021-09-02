import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../api/api'
import { useHistory } from 'react-router-dom';

const GeneralQCard = (props) =>  {
    const history = useHistory();
    const {Author,Q,Title,Date,Go,id,update,popSearchResult}=props
    const deletePost = async() =>{
        console.log('delete',id)
        const response = await apiRequest('adminDeletePost','POST',id);
        console.log('1111delete',response);
        update();
        popSearchResult();
    }
    return (
        <div class="col-sm-6" style={{height:"300px"}}>
                <div class="details" style={{height:"250px", overflow:"auto"}}>
                    <ul class="meta list-inline mb-0">
                        <li class="list-inline-item">{Author}</li>
                        <li class="list-inline-item">{Date}</li>
                    </ul>
                        <button class="btn btn-default float-sm-end" onClick={deletePost}><div class="smallText">Delete</div></button>
                    <h5 class="post-title mb-3 mt-3">{Title}</h5>
                    <p class="excerpt mb-0">{Q}</p>
                </div>
                <div class="post-bottom clearfix d-flex align-items-center">Post ID:  {id}</div>
        </div>
    )
}

GeneralQCard.propTypes = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    id:PropTypes.string,
    Go:PropTypes.func,
    update: PropTypes.func,
    popSearchResult: PropTypes.func,
    // id:PropTypes.number,
};

GeneralQCard.defaultProps = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    id:PropTypes.string,
    Go:PropTypes.func,
    update: PropTypes.func,
    popSearchResult: PropTypes.func,
    // id:PropTypes.number,
};

export default GeneralQCard;
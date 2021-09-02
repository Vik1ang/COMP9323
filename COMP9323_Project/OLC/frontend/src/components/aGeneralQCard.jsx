import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../api/api'
import { useHistory } from 'react-router-dom';

const GeneralQCard = (props) =>  {
    const history = useHistory();
    const {Author,Q,Title,Date,Go,id,update,popSearchResult,status,header}=props
    console.log('hhhh',id)
    const deletePost = async() =>{
        console.log('delete',id)
        const response = await apiRequest('adminDeletePost','POST',id);
        update();
        if(status==1){popSearchResult()};
    }
    
    return (
        <div class="col-sm-6" style={{height:"300px"}}>
            <div class="post post-grid rounded bordered">
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
    status:PropTypes.number,
    header:PropTypes.number,
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
    status:PropTypes.number,
    header:PropTypes.number,
};

export default GeneralQCard;
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const GeneralQCardCommunity = (props) =>  {
    const history = useHistory();
    const {Author,Q,Title,Date,Go,id}=props
    const goInfo = () =>{
        history.push(`/UserInfo/${id}`);
        console.log('c11',id)
    }
    return (
        <div class="col-sm-6">
        <div class="post post-grid rounded bordered">
            <div class="details">
                <ul class="meta list-inline mb-0">
                    <li class="list-inline-item" onClick={goInfo}><a href="#">{Author}</a></li>
                    <li class="list-inline-item">{Date}</li>
                </ul>
                <h5 class="post-title mb-3 mt-3" onClick={e => Go(id)}><a href="#">{Title}</a></h5>
                <p class="excerpt mb-0"><div className="ellipsis">{Q}</div></p>
            </div>
            <div class="post-bottom clearfix d-flex align-items-center"></div>
        </div>
    </div>
    )
}

GeneralQCardCommunity.propTypes = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    id:PropTypes.number,
};

GeneralQCardCommunity.defaultProps = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    id:PropTypes.number,
};

export default GeneralQCardCommunity;
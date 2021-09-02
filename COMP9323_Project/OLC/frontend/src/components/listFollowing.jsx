import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ListFollowing = (props) =>  {
    const {Title,Date,Go,id,community, star}=props
    const history = useHistory();
    const goInfo = () =>{
        history.push(`/UserInfo/${id}`);
    }
    console.log('c',id)
    return (
        <div class="post post-list-sm circle">
            {community=='users'?
            <h6 class="post-title my-0"><a href="#" onClick={goInfo}>{Title}<img src={star} class="star" alt="star" style={{width:14}}/></a></h6>
            :
            <h6 class="post-title my-0"><a href="#" onClick={e => Go(community,id)}>{Title}</a ></h6>}
            <ul class="meta list-inline mt-1 mb-0">
                <li class="list-inline-item">{Date}</li>
            </ul>
        </div>
    )
}

ListFollowing.propTypes = {
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    id:PropTypes.number,
    community:PropTypes.string,
};

ListFollowing.defaultProps = {
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    id:PropTypes.number,
    community:PropTypes.string,
};

export default ListFollowing;
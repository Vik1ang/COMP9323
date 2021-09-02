import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const GeneralQCardHome = (props) =>  {
    const history = useHistory();

    const {Author,Q,Title,Date,Go,goUserInfo,id,creator_id,expert_id,song,community,type}=props;
    const goAddCommunity=()=>{
        history.push('/UserInfo');
    };
    const goInfo = () =>{
        history.push(`/UserInfo/${creator_id}`);
        console.log('c',creator_id)
    }
    const goArticle=()=>{
        history.push(`/userArticle/${community}/${type}/${id}`);
    };
    return (
        <div class="padding-30 rounded bordered">
            <div class="post post-list">
                    <ul class="meta list-inline mb-3">
                        <li class="list-inline-item">
                            <a href="#" onClick={goInfo}>
                            {Author}
                            </a>
                        </li>
                        <li class="list-inline-item">{Date}</li>
                    </ul>
                    {song==1?<h5 class="post-title"><a href="#" onClick={goArticle}>{Title}</a></h5>
                    :
                    <h5 class="post-title"><a href="#" onClick={e => Go(id)}>{Title}</a></h5>}
                    <p class="excerpt mb-0"><div className="ellipsis">{Q}</div></p>
            </div>
		</div>
    )
}

GeneralQCardHome.propTypes = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    goUserInfo:PropTypes.func,
    id:PropTypes.number,
    creator_id:PropTypes.number,
    expert_id:PropTypes.number,
    song:PropTypes.number,
    community:PropTypes.string,
    type:PropTypes.number,
};

GeneralQCardHome.defaultProps = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Title:PropTypes.string,
    Date:PropTypes.string,
    Go:PropTypes.func,
    goUserInfo:PropTypes.func,
    id:PropTypes.number,
    creator_id:PropTypes.number,
    expert_id:PropTypes.number,
    song:PropTypes.number,
    community:PropTypes.string,
    type:PropTypes.number,

};

export default GeneralQCardHome;
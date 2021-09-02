import React from 'react';
import PropTypes from 'prop-types';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import comment2 from '../images/other/comment-2.png'
import { useHistory } from 'react-router-dom';

const GeneralQCardAnswer = (props) =>  {
    const history = useHistory();
    console.log(props)
    const {Author,Q,Date,like,unlike,report,id,is_liked,uuid,goUserInfo,user_id,nbOfLikes}=props
    const goInfo = () =>{
        history.push(`/UserInfo/${user_id}`);
        console.log('c',user_id)
    }
    return (
        <li class="comment rounded">
            <div class="thumb">
                <img src={comment2} alt="John Doe" />
            </div>
            <div class="details">
                <h4 class="name"><a href="#" onClick={goInfo}>{Author}</a></h4>
                <span class="date">{Date}</span>
                <p>{Q}</p>
                <ul class="meta list-inline mb-0">
                    {
                        is_liked 
                        ? <li class="list-inline-item border-test" onClick={() => unlike(id)}>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                            <FavoriteIcon></FavoriteIcon> ({nbOfLikes})
                          </li>
                        : <li class="list-inline-item" onClick={() => like(id)}>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                            <FavoriteBorderIcon></FavoriteBorderIcon> ({nbOfLikes})
                          </li>
                    }
                </ul>
                <a href="#" class="btn btn-default btn-sm" onClick={()=>report(uuid)}><span className="smallText">Report</span></a>
            </div>
        </li>
    )
}

GeneralQCardAnswer.propTypes = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Date:PropTypes.string,
    like:PropTypes.func,
    unlike:PropTypes.func,
    report:PropTypes.func,
    id:PropTypes.number,
    is_liked:PropTypes.bool,
    uuid:PropTypes.string,
    goUserInfo:PropTypes.func,
    user_id:PropTypes.number,
    nbOfLikes:PropTypes.number,
};

GeneralQCardAnswer.defaultProps = {
    Q:PropTypes.string,
    Author:PropTypes.string,
    Date:PropTypes.string,
    like:PropTypes.func,
    unlike:PropTypes.func,
    report:PropTypes.func,
    id:PropTypes.number,
    is_liked:PropTypes.bool,
    uuid:PropTypes.string,
    goUserInfo:PropTypes.func,
    user_id:PropTypes.number,
    nbOfLikes:PropTypes.number,
};

export default GeneralQCardAnswer;
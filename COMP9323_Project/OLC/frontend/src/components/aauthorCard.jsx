import React from 'react';
import PropTypes from 'prop-types';
import pic from '../images/posts/editor-sm-3.jpg'
import wave from '../images/wave.svg'
import { useHistory } from 'react-router-dom';

const AAuthorCard = (props) =>  {
    const history = useHistory();
    const {Author,img,id,user}=props
    const goInfo = () => {
        if(user==0){
            history.push(`/adminInfo/expert/${id}`);
        }else{
            history.push(`/UserInfo/${id}`);
        }
    }
    return (
        <div class="col-sm-4" onClick={goInfo}>
            <div class="post post-grid rounded bordered text-center">
                <img src={pic} className="text-center mt-4"></img>
                <div><img src={wave} class="wave" alt="wave" /></div>
                    <ul class="meta list-inline mb-0">
                        <h5 class="post-title mb-0 mt-2">{Author}</h5>
                        <li class="list-inline-item mb-4">{id}</li>
                    </ul>
            </div>
        </div>
    )
}

AAuthorCard.propTypes = {
    img:PropTypes.string,
    Author:PropTypes.string,
    id:PropTypes.string,
    user:PropTypes.number,
};

AAuthorCard.defaultProps = {
    img:PropTypes.string,
    Author:PropTypes.string,
    id:PropTypes.string,
    user:PropTypes.number,
};

export default AAuthorCard;
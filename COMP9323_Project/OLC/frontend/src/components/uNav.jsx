import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const UNav = (props) => {
    const {show, community}=props;
    const history = useHistory();
    const goTut=()=>{
        history.push(`/userTutorial/${community}`);
    };
    const goQnA=()=>{
        history.push(`/userQnA/${community}`);
    };
    const goExperience=()=>{
        history.push(`/userExperience/${community}`);
    };
    return(
        <>
            <div>
                <nav class="navbar navbar-expand-lg justify-content-center">
                    <ul class="navbar-nav mr-auto">
                        <li class={show[0]?"nav-item active":"nav-item"} onClick={goTut}>
                            <div class="nav-link">Tutorials</div>
                        </li>
                        <li class={show[1]?"nav-item dropdown active":"nav-item dropdown"}>
							<a class="nav-link" onClick={goQnA}>Q & A</a>
						</li>
                        <li class={show[2]?"nav-item dropdown active":"nav-item dropdown"} onClick={goExperience}>
							<a class="nav-link">Experiences</a>
						</li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

UNav.propTypes = {
    show:PropTypes.array,
};

UNav.defaultProps = {
    show:PropTypes.array,
};

export default UNav;
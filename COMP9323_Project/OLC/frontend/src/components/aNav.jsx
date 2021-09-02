import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const ANav = (props) => {
    const {show}=props;
    const history = useHistory();
    const goHome=()=>{
        history.push('/adminHomePage');
    }
    const goExpert=()=>{
        history.push('/adminExpert');
    }
    const goOrder=()=>{
        history.push('/adminExpertOrders');
    }
    const goApplication=()=>{
        history.push('/adminExpertApplications');
    }
    const goData=()=>{
        history.push('/adminData');
    }
    return(
        <>
            <div>
                <nav class="navbar navbar-expand-lg justify-content-center">
                    <ul class="navbar-nav mr-auto">
                        {/* <li class="nav-item active"> */}
                        <li class={show[0]?"nav-item active":"nav-item"} onClick={goHome}>
                            <div class="nav-link">Home</div>
                        </li>
                        <li class={show[1]?"nav-item dropdown active":"nav-item dropdown"}>
							<a class="nav-link dropdown-toggle" onClick={goExpert}>Expert</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" style={{color:"#79889e",backgroundColor:"white"}} onClick={goExpert}>All experts</a></li>
								<li><a class="dropdown-item" style={{color:"#79889e",backgroundColor:"white"}} onClick={goOrder}>Expert orders</a></li>
								<li><a class="dropdown-item" style={{color:"#79889e",backgroundColor:"white"}} onClick={goApplication}>Expert Applications</a></li>
							</ul>
						</li>
                        <li class={show[2]?"nav-item dropdown active":"nav-item dropdown"} onClick={goData}>
                            <div class="nav-link">Data</div>
						</li>
                    </ul>
                </nav>
            </div>

        </>
    )
}

ANav.propTypes = {
    show:PropTypes.array,
};

ANav.defaultProps = {
    show:PropTypes.array,
};

export default ANav;
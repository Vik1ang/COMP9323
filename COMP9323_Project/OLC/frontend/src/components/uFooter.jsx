import React, {Component} from 'react';

class FooterFour extends Component {

    render () {

        return (
            <footer className="section-b-space darker-layout float-md-end">
                <div class="post post-list-sm circle"></div>
                <p class="d-block text-logo"> Start your remote work from here</p>
                <div>
                    <ul class="social-icons list-unstyled list-inline mb-0" style={{marginLeft:"64%"}}>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-instagram"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-pinterest"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-medium"></i></a></li>
                        <li class="list-inline-item"><a href="#"><i class="fab fa-youtube"></i></a></li>
                    </ul>
                </div>
                <div className="float-md-end"><i className="fa fa-copyright " aria-hidden="true"></i> 2021 Made for COMP9323</div>
            </footer>
        )
    }
}

export default FooterFour;
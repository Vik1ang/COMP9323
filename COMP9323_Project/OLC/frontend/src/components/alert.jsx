import React from 'react';
import PropTypes from 'prop-types';

const ALERT = (props) =>  {
    const {title,content,close,next,show}=props
    return (
        <>
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    {content}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"><div class="smallText">{next}</div></button>
                    {show==1?<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{close}</button>:null}
                </div>
                </div>
            </div>
        </>
    )
}

ALERT.propTypes = {
    title:PropTypes.string,
    content:PropTypes.string,
    close:PropTypes.string,
    next:PropTypes.string,
    show:PropTypes.number,
};

ALERT.defaultProps = {
    title:PropTypes.string,
    content:PropTypes.string,
    close:PropTypes.string,
    next:PropTypes.string,
    show:PropTypes.number,
};

export default ALERT;
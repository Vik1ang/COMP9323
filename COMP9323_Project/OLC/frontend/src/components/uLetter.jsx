import React from 'react';
import PropTypes from 'prop-types';
import apiRequest from '../api/api';

const ULetterCard = (props) =>  {
    // const history = useHistory();
    const {date,title,content,id,read,orderid,newLetter,type,linka}=props
    const [reason,setR]=React.useState(false);
    const [showR,setSR]=React.useState(''); //reasonDetail
    console.log('hahahType',type)
    const deletePost = async() =>{
        console.log('delete',date,content,id)
        await apiRequest('readUserLetter','POST',id);
        newLetter();
    }
    const refuse= () => {
        setR(true)
    }
    const yes = async() => {
        await apiRequest('dealAppointment','POST',[1,orderid,'link123455','']);
        deletePost();
    }
    const reasonValue = (e) => {
        setSR(e.target.value)
    }
    const back = () =>{
        setR(false)
    }
    const refuseNow = async() =>{
        await apiRequest('dealAppointment','POST',[2,orderid,'',showR]);
        deletePost();
    }

    return (
        <div class="col-sm-6" style={{height:"300px"}}>
            {read==0?
                <div class="post post-grid rounded bordered">
                    <div class="details" style={{height:"250px", overflow:"auto"}}>
                        <ul class="meta list-inline mb-0">
                            <li class="list-inline-item">{date}</li>
                        </ul>
                        <h5 class="post-title mb-3 mt-3">{title}</h5>
                        <p class="excerpt mb-0">{content}</p>
                        {linka?
                        <div style={{marginLeft:30}}>
                        <a href={linka}>Click here to Zoom</a>
                        </div>
                        :null
                        }
                        {type==1?
                            <div>
                            {reason?
                                <div>
                                    <input class="form-control" type="text" placeholder="Please type the reason for rejection" style={{display:"inline-flex",margin:20}} required="required" onChange={reasonValue} />
                                    <button class="btn btn-default float-sm-end" onClick={refuseNow} ><div class="smallText">Refuse Now</div></button>
                                    <button class="btn btn-default float-sm-end" onClick={back} ><div class="smallText">Back</div></button>
                                </div>
                                :
                                <div>
                                    <button class="btn btn-default float-sm-end" onClick={refuse} ><div class="smallText">Refuse</div></button>
                                    <button class="btn btn-default float-sm-end" onClick={yes} style={{marginRight:20}}><div class="smallText">Confirm</div></button>
                                </div>
                            }
                            </div>
                            :
                            <div>
                                <button class="btn btn-default float-sm-end" onClick={deletePost}><div class="smallText">Delete</div></button>
                            </div>
                        }
                    </div>
                </div>
            :null}
        </div>
    )
}

ULetterCard.propTypes = {
    date:PropTypes.number,
    title:PropTypes.number,
    content:PropTypes.number,
    id:PropTypes.number,
    read:PropTypes.number,
    orderid:PropTypes.number,
    newLetter:PropTypes.func,
    type:PropTypes.number,
    linka:PropTypes.string,
};

ULetterCard.defaultProps = {
    date:PropTypes.number,
    title:PropTypes.number,
    content:PropTypes.number,
    id:PropTypes.number,
    read:PropTypes.number,
    orderid:PropTypes.number,
    newLetter:PropTypes.func,
    type:PropTypes.number,
    linka:PropTypes.string,
};

export default ULetterCard;
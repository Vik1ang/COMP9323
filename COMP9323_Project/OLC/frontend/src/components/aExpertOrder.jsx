import React from 'react';
import PropTypes from 'prop-types';
import pic from '../images/posts/editor-sm-3.jpg'
import wave from '../images/wave.svg'
import { useHistory } from 'react-router-dom';

const AEO = (props) =>  {
    const {id,time,user,expert,duration,price,status,show}=props
    const [S,setS]=React.useState('');
    const history = useHistory();
    React.useEffect(()=>{
        console.log('refresh')
        const getStatus = async () => {
            console.log('time!!!!',time)
            //application
            if(show[8]==1){
                console.log('111111',status)
                if(status==0){setS('Processing')}
                else if(status==1){setS('Approved')}
                else{setS('Rejected')}
            }
            //order
            else{
                console.log('2222')
                if(status==0){setS('Waiting')}
                else if(status==1){setS('Accepted')}
                else{setS('Rejected')}
            }
        }
        console.log('eeee',status)
        getStatus();
    },[])
    const goInfo=()=>{
        //only processing application can do
        if(show[8]==1&&status==0){
            history.push(`/adminInfo/expertApplication/${id}`);
        }
    }
    return (
        <tr onClick={goInfo}>
        {id?<th scope="row">{id}</th>:null}
        <td>{time}</td>
        <td>{user}</td>
        {show[4]?<td>{expert}</td>:null}
        {show[5]?<td>{duration}</td>:null}
        {show[6]?<td>{price}</td>:null}
        <td>{S}</td>
        </tr>
    )
}

AEO.propTypes = {
    id:PropTypes.number,
    time:PropTypes.string,
    user:PropTypes.string,
    expert:PropTypes.string,
    duration:PropTypes.string,
    price:PropTypes.string,
    status:PropTypes.string,
    show:PropTypes.array,
};

AEO.defaultProps = {
    id:PropTypes.number,
    time:PropTypes.string,
    user:PropTypes.string,
    expert:PropTypes.string,
    duration:PropTypes.string,
    price:PropTypes.string,
    status:PropTypes.string,
    show:PropTypes.array,
};

export default AEO;
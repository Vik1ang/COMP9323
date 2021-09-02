import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import { useForm } from "react-hook-form";
import apiRequest from '../../api/api';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

const Upay = ({match}) => {
    const history = useHistory();
    const expertId=match.params.expertId;
    const userId=match.params.userId;
    const [pay,setPay] = React.useState(false);
    const [total,setT] =React.useState(0);
    const [data,setD] = React.useState([]);
    const {
        register,
        handleSubmit,
      } = useForm();
    const onSubmit = async (data) => {
        setPay(true);
        setT(25*data.duration)
        setD(data)
    };

    const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    }));

    const classes = useStyles();
    const goPay =async() => {
        let dataA=data.startTime
        let a=dataA.split('T',2)
        let final=''
        let finalA=final.concat(a[0],' ',a[1],':00')
        const response= await apiRequest('pay', 'POST',[parseInt(expertId),finalA,parseInt(data.duration),total]);
        if(response.status===200){
            alert('Payment Successful')
        }
        else{
            alert('Error')
        }
        history.push(`/userInfo/${userId}`)
        
    }

    return (
        <>
            <UHeader/>
            <div class="container">
            <div class="d-block text-logo">Payment Page</div>
                <p class="container">Complete the payment for the expert meeting appointment</p>
            <div className="row" style={{marginTop:40}}>
                <div className="column col-md-6">
                    <div class="container">
                        <div className="theme-card">
                            <form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                                <div class="column col-md-12">
                                    Price: <h1>$25/h</h1>
                                </div>
                                <div class="column col-md-12">
                                    Duration(/h):
                                    <div class="form-group">
                                        <input {...register('duration')} type="number" class="form-control" id="InputSubject" name="duration" placeholder="Type how long you want to meet" required="required" data-error="Subject is required." />
                                        <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                <div>
                                    <TextField
                                        {...register('startTime')}
                                        id="datetime-local"
                                        label="Booking a time"
                                        type="datetime-local"
                                        defaultValue="2017-05-24T10:30"
                                        name='startTime'
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        defaultValue="2021-08-9T20:30"
                                    />
                                </div>
                                <div class="column col-md-4 float-sm-end">
                                    <button class="btn btn-default btn-full" type="submit" >
                                        <span className="smallText">Pay Now</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="column col-md-6">
                    {pay?
                    <div class="container " >
                        <div>Total: <h1>${total}</h1></div>
                        <div class="column col-md-12">
                        <div class="row">
                            <div class="column col-md-6 mt-4" >
                                <input type="text" class="form-control" id="InputSubject" name="duration" placeholder="First Name" required="required" data-error="Subject is required." />
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="column col-md-6 mt-4">
                                <input type="text" class="form-control" id="InputSubject" name="duration" placeholder="Last Name" required="required" data-error="Subject is required." />
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="column col-md-12 mt-4">
                                <input type="number" class="form-control" id="InputSubject" name="duration" placeholder="Card Number" required="required" data-error="Subject is required." />
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="column col-md-6 mt-4">
                                <input type="number" class="form-control" id="InputSubject" name="duration" placeholder="CVV" required="required" data-error="Subject is required." />
                                <div class="help-block with-errors"></div>
                            </div>
                            <div class="column col-md-6 mt-4">
                                <input type="text" class="form-control" id="InputSubject" name="duration" placeholder="Expire Date: MM/YY" required="required" data-error="Subject is required." />
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        </div>
                        <div class="column col-md-6 float-sm-end mt-4">
                            <button class="btn btn-default btn-full" onClick={goPay} >
                                <span className="smallText">Confirm Payment</span>
                            </button>
                        </div>
                        </div>
                        
                    :null}

                </div>
                </div>
            </div>
            <UFooter/>
        </>
    )
}

Upay.propTypes = {
    match: PropTypes.objectOf(PropTypes.object),
};

Upay.defaultProps = {
    match: PropTypes.objectOf(PropTypes.object),
};

export default Upay;
import React from 'react';
import { useHistory } from 'react-router-dom';
import AHeader from '../../components/aHeader';
import ANav from '../../components/aNav';
import UFooter from '../../components/uFooter';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/aGeneralQCard';
import apiRequest from '../../api/api';
import userEvent from '@testing-library/user-event';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import AdminLine from "../../components/AdminLine"

const AData =()=> {
    const [daily,setDaily]=React.useState([]);
    const [total,setTotal]=React.useState([]);
    const [gExpert,setGE]=React.useState([]);
    const [gUser,setGU]=React.useState([]);
    const [gIncome,setGI]=React.useState([]);
    const [gPost,setGP]=React.useState([]);
    const [e,se]=React.useState(0);
    const [u,su]=React.useState(0);
    const [i,si]=React.useState(0);
    const [p,sp]=React.useState(0);
    React.useEffect(()=>{
        const getDailyData = async () => {
            const response = await apiRequest('getDailyData','GET');
            const res=response.json();
            await res.then((data)=>{
                setDaily(data);
            })
        }
        const getTotalData = async () => {
            let expert=[];
            let user=[];
            let income=[];
            let post=[];
            let ee=0,uu=0,ii=0,pp=0;
            const response = await apiRequest('getAllData','GET');
            const res=response.json();
            res.then(async (data)=>{
                setTotal(data);
                for(let i=0;i<6;i++){
                    expert.push(data['total_report'][i]['Growing experts'])
                    user.push(data['total_report'][i]['Growing users'])
                    income.push(data['total_report'][i]['income'])
                    post.push(data['total_report'][i]['post'])
                    ee+=data['total_report'][i]['Growing experts']
                    uu+=data['total_report'][i]['Growing users']
                    ii+=data['total_report'][i]['income']
                    pp+=data['total_report'][i]['post']
                    if(i==5){
                        setGE(expert);
                        setGU(user);
                        setGI(income);
                        setGP(post);
                        se(ee);
                        su(uu);
                        si(ii);
                        sp(pp);
                    }
                }
            })
        }
        getDailyData();
        getTotalData();
    },[])
    const useStyles = makeStyles({
        root: {
          background: (props) =>
            props.color === 'red'
              ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: (props) =>
            props.color === 'red'
              ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
              : '0 3px 5px 2px rgba(33, 203, 243, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
          margin: 8,
        },
      });
      
      function MyButton(props) {
        const { color, ...other } = props;
        const classes = useStyles(props);
        return <Button className={classes.root} {...other} />;
      }
      
      MyButton.propTypes = {
        color: PropTypes.oneOf(['blue', 'red']).isRequired,
      };
    return (
        <>
            <AHeader />
            <ANav show={[0,0,1]}/>
            <div class="container">
                <div class="row mt-4 " style={{marginLeft:120}}>
                    <div class="col-md-4 col-sm-12 col-xs-12 text-center">
                        <div class="d-block text-logo">Today</div>
                    </div>
                    <table class="table mt-4">
                        <React.Fragment>
                            <MyButton color="red">New Users: {daily['Growing users']}</MyButton>
                            <MyButton color="red">New Experts: {daily['Growing experts']}</MyButton>
                            <MyButton color="red">New Posts: {daily.post}</MyButton>
                            <MyButton color="red">Income: ${daily.income}</MyButton>
                        </React.Fragment>
                    </table>
                    <div class="col-md-4 col-sm-12 col-xs-12 text-center" style={{marginTop:30}}>
                        <div class="d-block text-logo">Total</div>
                    </div>
                    <table class="table mt-4" >
                        <React.Fragment>
                            <MyButton color="red">Users: {u}</MyButton>
                            <MyButton color="red">Experts: {e}</MyButton>
                            <MyButton color="red">Posts: {p}</MyButton>
                            <MyButton color="red">Income: ${i}</MyButton>
                        </React.Fragment>
                    </table>
                    <span style={{width:500,display:'inline',marginTop:30}}>
                    <AdminLine data={gExpert} x={['Mar','Apr','May','June','July','Aug']} type={'line'} title={'Increased number of experts'} />
                    </span>
                    <span style={{width:500,display:'inline',marginTop:30}}>
                    <AdminLine data={gUser} x={['Mar','Apr','May','June','July','Aug']} type={'line'} title={'Increased number of users'} />
                    </span>
                    <span style={{width:500,display:'inline'}}>
                    <AdminLine data={gIncome} x={['Mar','Apr','May','June','July','Aug']} type={'line'} title={'Increased transaction amount'} />
                    </span>
                    <span style={{width:500,display:'inline'}}>
                    <AdminLine data={gPost} x={['Mar','Apr','May','June','July','Aug']} type={'line'} title={'Increased number of posts'} />
                    </span>
                </div>
            </div>
            <UFooter />
        </>
    );
}

export default AData;

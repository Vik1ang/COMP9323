import React from 'react';
import { useHistory } from 'react-router-dom';
import UHeader from '../../components/uHeader';
import UFooter from '../../components/uFooter';
import UNav from '../../components/uNav';
import wave from '../../images/wave.svg';
import add from '../../images/add.svg'
import ListFollowing from '../../components/listFollowing';
import GeneralQCard from '../../components/generalQCard';

const UCommunity =()=> {
    const history = useHistory();
    const goTut=()=>{
        history.push('/userTutorial');
    };
    const goQnA=()=>{
        history.push('/userQnA');
    };
    const goExperience=()=>{
        history.push('/userExperience');
    };
    return (
        <>
            <UHeader />
            <UNav show={[1,0,0]}/>
            <section class="main-content">
                <div className="container-xl">
                    <h3 class="widget-title text-center">General Questions</h3>
                    <div className="container-buttons">
                        <div className="item-buttons">
                            <button class="btn btn-default btn-lg" onClick={goTut}>
                                <span className="smallText">Tutorials</span>
                            </button>
                        </div>
                        <div className="item-buttons">
                            <button class="btn btn-default btn-lg" onClick={goQnA}>
                                <span className="smallText">Q & A</span>
                            </button>
                        </div>
                        <div className="item-buttons">
                            <button class="btn btn-default btn-lg" onClick={goExperience}>
                                <span className="smallText">Experiences</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <UFooter />
        </>
    );
}

export default UCommunity;

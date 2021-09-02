import React, { useState } from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import GeneralQCard from '../../components/aGeneralQCard';
import apiRequest from '../../api/api'
import UHeader from '../../components/uHeader';
import ANav from '../../components/aNav';
import UFooter from '../../components/uFooter';
import { useHistory } from 'react-router-dom';
import GeneralQCardHome from '../../components/generalQCardHome'
import { useEffect } from 'react';

const Search=({match})=>{
    const types = ['Tutorials', 'QnA', 'Experiences'];
    const [sortBy, setSortBy] = useState("Latest");
    const sortIndex = ['follow_asc', 'Following Numbers', 'Oldest', 'Latest'];

    const onChange = e => {
      setSortBy(e.target.value);
    };
    const history = useHistory();
    const content=match.params.content;
    const [Q,setQ]=React.useState([]);
    React.useEffect(async()=>{
        const response = await apiRequest('InfoP','GET','',`?search=${content}&sort=${sortIndex.indexOf(sortBy)}`);
            const res=response.json();
            res.then((data)=>{
                setQ(data['post_list'])
            })
    },[sortBy])
    return(
        <div>
            <UHeader />
            {Q.length==0?
            <h1 style={{marginLeft:'35%'}}>No content matched</h1>
            :
            <div>
            <div className="filter">
                <span className="sort">Sort By</span>
                <Radio.Group onChange={onChange} value={sortBy}>
                    <Radio value="Latest" defaultChecked>Latest</Radio>
                    <Radio value="Oldest">Oldest</Radio>
                    <Radio value="Following Numbers">Following Numbers</Radio>
                </Radio.Group>
            </div>
            {Q.map((item)=><GeneralQCardHome
                Title={item.title} 
                Date={item.update_time} 
                Q={item.contents} 
                Author={item.username}
                id={item.id}
                creator_id={item.creator_id}
                expert_id={item.expert_id}
                song={1}
                community={item.category}
                type={types[item.type - 1]}
            />)}
            </div>
            }
            <UFooter />
        </div>
    )
}

Search.propTypes = {
    match: PropTypes.objectOf(PropTypes.object),
    params: PropTypes.objectOf(PropTypes.object),
};

Search.defaultProps = {
    match: PropTypes.objectOf(PropTypes.object),
    params: PropTypes.objectOf(PropTypes.object),
};

export default Search;
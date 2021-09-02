import React from 'react'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types';
import { red } from '@material-ui/core/colors'

const Line = (props) => {
    const {data,title,x,type}=props;
    const getOption = ()=>{
        let option = {
            title: {
                text: title
            },
            tooltip:{
                trigger: 'axis'
            },
            xAxis: {
                data: x,
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name:'11',
                    type:type,
                    barWidth: '50%',
                    data:data
                }
            ]
        }
        return option;
    }    
    return (
        <>
            <ReactEcharts option={getOption()}/>
        </>
    )
}

Line.propTypes = {
    data:PropTypes.array,
    title:PropTypes.string,
    x:PropTypes.array,
    type:PropTypes.string,
    // y:PropTypes.string,
};

Line.defaultProps = {
    data:PropTypes.array,
    title:PropTypes.string,
    x:PropTypes.array,
    type:PropTypes.string,
    // y:PropTypes.string,
};
export default Line;
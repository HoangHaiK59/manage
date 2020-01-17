import React from 'react';
import {List} from 'antd';
import { connect } from 'react-redux';
import { useUpdateTitle } from '../../utils';

const About = ({title, ...props}) => {
    useUpdateTitle(title);
    const {appInfo} = props;
    const getDataSource = (data) => {
        let dataSource = [];
        let keys = Object.keys(data).filter(key => 
            key === 'app_id' || key === 'application' || key === 'user_id' ||
    }
    return <div>
      <List
      size="small"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => <List.Item>{item}</List.Item>}
    />
    </div>
} 

const mapState = state => ({
  appInfo: state.facebook.appInfo
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(About);
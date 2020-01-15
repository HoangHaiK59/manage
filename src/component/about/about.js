import React from 'react';
import {List} from 'antd';

const About = ({appInfo}) => {
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

const 

export default About;
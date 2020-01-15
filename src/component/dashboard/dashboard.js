import React from 'react';
import { Card, Col, Row, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const Dashboard = props => {
    return <div style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', transform: 'translate(-50%,-50%)' }}>
        <Row draggable gutter={16}>
            <Col span={8}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="Posts" 
                bordered={true}
                extra={<NavLink to="/posts">
                    <Icon key="ellipsis" type="ellipsis"/>
                </NavLink>}
                >
                    View all posts
                </Card>
            </Col>
            <Col  span={8}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="Analystic" 
                bordered={true}>
                    View analystic
                </Card>
            </Col>
            <Col span={8}>
                <Card 
                style={{height: 150}} 
                hoverable title="Albums" 
                bordered={true}>
                    View albums
                </Card>
            </Col>
        </Row>
        <Row style={{marginTop: 20}} draggable gutter={16}>
            <Col span={8}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="About" 
                bordered={true} 
                extra={<NavLink to="/about">
                    <Icon key="ellipsis" type="ellipsis"/>
                </NavLink>}
                >
                    About application
            </Card>
            </Col>
            <Col span={8}>
                <Card style={{height: 150}} 
                hoverable 
                title="Tasks Perform" 
                bordered={true} 
                extra={<NavLink to="/tasks">
                    <Icon key="ellipsis" type="ellipsis"/>
                </NavLink>}>
                    View tasks a user can perform on page
            </Card>
            </Col>
            <Col span={8}>
                <Card  
                style={{height: 150}}
                hoverable title="Page Infomation" 
                bordered={true} 
                extra={<NavLink to="/pageinfo">
                    <Icon key="ellipsis" type="ellipsis"/>
                </NavLink>}>
                    View page infomation
            </Card>
            </Col>
        </Row>
    </div>
}

export default Dashboard;
import React from 'react';
import { Card, Col, Row } from 'antd';
import { useUpdateTitle, useVerify } from '../../utils';

const Dashboard = ({title, loginStatus,handleVerify, history}) => {
    useUpdateTitle(title);
    useVerify(() => handleVerify(loginStatus ? loginStatus.authResponse.accessToken: ''));
    //handleVerify(loginStatus.authResponse.token);
    return <div style={{ position: 'absolute', top: '50%', left: '50%', width: '95%', transform: 'translate(-50%,-50%)' }}>
        <Row draggable gutter={16}>
            <Col span={6}>
                <Card 
                onClick={() => history.push('/posts')}
                style={{height: 150}} 
                hoverable 
                title="Posts" 
                bordered={true}
                >
                    View all posts
                </Card>
            </Col>
            <Col  span={6}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="Creative" 
                bordered={true}
                onClick={() => history.push('/creative')}
                >
                    Creative content
                </Card>
            </Col>
            <Col  span={6}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="Analystic" 
                bordered={true}
                onClick={() => history.push('/analystic')}
                >
                    View analystic
                </Card>
            </Col>
            <Col span={6}>
                <Card 
                style={{height: 150}} 
                hoverable title="Albums" 
                bordered={true}>
                    View albums
                </Card>
            </Col>
        </Row>
        <Row style={{marginTop: 20}} draggable gutter={16}>
            <Col span={6}>
                <Card 
                style={{height: 150}} 
                hoverable 
                title="About" 
                bordered={true} 
                onClick={() => history.push('/about')}
                >
                    About application
            </Card>
            </Col>
            <Col span={6}>
                <Card style={{height: 150}} 
                hoverable 
                title="Tasks Perform" 
                bordered={true} 
                onClick={() => history.push('/tasks')}
                >
                    View tasks a user can perform on page
            </Card>
            </Col>
            <Col span={6}>
                <Card  
                style={{height: 150}}
                hoverable title="Store" 
                bordered={true} 
                onClick={() => history.push('/store')}
                >
                    View rating and infomation
            </Card>
            </Col>
        </Row>
    </div>
}

export default Dashboard;
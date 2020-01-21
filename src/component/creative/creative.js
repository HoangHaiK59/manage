import React from 'react';
import { Row, Col, Card, Button, Alert } from 'antd';
import Publish from '../content/modal/publish/publish';
import { useUpdateTitle } from '../../utils';

const Creative = props => {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [notify, setNotify] = React.useState(false);
    useUpdateTitle(props.title);
    const { history } = props;
    const handleShowModal = () => {
        setVisible(!visible);
    }
    const handleOk = () => {
        setLoading(!loading);
        setTimeout(() => {
            setLoading(!loading);
            setVisible(!visible);
        }, 3000);
    }

    const handleCancel = () => {
        setVisible(!visible);
    }

    const handleNotify = () => {
        setNotify(!notify);
        setTimeout(() => {
            setNotify(false)
        }, 2000);
    }

    const notification = (
        <Alert message="Successfully" banner closable type="success" />
    )

    const publishModal = (
        <Publish title="Content" handleOk={handleOk} handleCancel={handleCancel} visible={visible} handleNotify={handleNotify} />
    );
    return <div style={{marginTop: 20}}>
        <div style={{height: 30}}>
            {visible ? publishModal : null}
            {notify ? notification : null}
        </div>
        <div style={{ minWidth: 800, minHeight: 600, position: 'relative' }}>
            <div style={{ position: 'absolute', width: '100%', top: '30%', left: 0, transform: 'translate(0,-30%)' }}>
                <Row gutter={16}>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ height: 150, width: 200, textAlign: 'center' }}
                            title="Publish Content"
                            bordered={false}

                        >
                            <Button onClick={handleShowModal} type="primary">
                                &#43;
                    </Button>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ height: 150, width: 200, textAlign: 'center' }}
                            title="Unpublished Content"
                            bordered={false}
                            onClick={() => history.push('/creative/unpublish')}
                        >
                            <Button onClick={() => history.push('/creative/unpublish')} type="primary">
                                &#43;
                    </Button>
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card
                            hoverable
                            style={{ height: 150, width: 200, textAlign: 'center' }}
                            title="Schedule Publication"
                            bordered={false}
                            onClick={() => history.push('/creative/schedule')}
                        >
                            <Button type="primary">
                                &#43;
                    </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
};

export default Creative;
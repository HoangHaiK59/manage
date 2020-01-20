import React from 'react';
import { List, Button, Icon, Row, Col, Alert } from 'antd';
import { Constants } from '../../../store/define';
import { connect } from 'react-redux';
import UnPublishModal from '../modal/unpublish/unpublish';
import { useUpdateTitle } from '../../../utils';
import { action } from '../../../store/actions/action';

let count = 0;

const UnPublish = props => {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    useUpdateTitle(props.title);

    const handleShowModal = () => {
        setVisible(!visible);
    }
    const handleOk = () => {
        setLoading(!loading);
        setTimeout(() => {
            setLoading(false);
            setVisible(!visible);
        }, 3000);
    }

    const handleCancel = () => {
        setVisible(!visible);
    }

    const handleChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = () => {
        count += 1;
        props.addUnPublish({
            id: count,
            message: message,
            type: 'unpublish'
        }
        );
    }

    const handleNotifySuccess = () => {
        setIsSuccess(!isSuccess);
        setTimeout(() => {
            setIsSuccess(false)
        }, 2000);
    }

    const handleNotifyError = () => {
        setIsError(!isError);
        setTimeout(() => {
            setIsError(false)
        }, 2000);
    }

    const resetCount = () => {
        count = 0;
    }

    const decrementCount = () => {
        count = count - 1;
    }

    const notificationSuccess = (
        <Alert message="Successfully" banner closable type="success"/>
    )

    const notificationError = (
        <Alert message="Error" banner closable type="error"/>
    )

    const { creatives } = props;

    const modal = (
        <div>
            <UnPublishModal
                visible={visible}
                title="Unpublished Content"
                handleCancel={handleCancel}
                handleOk={handleOk}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleNotifySuccess = {handleNotifySuccess}
                handleNotifyError={handleNotifyError}
            />
        </div>
    );


        if (creatives.length === 0) {
            return <div style={{ marginTop: 20 }}>
                {visible ? modal : null}
                <Row gutter={16} style={{ textAlign: 'end' }}>
                    <Col span={24}>
                        <Button style={{ marginRight: 20 }} type="primary" title="Add" onClick={handleShowModal}>
                            <Icon type="plus" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <List >

                    </List>
                </Row>

            </div>
        } else
            return <div>
                <div style={{height: 20}}>
                    {isSuccess ? notificationSuccess: null}
                    {isError ? notificationError: null}
                </div>
                <div style={{ marginTop: 20 }}>
                {visible ? modal : null}
                <Row gutter={16} style={{ textAlign: 'end' }}>
                    <Col span={24}>
                        <Button type="danger" title="Delete all" onClick={() => {props.clearUnPublish(); handleNotifySuccess(); resetCount()}}>
                            <Icon type="delete" />
                        </Button>
                        <Button type="primary" style={{ marginLeft: 5 }} title="Add" onClick={handleShowModal}>
                            <Icon type="plus" />
                        </Button>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <List
                            dataSource={creatives}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar=""
                                        title={item.message}
                                        description={item.id}
                                    />
                                    <div>
                                        <Button type="danger" title="Delete" onClick={() => {props.removeOneUnpublish(item.id); handleNotifySuccess(); decrementCount()}}>
                                            <Icon type="delete" />
                                        </Button>
                                        <Button style={{ marginLeft: 5 }} type="primary" title="Send" onClick={() => handleNotifySuccess()}>
                                            <Icon type="mail" />
                                        </Button>
                                    </div>
                                </List.Item>
                            )}
                        >

                        </List>
                    </Col>
                </Row>
            </div>
    </div>
}

const mapState = state => ({
    creatives: state.facebook.creatives
});

const mapDispatch = dispatch => ({
    //addUnPublish: (post) => dispatch({ type: Constants.ADD_UNPUBLISH, post: post }),
    addUnPublish: (post) => dispatch(action.addUnpublish(post)),
    removeOneUnpublish: (id) => dispatch({ type: Constants.REMOVE_ONE_UNPUBLISH, id: id }),
    clearUnPublish: () => dispatch({ type: Constants.CLEAR_UNPUBLISH })
})

export default connect(mapState, mapDispatch)(UnPublish);
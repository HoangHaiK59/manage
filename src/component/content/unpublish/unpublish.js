import React from 'react';
import { List, Button, Icon, Row, Col, Alert } from 'antd';
import { Constants } from '../../../store/define';
import { connect } from 'react-redux';
import UnPublishModal from '../modal/unpublish/unpublish';
import { useUpdateTitle } from '../../../utils';
import { action } from '../../../store/actions/action';

let id = 0;

const useFetch = (count,callback) => {
    const saveCallbackRef = React.useRef();
    React.useEffect(() => {
        saveCallbackRef.current = callback;
    })
    React.useEffect(() => {
        saveCallbackRef.current();
    },[count])
}

const UnPublish = props => {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [count, setCount] = React.useState(1);
    useUpdateTitle(props.title);
    useFetch(count, () => {props.getUnpublishes()});

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
        id = unpublishes.count ? unpublishes.count + 1 : id+1;
        props.addUnPublish({
            id: id,
            message: message,
            type: 'unpublish'
        }
        );
        setTimeout(() => {
            setCount(count + 1);
        }, 2000);
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

    const notificationSuccess = (
        <Alert message="Successfully" banner closable type="success"/>
    )

    const notificationError = (
        <Alert message="Error" banner closable type="error"/>
    )

    const handleDelOne = (id) => {
        props.delOneUnpublish(id); 
        handleNotifySuccess();
        setTimeout(() => {
            setCount(count + 1);
        }, 2000);
    }

    const handleDeleteUnpublishes = () => {
        props.deleteUnpublishes(); 
        handleNotifySuccess();
        setTimeout(() => {
            setCount(count + 1);
        }, 2000);
    }

    const { unpublishes } = props;

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


        if (!unpublishes && unpublishes.docs.length === 0) {
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
                        <Button type="danger" title="Delete all" onClick={() => handleDeleteUnpublishes()}>
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
                            dataSource={unpublishes.docs}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar=""
                                        title={item.message}
                                        description={item.id}
                                    />
                                    <div>
                                        <Button type="danger" title="Delete" onClick={() => handleDelOne(item.id)}>
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
    unpublishes: state.facebook.unpublishes
});

const mapDispatch = dispatch => ({
    //addUnPublish: (post) => dispatch({ type: Constants.ADD_UNPUBLISH, post: post }),
    addUnPublish: (unpublish) => dispatch(action.addUnpublish(unpublish)),
    //removeOneUnpublish: (id) => dispatch({ type: Constants.REMOVE_ONE_UNPUBLISH, id: id }),
    delOneUnpublish: (id) => dispatch(action.deloneUnpublish(id)),
    //clearUnPublish: () => dispatch({ type: Constants.CLEAR_UNPUBLISH }),
    deleteUnpublishes: () => dispatch(action.delUnpublishes()),
    getUnpublishes: () => dispatch(action.getUnpublishes()),
})

export default connect(mapState, mapDispatch)(UnPublish);
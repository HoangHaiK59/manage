import React from 'react';
import { List, Button, Icon, Row, Col, Alert } from 'antd';
import { connect } from 'react-redux';
import ScheduleModal from '../modal/schedule/schedule';
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

const Schedule = props => {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [count, setCount] = React.useState(1);
    const [scheduleTime, setScheduleTime] = React.useState(0);
    useFetch(count, () => props.getSchedules())
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

    const onChangePicker = (value, dateString) => {
        console.log('date: ', dateString);
        console.log((new Date(dateString).getTime() / 1000).toFixed(0));
        setScheduleTime(parseInt((new Date(dateString).getTime() / 1000).toFixed(0)));
    }

    const onOkPicker = (value) => {
        console.log('onOkPicker: ', value);
    }

    const handleSubmit = () => {
        id = schedules.count ? schedules.count + 1 : id+1;
        props.addSchedule({
            id: id,
            message: message,
            schedule_time: scheduleTime,
            type: 'schedule'
        });
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
    }

    const handleDelSchedule = (id) => {
        props.delSchedule(id); 
        handleNotifySuccess();
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
    }

    const handleDelSchedules = () => {
        props.delSchedules(); 
        handleNotifySuccess();
        setTimeout(() => {
            setCount(count + 1);
        }, 1000);
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
        <Alert message="Successfully" banner closable type="success" />
    )

    const notificationError = (
        <Alert message="Error" banner closable type="error" />
    )

    const { schedules } = props;

    const modal = (
        <div>
            <ScheduleModal
                visible={visible}
                title="Schedule Publication Content"
                handleCancel={handleCancel}
                handleOk={handleOk}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleNotifySuccess={handleNotifySuccess}
                handleNotifyError={handleNotifyError}
                onChangePicker={onChangePicker}
                onOkPicker={onOkPicker}
            />
        </div>
    );


    if (Object.keys(schedules).length === 0 || schedules['docs'].length === 0) {
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
            <div style={{ height: 20 }}>
                {isSuccess ? notificationSuccess : null}
                {isError ? notificationError : null}
            </div>
            <div style={{ marginTop: 20 }}>
                {visible ? modal : null}
                <Row gutter={16} style={{ textAlign: 'end' }}>
                    <Col span={24}>
                        <Button type="danger" title="Delete all" onClick={handleDelSchedules}>
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
                            dataSource={schedules.docs}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar=""
                                        title={item.message}
                                        description={item.id}
                                    />
                                    <div>
                                        <Button type="danger" title="Delete" onClick={() => handleDelSchedule(item.id) }>
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
    schedules: state.facebook.schedules
});

const mapDispatch = dispatch => ({
    addSchedule: (schedule) => dispatch(action.addSchedule(schedule)),
    delSchedule: (id) => dispatch(action.delSchedule(id)),
    delSchedules: () => dispatch(action.delSchedules()),
    getSchedules: () => dispatch(action.getSchedules())
})

export default connect(mapState, mapDispatch)(Schedule);
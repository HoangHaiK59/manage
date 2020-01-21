import React from 'react';
import { Modal, Button, Input, Form, Icon, DatePicker } from 'antd';
import PictureWall from '../../upload/upload';

const MessageForm = props => {
    const { getFieldDecorator } = props.form;
    return <Form onSubmit={props.handleSubmit}>
        <Form.Item>
            {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input your message!' }],
            })(
                <Input
                    id="message"
                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Message"
                    onChange={props.handleChange}
                />,
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('schedule_time', {
                rules: [{ required: true, message: 'Please input your schedule publication time!' }],
            })(
                <DatePicker id="schedule_time" showTime placeholder="Select schedule time" onChange={props.onChangePicker} onOk={props.onOkPicker} />
            )}
        </Form.Item>
        <PictureWall />
    </Form>
}

const WrappedForm = Form.create({ name: 'message' })(MessageForm);

const SchedulePublishModal = ({ visible, title, loading, handleOk, handleCancel, handleChange, handleSubmit, handleNotifySuccess, handleNotifyError, onChangePicker, onOkPicker }) => {
    return <div>
        <Modal
            visible={visible}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
            </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={() => { handleOk(); handleSubmit(); handleNotifySuccess() }}>
                    Submit
            </Button>
            ]}>
            <WrappedForm handleChange={handleChange} handleSubmit={handleSubmit} onChangePicker={onChangePicker} onOkPicker={onOkPicker} />
        </Modal>
    </div>
}

export default SchedulePublishModal;
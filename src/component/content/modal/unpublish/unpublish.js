import React from 'react';
import { Modal, Button, Input, Form, Icon } from 'antd';
import PictureWall from '../../upload/upload';

const MessageForm = props => {
    const { getFieldDecorator } = props.form;
    return <Form onSubmit={props.handleSubmit}>
        <Form.Item>
            {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input your message!' }],
            })(
                <Input
                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Message"
                    onChange={props.handleChange}
                />,
            )}
        </Form.Item>
        <PictureWall />
    </Form>
}

const WrappedForm = Form.create({name: 'message'})(MessageForm);

const UnPublishModal = ({ visible, title, loading, handleOk, handleCancel, handleChange, handleSubmit, handleNotifySuccess, handleNotifyError }) => {
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
                <Button key="submit" type="primary" loading={loading} onClick={() => {handleOk();handleSubmit(); handleNotifySuccess()}}>
                    Submit
            </Button>
            ]}>
                <WrappedForm handleChange={handleChange} handleSubmit={handleSubmit}/>
        </Modal>
    </div>
}

export default UnPublishModal;
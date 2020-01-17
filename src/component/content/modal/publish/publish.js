import React from 'react';
import { Modal, Button, Input, Form, Icon } from 'antd';
import PictureWall from '../../upload/upload';

const MessageForm = props => {
    const { getFieldDecorator } = props.form;
    return <Form>
        <Form.Item>
            {getFieldDecorator('message', {
                rules: [{ required: true, message: 'Please input your message!' }],
            })(
                <Input
                    prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Message"
                />,
            )}
        </Form.Item>
        <PictureWall />
    </Form>
}

const WrappedForm = Form.create({name: 'message'})(MessageForm);

const Publish = ({ visible, title, loading, handleOk, handleCancel, handleNotify }) => {
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
                <Button key="submit" type="primary" loading={loading} onClick={() => {handleOk(); handleNotify();}}>
                    Submit
            </Button>
            ]}>
                <WrappedForm />
        </Modal>
    </div>
}

export default Publish;
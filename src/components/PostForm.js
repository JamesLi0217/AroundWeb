import React, {forwardRef} from 'react';
import { Form, Upload, Input } from 'antd';
import { InboxOutlined } from "@ant-design/icons";

export const PostForm = forwardRef((prop, formRef) => {
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const normFile = e => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div>
            <Form name="validate_other"
                  ref = {formRef}
                  {...formItemLayout}
                  >
                <Form.Item
                    name="description"
                    label="Message"
                    rules={[
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Dragger">
                    <Form.Item name="dragger"
                               valuePropName="fileList"
                               getValueFromEvent={normFile}
                               rules={[
                                   {
                                       required: true,
                                       message: "Please upload your image/video!"
                                   }
                               ]}>
                        <Upload.Dragger name="files" beforeUpload={() => false}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    );
});

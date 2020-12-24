import React, {Component, createRef} from 'react';
import { Button, Modal, message } from 'antd';
import { PostForm } from './PostForm';
import {BASE_URL, TOKEN_KEY} from '../constants';
import axios from 'axios';

class PostButton extends Component {
    state = {
        visible: false,
        confirmLoading: false
    }

    showModal = () => {
        this.setState({visible : true});
    }

    handleOk = () => {
        this.setState({ confirmLoading: true});
        this.postForm
            .validateFields()
            .then(form => {
                const { description, dragger } = form;
                const { type, originFileObj } = dragger[0];
                const postType = type.match(/^(image|video)/g)[0];
                if (postType) {
                    let formData = new FormData();
                    formData.append("message", description);
                    formData.append("media_file", originFileObj);

                    const opt = {
                        method: "POST",
                        url: `${BASE_URL}/upload`,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
                        },
                        data: formData
                    };

                    axios(opt)
                        .then((res) => {
                            if (res.status === 200) {
                                message.success("The image/video is uploaded!");
                                this.postForm.resetFields();
                                this.handleCancel();
                                this.props.onShowPost(postType);
                                this.setState({ confirmLoading: false });
                            }
                        })
                        .catch((err) => {
                            console.log("Upload image/video failed: ", err.message);
                            message.error("Failed to upload image/video!");
                            this.setState({ confirmLoading: false });
                        });
                }
            })
            .catch((err) => {
                console.log("err ir validate form -> ", err);
            });
    }

    handleCancel = () => {
        this.setState({visible : false});
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Creat New Post
                </Button>
                <Modal title="Create New Post"
                       visible={visible}
                       confirmLoading={confirmLoading}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}>
                    <PostForm ref={(refInstance) => (this.postForm = refInstance)}/>
                </Modal>
            </div>
        );
    }
}

export default PostButton;
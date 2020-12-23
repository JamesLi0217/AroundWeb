import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import { Tabs, message } from 'antd';
import axios from 'axios';
import {SEARCH_KEY, BASE_URL, TOKEN_KEY} from '../constants';
import PhotoGallery from "./PhotoGallery";

const { TabPane } = Tabs;

function Home(props) {

    const [activeTab, setActiveTab] = useState("image");
    const [post, setPost] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ''
    })

    useEffect(() => {
        console.log('in effect', searchOption)
        fetchPost(searchOption)
    }, [searchOption]);

    const fetchPost = (option) => {
        const { type, keyword } = option;
        let url = "";

        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };

        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    };

    const renderPosts = type => {
        if(!post || post.length === 0) {
            return <div>no data</div>
        }
        if (type === 'image') {
            const imageArr = post
                .filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });

            return <PhotoGallery images={imageArr} />;
        } else if (type === 'video') {
            return 'video';
        }
    }


    return (
        <div className="home">
            <SearchBar />
            <div>
                <Tabs defaultActiveKey="image" activeKey={activeTab}
                      onChange={key => {setActiveTab(key)}}>
                    <TabPane tab="Image" key="image">
                        {renderPosts("image")}
                    </TabPane>
                    <TabPane tab="Video" key="video">
                        {renderPosts("image")}
                    </TabPane>
                </Tabs>
            </div>

        </div>
    );
}

export default Home;
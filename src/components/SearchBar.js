import React, { useState } from 'react';
import { Input, Radio } from 'antd';
import {SEARCH_KEY} from '../constants'

const { Search } = Input;

function SearchBar(props) {

    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    const handleSearch = value => {
        if (value === "" && searchType != SEARCH_KEY.all) {
            setError("Please input your search keyword");
            return;
        }

    };

    const changeSearchType = e => {
        const searchType = e.target.value;
        setError("");
        setSearchType(searchType);
    }

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                disabled={searchType === SEARCH_KEY.all}
                onSearch={handleSearch}
            />
            <p className="error-msg">{error}</p>
            <Radio.Group onChange={changeSearchType} value={searchType}>
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;
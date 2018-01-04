import React, { Component } from 'react';

import { SearchBar } from 'react-weui';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';

class SearchPage extends Component {
    render() {
        return (
            <div className="search_main">
                <SearchBar placeholder="搜索歌曲、歌单、专辑"/>
            </div>
        );
    }
}

export default SearchPage;
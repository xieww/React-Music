import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route,} from "react-router-dom";
import Recommend from './components/Recommend/Recommend';
import RankingList from './components/RankingList/RankingList';
import Search from './components/SearchPage/SearchPage';

ReactDOM.render(
    (<Router>
        <div>
        <Route  eexact path="/" component={App}/>
        <Route  path="/recommend" component={Recommend}/>
        <Route  path="/rankingList" component={RankingList}/>
        <Route  path="/search" component={Search}/>
        </div>
    </Router>), document.getElementById('root')
);
registerServiceWorker();

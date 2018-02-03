// import {createStore} from 'redux'
// import reducer from './reducers'
// const reducer = function(){};
//  //创建store
// const store = createStore(reducer);
// export default store;

import {createStore} from "redux";
import reducer from "../reducers/reducers";

 //创建store
const store = createStore(reducer);
export default store;
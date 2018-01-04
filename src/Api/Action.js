//导入fetchData文件
import { getData, postData } from './fetchData'

//返回一个action对象，用来关联对应的reducer，将data保存到store。
const saveReducer = (data) => ({
    type: 'SAVE_REDUCER',
    data
})

//get接口测试，传入一个参数id，请求/test/:id接口，返回response并且将数据通过指定的action保存到store。
export const getTest = (id) => async (dispatch, getState) => {
    try {
        let response = await getData(`/test/${id}`)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}

/*
post接口测试，params参数格式
let params = {
    id: 23
}
*/
export const postTest = (params) => async (dispatch, getState) => {
    try {
        let response = await postData(`/test`, params)
        await dispatch(saveReducer(response.data))
    } catch (error) {
        console.log('error: ', error)
    }
}
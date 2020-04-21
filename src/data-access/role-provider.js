import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.role.getAll,{}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    getByPage(param) {
        let parameters =
            (param.pagenumber ? '?pageNumber=' + param.pagenumber : '?pageNumber=' + -0) +
            (param.pagesize ? '&pageSize=' + param.pagesize : '&pageSize=' + 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.room.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
}   
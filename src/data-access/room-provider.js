import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.room.getAll).then(x => {
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

    create(object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.room.create, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    delete(listId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("delete", constants.api.room.delete, listId).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    searchAndPage(param) {
        let parameters =
            '?searchTerm=' + param.searchTerm + '&sortColumn=' + param.sortColumn + '&sortOrder=' + param.sortOrder +
            (param.pageNumber ? '&pageNumber=' + param.pageNumber : '&pageNumber=' + -0) +
            (param.pageSize ? '&pageSize=' + param.pageSize : '&pageSize=' + 10) +
            '&roomNo=' + param.roomNo + '&roomTypeId=' + param.roomTypeId + '&status=' + param.status +
            '&statusStay=' + param.statusStay + '&nop=' + param.nop
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.room.searchAndPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
}   
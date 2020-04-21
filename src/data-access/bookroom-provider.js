import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.bookroom.getAll).then(x => {
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
            clientUtils.requestApi("get", constants.api.bookroom.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    create(object) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.bookroom.create, object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    createDetail(id,listId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.bookroom.createDetail + '?id=' + id, listId).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    delete(listId) {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("delete", constants.api.bookroom.delete, listId).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    searchAndPage(param) {
        let parameters =
            
        //     (param.pageNumber ? '?pageNumber=' + param.pageNumber : '?pageNumber=' + -0) +
        //     (param.pageSize ? '&pageSize=' + param.pageSize : '&pageSize=' + 10) +
        //     (param.customerId? '&customerId='+ param.customerId: '&customerId='+'')+
        //     (param.bookroomNo? '&bookNo=' + param.bookroomNo:'&bookNo='+'')+
        //     (param.customerCode? '&customerCode='+param.customerCode:'&customerCode='+'')+
        //     (param.identity? '&identity='+param.identity:'&identity='+'')
        // return new Promise((resolve, reject) => {
        //     clientUtils.requestApi("get", constants.api.bookroom.searchAndPage + parameters, {}).then(x => {
        //         resolve(x);
        //     }).catch(e => {
        //         reject(e);
        //     })
        // })


        (param.pageNumber ? '?pageNumber=' + param.pageNumber : '?pageNumber=' + -0) +
            (param.pageSize ? '&pageSize=' + param.pageSize : '&pageSize=' + 10) +
            '&customerId='+ param.customerId+
            '&bookNo=' + param.bookroomNo+
            '&customerCode='+param.customerCode+
            '&identity='+param.identity
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.bookroom.searchAndPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
}   
import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.employee.getAll).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },

    search(param) {
        let parameters =
            (param.customerName ? '?customerName=' + param.customerName : '?customerName=' + '') +
            (param.customerNo ? '&customerNo=' + param.customerNo : '&customerNo=' + '') +
            (param.nation ? '&nation=' + param.nation : '&nation='+'') +
            (param.identityCard ? '&identityCard=' + param.identityCard : '&identityCard=' + '') +
            (param.gender ? '&gender=' + param.gender : '&gender=' + '') +
            (param.dob ? '&dob=' + param.dob : '&dob=' + '') +
            (param.phone ? '&phone=' + param.phone : '&phone=' + '') +
            (param.email ? '&email=' + param.email : '&email=' + '')

        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.customer.search + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },

    getByPage(param) {
        let parameters =
            (param.pagenumber ? '?pageNumber=' + param.pagenumber : '?pageNumber=' + -0) +
            (param.pagesize ? '&pageSize=' + param.pagesize : '&pageSize=' + 10)
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.customer.getByPage + parameters, {}).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    create(object){
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.customer.create , object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    update(id, object){
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("post", constants.api.customer.update+'?id='+id , object).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    },
    delete(param){
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("delete", constants.api.customer.delete , param).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        })
    }
    
}   
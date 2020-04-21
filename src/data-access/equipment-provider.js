import client from '../utils/client-utils';
import stringUtils from '../resources/stringUtils';
import constants from '../resources/strings';
import datacacheProvider from './datacache-provider';
import clientUtils from '../utils/client-utils';

var md5 = require('md5');
export default {
    getAll() {
        return new Promise((resolve, reject) => {
            clientUtils.requestApi("get", constants.api.equipment.getAll).then(x => {
                resolve(x);
            }).catch(e => {
                reject(e);
            })
        });
    },


    // create(object) {
    //     return new Promise((resolve, reject) => {
    //         clientUtils.requestApi("post", constants.api.room.create, object).then(x => {
    //             resolve(x);
    //         }).catch(e => {
    //             reject(e);
    //         })
    //     });
    // },

    // delete(listId) {
    //     return new Promise((resolve, reject) => {
    //         clientUtils.requestApi("delete", constants.api.room.delete, listId).then(x => {
    //             resolve(x);
    //         }).catch(e => {
    //             reject(e);
    //         })
    //     });
    // },


}   
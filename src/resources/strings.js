let wallet_services = '/wallet-services-dev'; //dev
// let wallet_services = '/wallet-services-test'; //test
let isofhcare_service = '/isofhcare'; //dev
// let isofhcare_service = '/isofhcare'; //test
let land_service = '/api/v1'

let hotel_service = '/api';

module.exports = {
    key: {
        storage: {
            current_account: "CURRENT_USER"

        }
    },
    action: {
        action_user_login: "ACTION_USER_LOGIN",
        action_user_logout: "ACTION_USER_LOGOUT",
    },
    message: {
        user: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",
            error_code_2: "SĐT đã được sử dụng trong hệ thống. Vui lòng sử dụng SĐT khác!",
            error_code_3: "Email đã được sử dụng trong hệ thống. Vui lòng sử dụng Email khác!",
            error_code_4: "Số văn bằng chuyên môn đã tồn tại trên hệ thống. Vui lòng sử dụng Số văn bằng chuyên môn khác!",
            error_code_5: "Username đã tồn tại trên hệ thống. Vui lòng sử dụng Username khác!",
        }, post: {
            approved_success: "Duyệt câu hỏi và gán cho bác sĩ thành công!",
            approved_error: "Duyệt câu hỏi không thành công!",
        },
        hospital: {
            create_error: "Tạo mới tài khoản không thành công!",
            update_error: "Cập nhật tài khoản không thành công!",

        }
    },
    api: {
        user: {
            // search: isofhcare_service + "/user/search",
            // login: land_service + "/auth/login",
            getAll: hotel_service + '/user/get-all',
            getByPage: hotel_service + '/user/search',
            create: hotel_service + '/user/create',
            update: hotel_service + '/user/update',
            delete: hotel_service + '/user/delete-users',
            search: hotel_service + '/user/search'
        }, room :{
            getAll: hotel_service + '/room/all',
            getByPage: hotel_service + '/room/search',
            create: hotel_service + '/room/create',
            delete: hotel_service + '/room/delete',
            searchAndPage: hotel_service + '/room/search'
        }, typeRoom :{
            getAll: hotel_service + '/typeroom/all',
            getByPage: hotel_service + '/typeroom/search',
            getDetail: hotel_service + '/typeroom/detail'
        }, role:{
            getAll: hotel_service +'/role/all'
        }, customer:{
            getByPage: hotel_service + '/customer/search',
            getAll: hotel_service + '/customer/all',
            create: hotel_service + '/customer/create',
            update:hotel_service + '/customer/update',
            search: hotel_service +'/customer/search',
            delete: hotel_service + '/customer/delete'
        }, bookroom: {
            getAll: hotel_service + '/bookroom/all',
            getByPage: hotel_service + '/bookroom/search',
            create: hotel_service + '/bookroom/create',
            createDetail: hotel_service + '/bookroom/create-detail',
            delete: hotel_service + '/bookroom/delete',
            searchAndPage: hotel_service + '/bookroom/search',
            getPerMonth: hotel_service + '/getpermonth'
        }, equipment :{
            getAll: hotel_service + '/equip/all',
        }, device :{
            getAll: hotel_service + '/device/all',
            getByPage: hotel_service + '/device/search',
            getDetail: hotel_service + '/device/detail'
        }, payment :{
            getAll: hotel_service + '/payment/all',
            create: hotel_service + '/payment/create',

        },
        employee:{
            getAll: hotel_service + '/employee/all'
        }

    }
}

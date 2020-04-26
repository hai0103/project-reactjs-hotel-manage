//React, redux
import React from 'react'
import {connect} from 'react-redux';

//UI
import {toast} from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import constants from '../../../../resources/strings'

//provider
import dataCacheProvider from '../../../../data-access/datacache-provider'
import userProvider from '../../../../data-access/user-provider'

import './main.css'
import './util.css'
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            grant_type: 'password'
            // confirm: ''
        }
    }

    componentWillMount() {
        this.checkUserLogin()
    }

    checkUserLogin() {
        if (this.props.userApp.currentUser) {
            this.props.history.push("/admin/dashboard");
        } else {
            this.props.history.push("/dang-nhap");
        }
    }

    login() {
        const {username, password, grant_type} = this.state;
        // let body = 'grant_type=password&username=' + username + '&password=' + password
        // let body = 'username=' + username + '&password=' + password
        let body = {username: username, password: password}
        console.log(body)
        // axios.post('https://localhost:44307/token', body, { 'Content-Type': 'application/json' })
        axios.post('http://localhost:8080/login', body, {'Content-Type': 'application/json'})
            .then((res) => {
                console.log(res)
                switch (res.status) {
                    case 200:
                        let user = res.data;
                        let detail = res.data.data.user.user;
                        delete detail.password
                        localStorage.setItem("hotel-user-detail",  JSON.stringify(res.data.data.user.user));
                        this.props.dispatch({type: constants.action.action_user_login, value: user})
                        dataCacheProvider.save("", constants.key.storage.current_account, user).then(s => {
                            this.props.history.push("/admin/dashboard");
                        });
                        toast.success('Xin chào ' + res.data.data.user.user.username, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                        break;
                    case 400:
                        toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin', {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        break;
                    case 404:
                        toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin', {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        break;
                    case 500:
                        toast.error('Internal Server Error!', {
                            position: toast.POSITION.TOP_RIGHT
                        })
                        break;
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render() {
        const {username, password, confirm} = this.state;
        return (
            <div className="login-form limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title" style={{backgroundImage: 'url(images/bg-01.jpg)'}}>
                  <span className="login100-form-title-1">
                    Landber <sub style={{fontWeight: 100, fontSize: 10}}>Admin</sub>
                  </span>
                        </div>
                        <form className="login100-form validate-form">
                            <div className="wrap-input100 validate-input m-b-26" data-validate="Username is required">
                                <span className="label-input100">Username</span>
                                <input value={username} onChange={(event) => {
                                    this.setState({username: event.target.value})
                                }} className="input100" type="text" name="username" placeholder="Enter username"/>
                                <span className="focus-input100"/>
                            </div>
                            <div className="wrap-input100 validate-input m-b-18" data-validate="Password is required">
                                <span className="label-input100">Password</span>
                                <input onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        this.login()
                                    }
                                }} value={password} onChange={(event) => {
                                    this.setState({password: event.target.value})
                                }} className="input100" type="password" name="pass" placeholder="Enter password"/>
                                <span className="focus-input100"/>
                            </div>
                            <div className="flex-sb-m w-full p-b-30">
                                <div className="contact100-form-checkbox">
                                    <input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
                                    <label className="label-checkbox100" htmlFor="ckb1">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <a href="#" className="txt1">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>
                            <div className="container-login100-form-btn">

                            </div>
                        </form>
                        <button onClick={() => this.login()} className="login100-form-btn">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

export default connect(mapStateToProps)(Login);

import React from 'react'
import { connect } from 'react-redux';
import { BrowserRouter, Router, NavLink } from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeSub: false
        }
    }


    handleLogout = () => {
        localStorage.removeItem('hotel-user-detail');
        localStorage.removeItem('_CURRENT_USER');
        window.location.href = "/dang-nhap"
    }

    render() {
        return (
            <header className="header-admin">
                <div className="left-side-header">
                    <NavLink to={'/admin/dashboard'}>
                        <img src="/icon/logo.png" style={{ height: '100%' }} />

                    </NavLink>
                </div>
                {this.props.userApp.currentUser ?
                    <div onClick={() => this.setState({ activeSub: !this.state.activeSub })} className="user-setting">
                        <img src="/icon/avatar-icon.png" className="user-avatar" />
                        <span onClick={() => this.setState({ activeSub: !this.state.activeSub })} className="user-name">{this.props.userApp.currentUser.data.user.user.username}</span>
                        <img onClick={() => this.setState({ activeSub: !this.state.activeSub })} src="/icon/icon-down.png" className="icon-down" />
                        {
                            this.state.activeSub ?
                                <ul className="sub-menu-setting">
                                    <li><img src="/icon/setting-icon.png" className="user-avatar" />Thiết lập</li>
                                    <li onClick={this.handleLogout}><img src="/icon/logout-icon.png" className="user-avatar" />Đăng xuất</li>
                                </ul> : ''
                        }

                    </div>
                    : ''}

            </header>
        )
    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}

export default connect(mapStateToProps)(Header);
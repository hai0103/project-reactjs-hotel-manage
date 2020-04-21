import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import userProvider from '../../data-access/user-provider';
import { BrowserRouter, Router, NavLink } from "react-router-dom";

import Header from './components/layout/header'

// routes config
import routes from './configs/routes';

import WithRoot from './WithRoot';
// import './App.scss';
// import Login from '../user/containners/account/Login';
import Login from '../admin/components/account/login';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            activeSideBar:true
        }
    }


    getMenu() {
        let allMenus = [
            // {
            //     role: [],
            //     name: "Dashboard",
            //     url: '/admin/dashboard',
            //     imgUrl: '/images/icon/dashboard_normal-bold.svg',
            //     classActiveStyle: 'dashboard',
            // },
            {
                name: "Tổng quan",
                url: '/admin/dashboard',
                iconClassName: 'icon-dashboard',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý User",
                url: '/admin/user',
                iconClassName: 'icon-user',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý phòng",
                url: '/admin/room',
                iconClassName: 'icon-room',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý đặt phòng",
                url: '/admin/book-room',
                iconClassName: 'icon-book-room',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý khách hàng",
                url: '/admin/customer',
                iconClassName: 'icon-employ',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý trang thiết bị",
                url: '/admin/device',
                iconClassName: 'icon-device',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quản lý thanh toán",
                url: '/admin/payment',
                iconClassName: 'icon-payment',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Quỹ tiền",
                url: '/admin/fund',
                iconClassName: 'icon-fund',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Danh mục",
                url: '/admin/menu-list',
                iconClassName: 'icon-list',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Báo cáo",
                url: '/admin/report',
                iconClassName: 'icon-report',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Khuyến mại",
                url: '/admin/sale',
                iconClassName: 'icon-sale',
                classActiveStyle: 'calendar-working',
            },
            {
                name: "Thiết lập",
                url: '/admin/setting',
                iconClassName: 'icon-setting',
                classActiveStyle: 'calendar-working',
            },
        ]
        return allMenus.filter(item => {
            if (!(item.role || []).length)
                return true;
            for (let i = 0; i < item.role.length; i++) {
                for (let j = 0; j < ((this.props.userApp.currentUser || {}).permission || {}).length; j++) {
                    if (item.role == (this.props.userApp.currentUser || {}).permission[j].value)
                        return true;
                }
            }
        })
    }
    openMenu(item) {
        item.open = !item.open;
        this.setState({ menus: [...this.state.menus] })
    }

    componentDidMount() {
        this.setState({ menus: this.getMenu() })
    }
    render() {
        const { classes } = this.props;
        return (
            <div className="app">
                <Header />
                {/* <AppHeader fixed>
                    <DefaultHeader />
                </AppHeader> */}
                <div className="app-body">
                <div className={this.state.activeSideBar? "sidebar" : "sidebar enactive-sidebar"}>
                        <div className="scrollbar-container Home-sidebar-1 sidebar-nav ps ps--active-y ps-container">
                            <ul className="nav">
                                {
                                    this.state.menus.map((item,index) => {

                                        if (!(item.subMenu && item.subMenu.length)) {
                                            return <li key={index} className="nav-item"><NavLink className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" to={item.url}>
                                                    <span className={"icon-sidebar" + " " + item.iconClassName} alt={item.name}></span>
                                                    <span>{item.name}</span>
                                                </NavLink>
                                                </li>
                                        }
                                        return <li key={index} className="nav-item"><a className={'nav-link ' + `${item.classActiveStyle}`} activeclassname="active" onClick={this.openMenu.bind(this, item)}><img src={item.imgUrl} alt="" />{item.name}</a>
                                            {
                                                item.open &&
                                                <ul className="list-sub-menu">
                                                    {
                                                        item.subMenu.map((item2, index) => <li className="sub-menu-item" key={index}>
                                                            <NavLink className={'nav-link ' + `${item2.classActiveStyle}`} activeclassname="active" to={item2.url}>
                                                                {/* <img src={item.imgUrl} alt="" /> */}
                                                                <span className={"icon-sidebar" + " " + item.iconClassName}></span>
                                                                <span>{item2.name}</span>
                                                            </NavLink>
                                                        </li>)
                                                    }
                                                </ul>
                                            }
                                        </li>
                                    })
                                }
                            </ul>
                        </div>

                        <div className={this.state.activeSideBar?"app-side-bar":"app-side-bar enactive-sidebar"}>
                            {this.state.activeSideBar?
                            <span  className ="icon-sidebar-foot icon-back" onClick={()=>this.setState({activeSideBar:!this.state.activeSideBar})}>
                               <i className="fas fa-chevron-left"></i>
                            </span>
                            : <span className="icon-sidebar-foot icon-forward" onClick={()=>this.setState({activeSideBar:!this.state.activeSideBar})}>
                                <i className="fas fa-chevron-right"></i>
                            </span>
                        }
                            
                        </div>

                    </div>
                    <main className={this.state.activeSideBar?"main":"main main-expand"}>
                        {/* <AppBreadcrumb appRoutes={routes} /> */}
                        <Container fluid>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />)
                                        : (null);
                                },
                                )}
                            </Switch>
                            {
                                (!this.props.userApp.currentUser) &&
                                <Redirect to="/dang-nhap" component={Login} />
                            }

                            {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
                        </Container>
                    </main>
                </div>
                {/* <AppFooter>
          <DefaultFooter />
        </AppFooter> */}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    sidebar: {
        textAlign: 'left',
    }
})

function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(WithRoot(withStyles(styles)(Home)));
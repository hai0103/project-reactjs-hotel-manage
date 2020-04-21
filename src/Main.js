import React, { Component } from 'react';
import { connect } from 'react-redux';
import userProvider from "./data-access/user-provider";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import constants from "./resources/strings";
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable';

function Loading() {
  return <div>Đang tải...</div>;
}
const routes = [
//   {
//     path:["/doi-mat-khau"],
//     component: Loadable({
//       loader:()=>import('./../src/sites/user/containners/manage_acc/ChangePass.js'),
//       loading:Loading,
//     })
//   },

//   {
//     path:["/quen-mat-khau"],
//     component:Loadable({
//       loader:()=>import('./../src/sites/user/containners/manage_acc/ForgotPassword'),
//       loading:Loading,
//     })
//   },

//   {
//     path:["/dang-ky"],
//     component: Loadable({
//       loader:()=>import('./../src/sites/user/containners/manage_acc/Register'),
//       loading:Loading,
//     })
//   },

//   {
//     path: ["/login"],
//     component: Loadable({
//       loader: () => import('./../src/sites/user/containners/manage_acc/LoginUser'),
//       loading: Loading,
//     })
//   },

  {
    path: ["/dang-nhap"],
    component: Loadable({
      loader: () => import('./sites/admin/components/account/login'),
      loading: Loading,
    })
  },

  {
    path: ["/admin", "/admin/:function", "/admin/:function/:id"],
    component: Loadable({
      loader: () => import('./sites/admin/Home'),
      loading: Loading,
    })
  },

//   {
//     path: ["/", "/nha-thuoc", "/y-ba-dien-tu","/dat-kham","/lich-dat-kham/:id","/ket-qua-kham/:id"],
//     component: Loadable({
//       loader: () => import('./sites/user/template/LayoutTemplate'),
//       loading: Loading,
//     })
//   },


]
class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceId: ''
    }
    this.props.dispatch({ type: constants.action.action_user_login, value: userProvider.getAccountStorage() })
  }
  loadScript(path) {
    const script = document.createElement("script");
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
  }
  componentWillMount() {
    let user = this.props.userApp;
  }

  render() {
    return (<BrowserRouter>
      <div className="land-master">
        <Router>
            <Switch>
              {
                routes.map((route, key) => {
                  if (route.component)
                    return <Route exact key={key}
                      path={route.path}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  return null;
                })
              }
            </Switch>
        </Router>
      </div>
    </BrowserRouter>);
  }
}
function mapStateToProps(state) {
  return {
    userApp: state.userApp
  };
}

export default connect(mapStateToProps)(App2);
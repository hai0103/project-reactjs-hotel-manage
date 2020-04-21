import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Nav';
import Loadable from 'react-loadable';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../user/containners/account/Login';
import Slider from '../components/layout/Slider';
import userProvider from '../../user/containners/account/Login';

function Loading() {
    return <div></div>;
}

const routes = [
    {
        path:'/ket-qua-kham/:id',
        component: Loadable({
            loader:()=>import('./../../user/containners/medical-record/ResultExam'),
            loading:Loading,
        })
    },
    {
        path: '/lich-dat-kham/:id',
        component: Loadable({
            loader: () => import('./../../user/containners/medical-record/MedicalExam'),
            loading: Loading,
        })
    },
    {
        path: '/dat-kham',
        component: Loadable({
            loader: () => import('./../../user/containners/medical-exam/MedicalExam'),
            loading: Loading,
        })
    },
    {
        path: '/nha-thuoc',
        component: Loadable({
            loader: () => import('./../containners/medicine/medicine'),
            loading: Loading,
        })
    },
    {
        path: '/ket-qua',
        component: Loadable({
            loader: () => import('./../containners/medical-record/ResultExam'),
            loading: Loading,
        })
    },
    {
        path: '/y-ba-dien-tu',
        component: Loadable({
            loader: () => import('./../containners/medical-record/MedicalRecords'),
            loading: Loading,
        })
    },

    {
        path: '/',
        component: Loadable({
            loader: () => import('./../containners/home/home'),
            loading: Loading,
        })
    },


]

class LayoutTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {}

    }

    render() {
        return (
            <div className="wrapper">
                <Header />
                <Slider />
                <Switch>
                    {
                        routes.map((route, key) => {
                            if (route.component)
                                return <Route key={key}
                                    path={route.path}
                                    render={props => (
                                        <route.component {...props} />
                                    )} />
                            return null;
                        })
                    }
                </Switch>
                <Footer />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        userApp: state.userApp
    };
}
export default connect(mapStateToProps)(LayoutTemplate);
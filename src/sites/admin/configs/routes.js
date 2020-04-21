import React from 'react';
import Authorization from '../../../securities/Authorization'
import Loadable from 'react-loadable';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('../containers/dashboard/index.js'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('../containers/user/index.js'),
  loading: Loading,
});

const Room = Loadable({
  loader: () => import('../containers/room/index.js'),
  loading: Loading,
})

const Customer = Loadable({
  loader: () => import('../containers/customer/index.js'),
  loading: Loading,
})

const BookRoom = Loadable({
  loader: () => import('../containers/bookroom/index.js'),
  loading: Loading,
})

const Device = Loadable({
  loader: () => import('../containers/equipment/index.js'),
  loading: Loading,
})

const Payment = Loadable({
  loader: () => import('../containers/payment/index.js'),
  loading: Loading,
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
   { path: '/admin/dashboard', name: "Dashboard", component: Dashboard },
    { path: '/admin/user', name: "", component: User },
    { path: '/admin/room', name: "", component: Room },
    { path: '/admin/book-room', name: "", component: BookRoom },
    { path: '/admin/customer', name: "", component: Customer },
    { path: '/admin/device', name: "", component: Device },
    { path: '/admin/payment', name: "", component: Payment },

]

export default routes;

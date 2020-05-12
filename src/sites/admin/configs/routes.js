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
  // { path: '/admin', name: "Dashboard", component: Dashboard },
  { path: '/admin/dashboard', name: "Dashboard", component: Dashboard },
  { path: '/admin/user', name: "User", component: User },
  { path: '/admin/room', name: "Room", component: Room },
  { path: '/admin/book-room', name: "BookRoom", component: BookRoom },
  { path: '/admin/customer', name: "Customer", component: Customer },
  { path: '/admin/device', name: "Device", component: Device },
  { path: '/admin/payment', name: "Payment", component: Payment },

]

export default routes;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Logout from '../components/auth/Logout';
import Forum from '../components/forum/Forum';
import Read from '../components/forum/Read';
import Create from '../components/forum/Create';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/forum', component: Forum, name: 'forum' },
  { path: '/logout', component: Logout },
  { path: '/question/:slug', component: Read, name: 'read' },
  { path: '/create', component: Create },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;

import config from '~/config';

// Layouts
import { NoSidebarLayout } from '~/layouts';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Hot from '~/pages/Hot';
import Rating from '~/pages/Rating';
import History from '~/pages/History';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';

// publicRoutes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homePage, to: config.routes.home },
    { path: '*', component: NotFound, layout: null },
    { path: config.routes.hot, component: Hot },
    { path: config.routes.follow, component: Following },
    { path: config.routes.history, component: History },
    { path: config.routes.rating, component: Rating },
    { path: config.routes.searchComic, component: Search, layout: NoSidebarLayout },
    { path: config.routes.logIn, component: Login, layout: null },
    { path: config.routes.signUp, component: Login, layout: null },
];

// privateRoutes
const privateRoutes = [{ path: '/profile', component: Profile, layout: NoSidebarLayout }];

export { publicRoutes, privateRoutes };

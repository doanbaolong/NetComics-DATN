// Layouts
import { NoSidebarLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import { path } from '~/util/constants';

// publicRoutes
const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: '/following', component: Following },
    { path: '/search', component: Search, layout: NoSidebarLayout },
    { path: path.LOGIN, component: Login, layout: null },
    { path: path.SIGNUP, component: Login, layout: null },
];

// privateRoutes
const privateRoutes = [{ path: '/profile', component: Profile, layout: NoSidebarLayout }];

export { publicRoutes, privateRoutes };

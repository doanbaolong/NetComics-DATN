// Layouts
import { NoSidebarLayout } from '~/components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Hot from '~/pages/Hot';
import Rating from '~/pages/Rating';
import History from '~/pages/History';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';
import { path } from '~/util/constants';

// publicRoutes
const publicRoutes = [
    { path: path.HOME, component: Home },
    { path: path.HOMEPAGE, to: path.HOME },
    { path: '*', component: NotFound, layout: null },
    { path: path.HOT, component: Hot },
    { path: path.FOLLOW, component: Following },
    { path: path.HISTORY, component: History },
    { path: path.RATING, component: Rating },
    { path: path.SEARCH_COMIC, component: Search, layout: NoSidebarLayout },
    { path: path.LOGIN, component: Login, layout: null },
    { path: path.SIGNUP, component: Login, layout: null },
];

// privateRoutes
const privateRoutes = [{ path: '/profile', component: Profile, layout: NoSidebarLayout }];

export { publicRoutes, privateRoutes };

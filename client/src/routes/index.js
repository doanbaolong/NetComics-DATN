import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Hot from '~/pages/Hot';
import History from '~/pages/History';
import Genres from '~/pages/Genres';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import ComicDetail from '~/pages/ComicDetail';
import Login from '~/pages/Login';
import NotFound from '~/pages/NotFound';

// publicRoutes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homePage, to: config.routes.home },
    { path: '*', component: NotFound },
    { path: config.routes.hot, component: Hot },
    { path: config.routes.follow, component: Following },
    { path: config.routes.history, component: History },
    { path: config.routes.genres, component: Genres },
    { path: config.routes.searchComic, component: Search },
    { path: config.routes.comic, component: ComicDetail },
    { path: config.routes.logIn, component: Login, layout: null },
    { path: config.routes.signUp, component: Login, layout: null },
];

// privateRoutes
const privateRoutes = [{ path: '/profile', component: Profile }];

export { publicRoutes, privateRoutes };

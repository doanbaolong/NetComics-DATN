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
// admin
import { AdRootLayout } from '~/layouts';
import Dashboard from '~/pages/admin/Dashboard';
import UserManager from '~/pages/admin/UserManager';
import { GenreManager, GenreManagerAdd, GenreManagerEdit } from '~/pages/admin/GenreManager';
import { AuthorManager, AuthorManagerAdd, AuthorManagerEdit } from '~/pages/admin/AuthorManager';
import { ComicManager, ComicManagerAdd, ComicManagerDetail, ComicManagerEdit } from '~/pages/admin/ComicManager';
import { ChapterManagerAdd, ChapterManagerEdit } from '~/pages/admin/ChapterManager';
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
const privateRoutes = [
    { path: '/profile', component: Profile },

    // admin
    { path: config.routes.admin, component: Dashboard, layout: AdRootLayout },
    { path: config.routes.userManager, component: UserManager, layout: AdRootLayout },

    { path: config.routes.genresManager, component: GenreManager, layout: AdRootLayout },
    { path: config.routes.genresManagerAdd, component: GenreManagerAdd, layout: AdRootLayout },
    { path: config.routes.genresManagerEditById, component: GenreManagerEdit, layout: AdRootLayout },

    { path: config.routes.authorManager, component: AuthorManager, layout: AdRootLayout },
    { path: config.routes.authorManagerAdd, component: AuthorManagerAdd, layout: AdRootLayout },
    { path: config.routes.authorManagerEditById, component: AuthorManagerEdit, layout: AdRootLayout },

    { path: config.routes.comicManager, component: ComicManager, layout: AdRootLayout },
    { path: config.routes.comicManagerAdd, component: ComicManagerAdd, layout: AdRootLayout },
    { path: config.routes.comicManagerEditById, component: ComicManagerEdit, layout: AdRootLayout },
    { path: config.routes.comicManagerDetailById, component: ComicManagerDetail, layout: AdRootLayout },

    { path: config.routes.chapterManagerAddById, component: ChapterManagerAdd, layout: AdRootLayout },
    { path: config.routes.chapterManagerEditById, component: ChapterManagerEdit, layout: AdRootLayout },
];

export { publicRoutes, privateRoutes };

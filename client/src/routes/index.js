import config from '~/config';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import History from '~/pages/History';
import Genres from '~/pages/Genres';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import ComicDetail from '~/pages/ComicDetail';
import Login from '~/pages/Login';
import VerifyEmail from '~/pages/VerifyEmail';
import SearchResult from '~/pages/SearchResult';
import NotFound from '~/pages/NotFound';
// admin
import { AdRootLayout } from '~/layouts';
import AdmLogin from '~/pages/admin/Login/Login';
import Dashboard from '~/pages/admin/Dashboard';
import UserManager from '~/pages/admin/UserManager';
import { GenreManager, GenreManagerAdd, GenreManagerEdit } from '~/pages/admin/GenreManager';
import { AuthorManager, AuthorManagerAdd, AuthorManagerEdit } from '~/pages/admin/AuthorManager';
import { ComicManager, ComicManagerAdd, ComicManagerDetail, ComicManagerEdit } from '~/pages/admin/ComicManager';
import { ChapterManagerAdd, ChapterManagerEdit } from '~/pages/admin/ChapterManager';
import Chapter from '~/pages/Chapter';
// publicRoutes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.homePage, to: config.routes.home },
    { path: config.routes.follow, component: Following },
    { path: config.routes.followAccount, component: Following },
    { path: config.routes.history, component: History },
    { path: config.routes.historyAccount, component: History },
    { path: config.routes.genresBySlug, component: Genres },
    { path: config.routes.searchComic, component: Search },
    { path: config.routes.searchResult, component: SearchResult },
    { path: config.routes.comicBySlug, component: ComicDetail },
    { path: config.routes.chapter, component: Chapter },
    { path: config.routes.logIn, component: Login, layout: null },
    { path: config.routes.signUp, component: Login, layout: null },
    { path: config.routes.adminLogin, component: AdmLogin, layout: null },
    { path: config.routes.verifyEmail, component: VerifyEmail, layout: null },
    { path: '*', component: NotFound },
];

const privateUserRoutes = [
    { path: config.routes.profile, component: Profile },
    { path: config.routes.profileEdit, component: Profile },
    { path: config.routes.profileChangePassword, component: Profile },
];

// privateRoutes
const privateAdminRoutes = [
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
    { path: '*', component: NotFound, layout: AdRootLayout },
];

export { publicRoutes, privateUserRoutes, privateAdminRoutes };

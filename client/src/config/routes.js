const routes = {
    home: '/',
    homePage: '/trang-chu',
    logIn: '/dang-nhap',
    verifyEmail: '/verify-email',
    signUp: '/dang-ky',
    follow: '/theo-doi',
    followAccount: '/theo-doi/t',
    history: '/lich-su',
    historyAccount: '/lich-su/t',
    genres: '/the-loai/',
    genresBySlug: '/the-loai/:slug',
    comic: '/truyen-tranh/',
    comicBySlug: '/truyen-tranh/:slug',
    chapter: '/truyen-tranh/:slug/:chapterSlug',
    rating: '/xep-loai',
    searchComic: '/tim-truyen-nang-cao',
    searchResult: '/tim-truyen',
    profile: '/profile',
    profileEdit: '/profile/cap-nhat',
    profileChangePassword: '/profile/doi-mat-khau',

    //admin
    admin: '/admin',
    adminLogin: '/admin/dang-nhap',

    userManager: '/admin/nguoi-dung',

    genresManager: '/admin/the-loai',
    genresManagerAdd: '/admin/the-loai/them-moi',
    genresManagerEdit: '/admin/the-loai/sua/',
    genresManagerEditById: '/admin/the-loai/sua/:id',

    authorManager: '/admin/tac-gia',
    authorManagerAdd: '/admin/tac-gia/them-moi',
    authorManagerEdit: '/admin/tac-gia/sua/',
    authorManagerEditById: '/admin/tac-gia/sua/:id',

    comicManager: '/admin/truyen-tranh',
    comicManagerAdd: '/admin/truyen-tranh/them-moi',
    comicManagerEdit: '/admin/truyen-tranh/sua/',
    comicManagerEditById: '/admin/truyen-tranh/sua/:id',
    comicManagerDetail: '/admin/truyen-tranh/chi-tiet/',
    comicManagerDetailById: '/admin/truyen-tranh/chi-tiet/:id',

    chapterManagerAdd: '/admin/truyen-tranh/them-chap/',
    chapterManagerAddById: '/admin/truyen-tranh/them-chap/:comicId',
    chapterManagerEdit: '/admin/truyen-tranh/sua-chap/',
    chapterManagerEditById: '/admin/truyen-tranh/sua-chap/:comicId/:chapterId',
};

export default routes;

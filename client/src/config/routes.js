const routes = {
    home: '/',
    homePage: '/trang-chu',
    logIn: '/dang-nhap',
    signUp: '/dang-ky',
    hot: '/hot',
    follow: '/theo-doi',
    history: '/lich-su',
    genres: '/the-loai',
    comic: '/truyen-tranh/:slug',
    rating: '/xep-loai',
    searchComic: '/tim-truyen',

    //admin
    admin: '/quan-tri',

    userManager: '/quan-tri/nguoi-dung',

    genresManager: '/quan-tri/the-loai',
    genresManagerAdd: '/quan-tri/the-loai/them-moi',
    genresManagerEdit: '/quan-tri/the-loai/sua/:id',

    authorManager: '/quan-tri/tac-gia',
    authorManagerAdd: '/quan-tri/tac-gia/them-moi',
    authorManagerEdit: '/quan-tri/tac-gia/sua/:id',
};

export default routes;

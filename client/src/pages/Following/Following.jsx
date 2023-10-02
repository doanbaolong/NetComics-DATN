import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import CommentNav from '~/components/CommentNav';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import { authSelector, followSelector } from '~/store/selector';
import { getFollowingComicsByComicIds } from '~/store/followSlice';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { LIMIT } from '~/util/constants';
import noComics from '~/assets/images/no-comics.jpg';

function Following() {
    const { followingComics, getFollowingComicsStatus, getFollowingComicsByIdsStatus } = useSelector(followSelector);
    const [searchParams] = useSearchParams();
    const { currentUser } = useSelector(authSelector);

    const { pathname } = useLocation();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Theo dõi', to: pathname },
    ];

    const dispatch = useDispatch();

    const [followingComicList, setFollowingComicList] = useState([]);
    const [isByAcount, setIsByAccount] = useState(pathname === routes.followAccount);

    useEffect(() => {
        document.title = 'Truyện đang theo dõi | NetComics';
    }, []);

    useEffect(() => {
        if (pathname === routes.followAccount) {
            setIsByAccount(true);
        } else {
            setIsByAccount(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (!isByAcount) {
            const followingComic = JSON.parse(localStorage.getItem('following-comic'));
            if (followingComic) {
                setFollowingComicList(followingComic);
            } else {
                setFollowingComicList([]);
            }
        }
    }, [followingComics, isByAcount]);

    const handleRemoveLocalFollow = (id) => {
        const newFollowComic = followingComicList.filter((item) => item !== id);
        localStorage.setItem('following-comic', JSON.stringify(newFollowComic));
        dispatch(
            getFollowingComicsByComicIds({
                page: searchParams.get('page') ? +searchParams.get('page') - 1 : 0,
                limit: LIMIT,
                ids: newFollowComic.join(),
            }),
        );
    };

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title>Truyện đang theo dõi</Title>
                        <CommentNav active={isByAcount} localLink={routes.follow} accountLink={routes.followAccount} />
                        {isByAcount ? (
                            currentUser ? (
                                <ListComicItem
                                    accountFollow
                                    loading={getFollowingComicsStatus === 'pending' ? true : false}
                                    list={followingComics}
                                />
                            ) : (
                                <>
                                    <p className="text-center need-login">
                                        Bạn cần đăng nhập để xem truyện đã theo dõi theo tài khoản
                                    </p>
                                    <div className="text-center">
                                        <Link to={routes.logIn} className="btn need-login-btn">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </>
                            )
                        ) : (
                            <ListComicItem
                                localFollow
                                onRemoveLocalFollow={handleRemoveLocalFollow}
                                loading={getFollowingComicsByIdsStatus === 'pending' ? true : false}
                                list={followingComics}
                            />
                        )}
                        {getFollowingComicsStatus !== 'pending' &&
                            getFollowingComicsByIdsStatus !== 'pending' &&
                            followingComics?.length <= 0 && (
                                <div className="no-comics">
                                    <img src={noComics} alt="no-comics" />
                                    <p>Oops! Chưa có truyện nào</p>
                                </div>
                            )}
                    </div>
                </div>
                <Sidebar history />
            </div>
        </>
    );
}

export default Following;

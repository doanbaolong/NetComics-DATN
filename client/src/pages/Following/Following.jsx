import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { TbChevronRight } from 'react-icons/tb';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import CommentNav from '~/components/CommentNav';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import { authSelector, followSelector } from '~/store/selector';
import { getFollowingComicsByComicIds } from '~/store/followSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { LIMIT } from '~/util/constants';
import noComics from '~/assets/images/no-comics.jpg';

function Following() {
    const { followingComics } = useSelector(followSelector);
    const [searchParams] = useSearchParams();
    const { currentUser } = useSelector(authSelector);

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Theo dõi', to: routes.follow },
    ];

    const dispatch = useDispatch();

    const [followingComicList, setFollowingComicList] = useState([]);
    const [isByAcount, setIsByAccount] = useState(false);

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

    const handleGetByAcount = (bool) => {
        setIsByAccount(bool);
    };

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
                        <Title rigthIcon={<TbChevronRight />}>Truyện đang theo dõi</Title>
                        <CommentNav active={isByAcount} onClick={handleGetByAcount} />
                        {isByAcount ? (
                            currentUser ? (
                                <ListComicItem accountFollow list={followingComics} />
                            ) : (
                                <>
                                    <p className="text-center">
                                        Bạn cần đăng nhập để xem truyện đã theo dõi theo tài khoản
                                    </p>
                                    <div className="text-center">
                                        <Link to={routes.logIn} className="btn btn-primary">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </>
                            )
                        ) : (
                            <ListComicItem
                                localFollow
                                onRemoveLocalFollow={handleRemoveLocalFollow}
                                list={followingComics}
                            />
                        )}
                        {followingComics?.length <= 0 && (
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

import { Link, useParams } from 'react-router-dom';
import { RiListUnordered } from 'react-icons/ri';
import { useCallback, useContext, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import './ComicDetail.scss';
import ComicItemDetail from '~/components/ComicItemDetail';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, comicSelector, followSelector } from '~/store/selector';
import { useEffect } from 'react';
import { comicSlice, getSingleComic } from '~/store/comicSlice';
import { formatChapterDate } from '~/util/formatDate';
import { addFollowingComic, deleteFollowingComic, getCountFollow } from '~/store/followSlice';
import { apiCheckFollowing } from '~/services/follow';
import { ALL } from '~/util/constants';
import { DataContext } from '~/context/GlobalState';
import Comment from '~/components/Comment/Comment';
import { commentSlice } from '~/store/commentSlice';

function ComicDetail() {
    const { slug } = useParams();

    const state = useContext(DataContext);
    const socket = state.socket;

    const dispatch = useDispatch();
    const { comic, getSingleComicStatus } = useSelector(comicSelector);
    const { currentUser } = useSelector(authSelector);
    const { followers, addFollowingComicStatus, deleteFollowingComicStatus } = useSelector(followSelector);
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres + ALL },
        { title: comic?.name, to: routes.comic + slug },
    ];

    const [followingComicList, setFollowingComicList] = useState([]);
    const [totalView, setTotalView] = useState(0);
    const [ratingList, setRatingList] = useState([]);
    const [currentUserRating, setCurrentUserRating] = useState(null);
    const [ratingComic, setRatingComic] = useState({ count: 0, rating: 0 });
    const [isFollowing, setIsFollowing] = useState(false);
    const [countFollow, setCountFollow] = useState(0);
    const [historyChapterList, setHistoryChapterList] = useState([]);

    useEffect(() => {
        const arr = slug.split('-');
        const id = arr[arr.length - 1];
        dispatch(getSingleComic(id));
        dispatch(getCountFollow(id));
    }, [dispatch, slug]);

    // reset comment slice
    useEffect(() => {
        return () => {
            dispatch(commentSlice.actions.reset());
            dispatch(comicSlice.actions.reset());
        };
    }, [dispatch]);

    // set document title
    useEffect(() => {
        if (getSingleComicStatus === 'success') {
            document.title = `${comic?.name} [Tới Chap ${comic?.Chapters[0]?.chapterNumber}] | NetComics`;
        } else {
            document.title = `Đọc truyện tranh online | NetComics`;
        }
    }, [comic?.Chapters, comic?.name, getSingleComicStatus]);

    useEffect(() => {
        if (comic?.Ratings) {
            setRatingList((prev) => [...prev, ...comic?.Ratings]);
        }
        return () => {
            setRatingList([]);
        };
    }, [comic?.Ratings]);

    useEffect(() => {
        if (currentUser && ratingList) {
            const find = ratingList.find((item) => item.userId === currentUser?.id);
            if (find) {
                setCurrentUserRating(find);
            } else {
                setCurrentUserRating(null);
            }
        }
    }, [currentUser, ratingList]);

    useEffect(() => {
        const followingComic = JSON.parse(localStorage.getItem('following-comic'));
        if (followingComic) {
            setFollowingComicList(followingComic);
        }
    }, []);

    useEffect(() => {
        let localHistoryList = [],
            accountHistoryList = [];

        const localArray = JSON.parse(localStorage.getItem('histories'));
        if (localArray?.length > 0) {
            const localFind = localArray.find((i) => i.id === comic?.id);
            if (localFind) {
                localHistoryList = localFind?.chapterIds;
            }
        }

        if (currentUser) {
            const find = comic?.histories?.find((h) => h.id === currentUser?.id);
            if (find) {
                accountHistoryList = find?.History?.chapterIds?.split(',').map((i) => +i);
            }
        }

        if (Array.isArray(localHistoryList) && Array.isArray(accountHistoryList)) {
            if (localHistoryList?.length > 0 || accountHistoryList?.length > 0) {
                const finalArray = Array.from(new Set([...localHistoryList, ...accountHistoryList]));
                setHistoryChapterList(finalArray);
            }
        }
    }, [comic?.histories, comic?.id, currentUser]);

    const fetchApi = useCallback(async () => {
        if (comic && comic.id) {
            const result = await apiCheckFollowing(currentUser?.id, comic.id);
            setIsFollowing(result?.data?.err === 0 ? true : false);
        }
    }, [comic, currentUser?.id]);

    useEffect(() => {
        if (!isNaN(followers)) {
            setCountFollow(followers);
        }
    }, [followers]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    useEffect(() => {
        if (addFollowingComicStatus === 'success') {
            fetchApi();
            const arr = slug.split('-');
            const id = arr[arr.length - 1];
            dispatch(getCountFollow(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addFollowingComicStatus, dispatch, slug]);

    useEffect(() => {
        if (deleteFollowingComicStatus === 'success') {
            fetchApi();
            const arr = slug.split('-');
            const id = arr[arr.length - 1];
            dispatch(getCountFollow(id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteFollowingComicStatus, dispatch, slug]);

    // calculate view count
    useEffect(() => {
        const total = comic?.Chapters?.reduce((acc, chap) => acc + chap.view, 0);
        setTotalView(total);
    }, [comic?.Chapters]);

    // calculate rating
    useEffect(() => {
        if (ratingList.length > 0) {
            const total = ratingList.length;
            const totalRating = ratingList.reduce((acc, cur) => acc + cur?.rating, 0);

            if (total && totalRating) {
                const rating = (totalRating / total).toFixed(1);
                setRatingComic({ count: total, rating: rating });
            }
        } else {
            setRatingComic({ count: 0, rating: 0 });
        }
    }, [ratingList]);

    // Realtime
    useEffect(() => {
        if (socket) {
            if (comic?.id) {
                socket.emit('comic:join-room', comic?.id);
            }
        }
    }, [comic?.id, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('rating:send-create', (data) => {
                setRatingList((prev) => [data, ...prev]);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('rating:send-delete', (userId) => {
                setRatingList((prev) => prev.filter((x) => x?.userId !== userId));
            });
        }
    }, [socket]);

    const handleFollowingComic = (comic) => {
        if (currentUser) {
            dispatch(addFollowingComic({ userId: currentUser.id, comicId: comic?.id }));
        }
        const checkFollowing = followingComicList.find((followComic) => followComic === comic?.id);
        if (!checkFollowing) {
            const newFollowingComic = [...followingComicList, comic?.id];
            localStorage.setItem('following-comic', JSON.stringify(newFollowingComic));
            setFollowingComicList(newFollowingComic);
        }
    };

    const handleRemoveFollowingComic = (comic) => {
        if (currentUser) {
            dispatch(deleteFollowingComic({ userId: currentUser.id, comicId: comic?.id }));
        }
        const newFollowingComic = followingComicList.filter((item) => item !== comic?.id);
        localStorage.setItem('following-comic', JSON.stringify(newFollowingComic));
        setFollowingComicList(newFollowingComic);
    };

    // handle delete rating
    const handleDeleteRating = () => {
        if (socket) {
            socket.emit('rating:delete', { userId: currentUser?.id, comicId: comic?.id });
        }
    };

    return (
        <>
            {getSingleComicStatus !== 'pending' && <Breadcrumb list={breadcrumb} />}
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <div className="item-detail">
                            <ComicItemDetail
                                skeleton={getSingleComicStatus === 'pending'}
                                id={comic?.id}
                                slug={slug}
                                name={comic?.name}
                                otherName={comic?.otherName && comic.otherName}
                                updateAt={comic?.updatedAt}
                                imageUrl={comic?.image}
                                status={comic?.status}
                                authors={comic?.Authors}
                                genres={comic?.Genres}
                                countFollow={countFollow}
                                view={totalView}
                                ratingList={ratingList}
                                currentUserRating={currentUserRating}
                                rating={ratingComic}
                                content={comic?.content}
                                chapters={comic?.Chapters}
                                isFollowing={isFollowing}
                                followingComicList={followingComicList}
                                onAddFollowing={() => handleFollowingComic(comic)}
                                onRemoveFollowing={() => handleRemoveFollowingComic(comic)}
                                onDeleteRating={handleDeleteRating}
                            />

                            {getSingleComicStatus !== 'pending' && (
                                <div className="list-chapter">
                                    <Title leftIcon={<RiListUnordered />} borderBottom uppercase>
                                        Danh sách chương
                                    </Title>

                                    {Array.isArray(comic?.Chapters) && comic.Chapters.length > 0 ? (
                                        <>
                                            <div className="row row-heading">
                                                <div className="col-5">Số chương</div>
                                                <div className="col-4 text-center">Cập nhật</div>
                                                <div className="col-3 text-center">Xem</div>
                                            </div>

                                            <div className="chapters">
                                                {comic?.Chapters?.map((item, index) => (
                                                    <Link
                                                        to={`${routes.comic}${comic.slug}/chap-${item.chapterNumber}-${item.id}`}
                                                        key={index}
                                                        className="row m-0 chapter-item"
                                                    >
                                                        <div
                                                            className={
                                                                'col-5 chapter-number' +
                                                                (historyChapterList?.indexOf(item?.id) !== -1
                                                                    ? ' read'
                                                                    : '')
                                                            }
                                                        >
                                                            Chapter {item.chapterNumber}
                                                            {item.title && `: ${item.title}`}
                                                        </div>
                                                        <div className="col-4 text-center text-nowrap small-info">
                                                            {formatChapterDate(item.chapterUpdatedAt)}
                                                        </div>
                                                        <div className="col-3 text-center small-info">{item.view}</div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="chapters py-4 text-center no-chapter">
                                            Chưa có chương truyện
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {getSingleComicStatus === 'success' && comic?.id && <Comment comicId={comic?.id} all />}
                </div>
                <Sidebar history following />
            </div>
        </>
    );
}

export default ComicDetail;

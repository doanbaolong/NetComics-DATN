import { Link, useParams } from 'react-router-dom';
import { RiListUnordered } from 'react-icons/ri';
import { useCallback, useState } from 'react';

import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import './ComicDetail.scss';
import ComicItemDetail from '~/components/ComicItemDetail';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, comicSelector, followSelector } from '~/store/selector';
import { useEffect } from 'react';
import { getSingleComicBySlug } from '~/store/comicSlice';
import { formatChapterDate } from '~/util/formatDate';
import { addFollowingComic, deleteFollowingComic, getCountFollow } from '~/store/followSlice';
import { apiCheckFollowing } from '~/services/follow';

function ComicDetail() {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const { comic } = useSelector(comicSelector);
    const { currentUser } = useSelector(authSelector);
    const { followers, addFollowingComicStatus, deleteFollowingComicStatus } = useSelector(followSelector);

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres },
        { title: comic?.name, to: routes.comic + slug },
    ];

    const [followingComicList, setFollowingComicList] = useState([]);
    const [totalView, setTotalView] = useState(0);
    const [ratingComic, setRatingComic] = useState({ count: 0, rating: 0 });
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const followingComic = JSON.parse(localStorage.getItem('following-comic'));
        if (followingComic) {
            setFollowingComicList(followingComic);
        }
    }, []);

    useEffect(() => {
        dispatch(getSingleComicBySlug(slug));
        dispatch(getCountFollow(slug));
    }, [dispatch, slug]);

    const fetchApi = useCallback(async () => {
        if (comic && comic.id) {
            const result = await apiCheckFollowing(currentUser?.id, comic.id);
            setIsFollowing(result?.data?.err === 0 ? true : false);
        }
    }, [comic, currentUser?.id]);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    useEffect(() => {
        if (addFollowingComicStatus === 'success') {
            fetchApi();
            dispatch(getCountFollow(slug));
        }
    }, [addFollowingComicStatus, dispatch, fetchApi, slug]);

    useEffect(() => {
        if (deleteFollowingComicStatus === 'success') {
            fetchApi();
            dispatch(getCountFollow(slug));
        }
    }, [deleteFollowingComicStatus, dispatch, fetchApi, slug]);

    useEffect(() => {
        const total = comic?.Chapters?.reduce((acc, chap) => acc + chap.view, 0);
        setTotalView(total);
    }, [comic?.Chapters]);

    useEffect(() => {
        if (comic?.Ratings) {
            const total = comic.Ratings?.length;
            const totalRating = comic.Ratings?.reduce((acc, cur) => acc + cur?.rating, 0);

            if (total && totalRating) {
                const rating = (totalRating / total).toFixed(1);
                setRatingComic({ count: total, rating: rating });
            }
        }
    }, [comic?.Ratings]);

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

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <div className="item-detail">
                            <ComicItemDetail
                                id={comic?.id}
                                name={comic?.name}
                                otherName={comic?.otherName && comic.otherName}
                                updateAt={comic?.updatedAt}
                                imageUrl={comic?.image}
                                status={comic?.status}
                                authors={comic?.Authors}
                                genres={comic?.Genres}
                                countFollow={followers}
                                view={totalView}
                                rating={ratingComic}
                                content={comic?.content}
                                isFollowing={isFollowing}
                                followingComicList={followingComicList}
                                onAddFollowing={() => handleFollowingComic(comic)}
                                onRemoveFollowing={() => handleRemoveFollowingComic(comic)}
                            />

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
                                                    <div className="col-5">Chapter {item.chapterNumber}</div>
                                                    <div className="col-4 text-center text-nowrap small-info">
                                                        {formatChapterDate(item.chapterUpdatedAt)}
                                                    </div>
                                                    <div className="col-3 text-center small-info">{item.view}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="chapters py-4 text-center">Chưa có chương truyện</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar history following />
            </div>
        </>
    );
}

export default ComicDetail;

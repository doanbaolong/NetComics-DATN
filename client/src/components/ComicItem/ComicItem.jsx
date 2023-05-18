import { memo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import './ComicItem.scss';
import noImage from '~/assets/images/no-image.jpg';
import { formatChapterDate } from '~/util/formatDate';
import routes from '~/config/routes';
import { deleteHistoryComic, getHistoryComics } from '~/store/historySlice';
import { deleteFollowingComic, getFollowingComics } from '~/store/followSlice';
import { authSelector, followSelector, historySelector } from '~/store/selector';
import { LIMIT } from '~/util/constants';

function ComicItem({
    id,
    name,
    slug,
    imageUrl,
    view = 0,
    comment = 0,
    follow = 0,
    chapters,
    accountHistory = false,
    accountFollow = false,
    localHistory = false,
    localFollow = false,
    onRemoveLocalHistory,
    onRemoveLocalFollow,
}) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(authSelector);
    const { deleteFollowingComicStatus } = useSelector(followSelector);
    const { deleteHistoryComicStatus } = useSelector(historySelector);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (deleteFollowingComicStatus === 'success') {
            dispatch(
                getFollowingComics({
                    query: { page: searchParams.get('page') ? +searchParams.get('page') - 1 : 0, limit: LIMIT },
                    id: currentUser?.id,
                }),
            );
        }
    }, [currentUser?.id, deleteFollowingComicStatus, dispatch, searchParams]);

    useEffect(() => {
        if (deleteHistoryComicStatus === 'success') {
            dispatch(
                getHistoryComics({
                    query: { page: searchParams.get('page') ? +searchParams.get('page') - 1 : 0, limit: LIMIT },
                    id: currentUser?.id,
                }),
            );
        }
    }, [currentUser?.id, deleteHistoryComicStatus, dispatch, searchParams]);

    const handleRemoveAccountHistory = (userId, comicId) => {
        dispatch(deleteHistoryComic({ userId, comicId }));
    };

    const handleRemoveAccountFollow = (userId, comicId) => {
        dispatch(deleteFollowingComic({ userId, comicId }));
    };

    return (
        <div className="col-4 col-md-3 comic-item">
            <div className="image">
                <Link to={routes.comic + slug}>
                    <img
                        src={imageUrl ? process.env.REACT_APP_SERVER_URL + imageUrl : noImage}
                        alt={`Truyện tranh ${name}`}
                    />
                </Link>
                <div className="interaction">
                    <>
                        {/* <div className="interaction-item view">
                                <AiFillEye />
                                <span>{view}</span>
                            </div>
                            <div className="interaction-item comment">
                                <FaCommentAlt />
                                <span>{comment}</span>
                            </div>
                            <div className="interaction-item follow">
                                <FaHeart />
                                <span>{follow}</span>
                            </div> */}
                    </>
                </div>
            </div>
            {accountFollow || localFollow ? (
                <div className="d-flex justify-content-end my-2">
                    <button
                        className="remove-btn follow"
                        onClick={() =>
                            accountFollow ? handleRemoveAccountFollow(currentUser?.id, id) : onRemoveLocalFollow(id)
                        }
                    >
                        <ImCross />
                        Bỏ theo dõi
                    </button>
                </div>
            ) : accountHistory || localHistory ? (
                <div className="d-flex justify-content-end my-2">
                    <button
                        className="remove-btn history"
                        onClick={() =>
                            accountHistory ? handleRemoveAccountHistory(currentUser?.id, id) : onRemoveLocalHistory(id)
                        }
                    >
                        <ImCross />
                        Xóa
                    </button>
                </div>
            ) : null}
            <div className="title">
                <Link to={routes.comic + slug}>{name}</Link>
            </div>

            <ul className="chapter-list list-unstyled">
                {chapters?.map((chapter) => (
                    <li key={chapter?.id} className="chapter-item">
                        <Link to={`${routes.comic}${slug}/chap-${chapter?.chapterNumber}-${chapter?.id}`}>
                            Chapter {chapter.chapterNumber}
                        </Link>
                        <i className="time">{formatChapterDate(chapter.chapterUpdatedAt)}</i>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default memo(ComicItem);

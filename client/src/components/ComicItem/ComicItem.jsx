import { memo, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
// import { AiFillEye } from 'react-icons/ai';
// import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Tippy from '@tippyjs/react/headless';
import { followCursor } from 'tippy.js';

import './ComicItem.scss';
import noImage from '~/assets/images/no-image.jpg';
import { formatChapterDate } from '~/util/formatDate';
import routes from '~/config/routes';
import { deleteHistoryComic, getHistoryComics } from '~/store/historySlice';
import { deleteFollowingComic, getFollowingComics } from '~/store/followSlice';
import { authSelector, followSelector, historySelector } from '~/store/selector';
import { LIMIT } from '~/util/constants';
import ComicTooltip from '../ComicTooltip/ComicTooltip';

function ComicItem({
    comic,
    view = 0,
    comment = 0,
    follow = 0,
    skeleton = false,
    accountHistory = false,
    accountFollow = false,
    localHistory = false,
    localHistoryList = [],
    localFollow = false,
    onRemoveLocalHistory,
    onRemoveLocalFollow,
}) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(authSelector);
    const { deleteFollowingComicStatus } = useSelector(followSelector);
    const { deleteHistoryComicStatus } = useSelector(historySelector);

    const [searchParams] = useSearchParams();

    const [readingChapter, setReadingChapter] = useState(null);
    const [historyChapterList, setHistoryChapterList] = useState([]);

    useEffect(() => {
        if (localHistory && localHistoryList.length > 0) {
            const history = localHistoryList.find((his) => his?.id === comic?.id);
            if (history) {
                setReadingChapter({
                    chapterId: history.chapterId,
                    chapterNumber: history.chapterNumber,
                    updatedAt: history.updatedAt,
                });
            }
        }
    }, [comic?.id, localHistory, localHistoryList, localHistoryList.length]);

    useEffect(() => {
        let localList = [],
            accountList = [];

        const localArray = JSON.parse(localStorage.getItem('histories'));
        if (localArray?.length > 0) {
            const localFind = localArray.find((i) => i.id === comic?.id);
            if (localFind) {
                localList = localFind?.chapterIds;
            }
        }

        if (currentUser) {
            const find = comic?.histories?.find((h) => h.id === currentUser?.id);
            if (find) {
                accountList = find?.History?.chapterIds?.split(',').map((i) => +i);
            }
        }

        if (Array.isArray(localList) && Array.isArray(accountList)) {
            if (localList?.length > 0 || accountList?.length > 0) {
                const finalArray = Array.from(new Set([...localList, ...accountList]));
                setHistoryChapterList(finalArray);
            }
        }
    }, [comic?.histories, comic?.id, currentUser]);

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
        <div className="col-6 col-sm-4 col-md-3 comic-item">
            <div className={'image' + (skeleton ? ' skeleton' : '')}>
                {skeleton ? null : (
                    <>
                        {(accountHistory || localHistory) &&
                            (accountHistory && comic?.Histories?.length > 0 ? (
                                <Link
                                    to={`${routes.comic}${comic?.slug}/chap-${comic?.Histories[0]?.Chapter?.chapterNumber}-${comic?.Histories[0]?.Chapter?.id}`}
                                    className="interaction reading-chapter"
                                >
                                    Đọc tiếp Chapter {comic?.Histories[0]?.Chapter?.chapterNumber}
                                </Link>
                            ) : (
                                <Link
                                    to={`${routes.comic}${comic?.slug}/chap-${readingChapter?.chapterNumber}-${readingChapter?.chapterId}`}
                                    className="interaction reading-chapter"
                                >
                                    Đọc tiếp Chapter {readingChapter?.chapterNumber}
                                </Link>
                            ))}

                        <Link to={`${routes.comic}${comic?.slug}-${comic?.id}`} className="img-link">
                            <LazyLoadImage
                                src={comic?.image ? process.env.REACT_APP_SERVER_URL + comic?.image : noImage}
                                alt={`Truyện tranh ${comic?.name}`}
                                effect="opacity"
                                title={`Truyện tranh ${comic?.name}`}
                            />
                        </Link>
                        {/* <div className="interaction">
                            <>
                                <div className="interaction-item view">
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
                            </div>
                            </>
                        </div> */}
                    </>
                )}
            </div>
            {accountFollow || localFollow ? (
                <div className="d-flex justify-content-end my-2">
                    {skeleton ? (
                        <span className="skeleton skeleton-text"></span>
                    ) : (
                        <button
                            className="remove-btn follow"
                            onClick={() =>
                                accountFollow
                                    ? handleRemoveAccountFollow(currentUser?.id, comic?.id)
                                    : onRemoveLocalFollow(comic?.id)
                            }
                        >
                            <ImCross />
                            Bỏ theo dõi
                        </button>
                    )}
                </div>
            ) : accountHistory || localHistory ? (
                <div className="read-action">
                    {skeleton ? (
                        <span className="skeleton skeleton-text"></span>
                    ) : (
                        <>
                            <span className="read-time">
                                {(accountHistory && comic?.Histories?.length) > 0
                                    ? formatChapterDate(comic?.Histories[0]?.updatedAt)
                                    : null}
                                {localHistory && localHistoryList.length > 0
                                    ? formatChapterDate(readingChapter?.updatedAt)
                                    : null}
                            </span>
                            <button
                                className="remove-btn history"
                                onClick={() =>
                                    accountHistory
                                        ? handleRemoveAccountHistory(currentUser?.id, comic?.id)
                                        : onRemoveLocalHistory(comic?.id)
                                }
                            >
                                <ImCross />
                                Xóa
                            </button>
                        </>
                    )}
                </div>
            ) : null}

            {skeleton ? (
                <>
                    <div className="title">
                        <p className="skeleton skeleton-text"></p>
                        <p className="skeleton skeleton-text"></p>
                    </div>
                </>
            ) : (
                <div>
                    <Tippy
                        followCursor
                        plugins={[followCursor]}
                        placement="bottom-start"
                        render={(attrs) => (
                            <div className="comic-tooltip" tabIndex="-1" {...attrs}>
                                <ComicTooltip comic={comic} />
                            </div>
                        )}
                    >
                        <div className="title">
                            <Link to={`${routes.comic}${comic?.slug}-${comic?.id}`}>{comic?.name}</Link>
                        </div>
                    </Tippy>
                </div>
            )}

            {skeleton ? (
                <ul className="chapter-list list-unstyled">
                    <li className="chapter-item">
                        <span className="skeleton skeleton-text"></span>
                        <i className="time skeleton skeleton-text"></i>
                    </li>
                    <li className="chapter-item">
                        <span className="skeleton skeleton-text"></span>
                        <i className="time skeleton skeleton-text"></i>
                    </li>
                    <li className="chapter-item">
                        <span className="skeleton skeleton-text"></span>
                        <i className="time skeleton skeleton-text"></i>
                    </li>
                </ul>
            ) : (
                <ul className="chapter-list list-unstyled">
                    {comic?.Chapters?.map((chapter) => (
                        <li key={chapter?.id} className="chapter-item">
                            <Link
                                className={
                                    'chapter-number' + (historyChapterList?.indexOf(chapter?.id) !== -1 ? ' read' : '')
                                }
                                to={`${routes.comic}${comic?.slug}/chap-${chapter?.chapterNumber}-${chapter?.id}`}
                            >
                                Chapter {chapter.chapterNumber}
                            </Link>
                            <i className="time">{formatChapterDate(chapter.chapterUpdatedAt)}</i>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default memo(ComicItem);

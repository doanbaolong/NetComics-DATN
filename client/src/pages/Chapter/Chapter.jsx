import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { RiInformationFill } from 'react-icons/ri';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';
import { FaList } from 'react-icons/fa';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import moment from 'moment';

import './Chapter.scss';
import Breadcrumb from '~/components/Breadcrumb';
import routes from '~/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, chapterSelector } from '~/store/selector';
import { useEffect } from 'react';
import { comicSlice } from '~/store/comicSlice';
import { formatComicDate } from '~/util/formatDate';
import { chapterSlice, getSingleChapter } from '~/store/chapterSlice';
import { apiViewChapter } from '~/services/chapter';
import { addHistoryComic } from '~/store/historySlice';
import Comment from '~/components/Comment/Comment';
import { ALL } from '~/util/constants';
import NotFound from '../NotFound/NotFound';
import { DataContext } from '~/context/GlobalState';
import Loading from '~/components/Loading/Loading';
import { commentSlice } from '~/store/commentSlice';

function Chapter() {
    const { slug, chapterSlug } = useParams();

    const dispatch = useDispatch();
    const { chapter, getSingleChapterStatus } = useSelector(chapterSelector);
    const { currentUser } = useSelector(authSelector);

    const navigate = useNavigate();

    const state = useContext(DataContext);
    const socket = state.socket;

    // const [chapter?.Comic, setchapter?.Comic] = useState(null);
    const [prevChapter, setPrevChapter] = useState('');
    const [nextChapter, setNextChapter] = useState('');
    const [viewed, setViewed] = useState(false);
    const [historyComicList, setHistoryComicList] = useState([]);

    const chapterNavRef = useRef();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres + ALL },
        { title: chapter?.Comic?.name, to: `${routes.comic}${chapter?.Comic?.slug}-${chapter?.Comic?.id}` },
        { title: `Chapter ${chapter?.chapterNumber}`, to: `${routes.comic}${slug}/${chapterSlug}` },
    ];

    // Realtime
    useEffect(() => {
        if (socket && chapter?.id) {
            socket.emit('chapter:join-room', chapter?.id);
        }
    }, [chapter?.id, socket]);

    useEffect(() => {
        if (chapterNavRef?.current) {
            let sticky = chapterNavRef?.current?.offsetTop;
            const handleScroll = () => {
                if (window.scrollY > sticky) {
                    chapterNavRef?.current?.classList.add('sticky');
                } else {
                    chapterNavRef?.current?.classList.remove('sticky');
                }
            };

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    useEffect(() => {
        const arr = chapterSlug.split('-');
        const chapterId = arr[arr.length - 1];
        if (chapterId) {
            dispatch(getSingleChapter(chapterId));
        }
    }, [chapterSlug, dispatch]);

    // set document title
    useEffect(() => {
        if (getSingleChapterStatus === 'success') {
            document.title = `${chapter?.Comic?.name} Chap ${chapter?.chapterNumber} | NetComics`;
        } else {
            document.title = 'NetComics';
        }
    }, [chapter?.chapterNumber, chapter?.Comic?.name, getSingleChapterStatus, chapter?.Comic]);

    // reset comment store when unmounted
    useEffect(() => {
        return () => {
            setViewed(false);
            dispatch(comicSlice.actions.reset());
            dispatch(chapterSlice.actions.reset());
            dispatch(commentSlice.actions.reset());
        };
    }, [dispatch, chapterSlug]);

    // handle events change chapters
    useEffect(() => {
        if (chapter && chapter?.Comic?.Chapters) {
            const chapterFind = chapter?.Comic.Chapters.find((item) => item.id === chapter?.id);
            const index = chapterFind && chapter?.Comic?.Chapters.indexOf(chapterFind);
            if (index >= 0 && index < chapter?.Comic?.Chapters.length - 1) {
                setPrevChapter(
                    `${routes.comic}${slug}/chap-${chapter?.Comic?.Chapters[index + 1]?.chapterNumber}-${
                        chapter?.Comic.Chapters[index + 1]?.id
                    }`,
                );
            } else {
                setPrevChapter('');
            }
            if (index > 0 && index <= chapter?.Comic.Chapters.length - 1) {
                setNextChapter(
                    `${routes.comic}${slug}/chap-${chapter?.Comic?.Chapters[index - 1]?.chapterNumber}-${
                        chapter?.Comic.Chapters[index - 1]?.id
                    }`,
                );
            } else {
                setNextChapter('');
            }
        }
    }, [chapter, chapter?.Comic?.Chapters, slug]);

    // get history from local storage
    useEffect(() => {
        const historyComic = JSON.parse(localStorage.getItem('histories'));
        if (historyComic) {
            setHistoryComicList(historyComic);
        }
    }, []);

    // increase view and add to history
    useEffect(() => {
        const handleView = async () => {
            if (getSingleChapterStatus === 'success' && chapter?.Comic) {
                setViewed(true);
                await apiViewChapter(chapter?.id);
            }
        };

        const handleHistory = () => {
            if (getSingleChapterStatus === 'success' && chapter?.Comic) {
                if (currentUser) {
                    let historyChapterIds = [],
                        readingChapter = null;
                    if (chapter?.Comic?.histories && chapter?.Comic?.histories?.length > 0) {
                        const historyFind = chapter?.Comic?.histories?.find(
                            (history) => history.id === currentUser?.id,
                        );
                        if (historyFind) {
                            const arr = historyFind?.History?.chapterIds?.split(',').map((str) => +str);
                            historyChapterIds = [...arr];
                            readingChapter = historyFind?.History?.chapterId;
                        }
                    }

                    if (historyChapterIds?.indexOf(chapter?.id) === -1) {
                        const chapterIds = [...historyChapterIds, chapter?.id];
                        dispatch(
                            addHistoryComic({
                                userId: currentUser.id,
                                comicId: chapter?.Comic?.id,
                                chapterIds: chapterIds.join(),
                                chapterId: chapter?.id,
                            }),
                        );
                    } else {
                        if (readingChapter && chapter?.id !== readingChapter) {
                            dispatch(
                                addHistoryComic({
                                    userId: currentUser.id,
                                    comicId: chapter?.Comic?.id,
                                    chapterIds: historyChapterIds.join(),
                                    chapterId: chapter?.id,
                                }),
                            );
                        }
                    }
                }

                let newHistoryComic = [];
                const checkHistory = historyComicList.find((historyComic) => historyComic.id === chapter?.Comic?.id);
                if (!checkHistory) {
                    newHistoryComic = [
                        ...historyComicList,
                        {
                            id: chapter?.Comic?.id,
                            chapterIds: [chapter?.id],
                            chapterId: chapter?.id,
                            chapterNumber: chapter?.chapterNumber,
                            updatedAt: moment(),
                        },
                    ];
                } else {
                    const index = historyComicList.findIndex((historyComic) => historyComic.id === chapter?.Comic?.id);
                    newHistoryComic = [...historyComicList];
                    if (checkHistory?.chapterIds?.indexOf(chapter?.id) === -1) {
                        newHistoryComic.splice(index, 1, {
                            ...checkHistory,
                            chapterIds: [...checkHistory?.chapterIds, chapter?.id],
                            chapterId: chapter?.id,
                            chapterNumber: chapter?.chapterNumber,
                            updatedAt: moment(),
                        });
                    } else {
                        newHistoryComic.splice(index, 1, {
                            ...checkHistory,
                            chapterId: chapter?.id,
                            chapterNumber: chapter?.chapterNumber,
                            updatedAt: moment(),
                        });
                    }
                }
                localStorage.setItem('histories', JSON.stringify(newHistoryComic));
                setHistoryComicList(newHistoryComic);
            }
        };

        if (!viewed) {
            handleView();
            handleHistory();
        }

        // return () => clearTimeout(timeoutId);
    }, [
        chapter?.Comic,
        chapter?.chapterNumber,
        chapter?.id,
        currentUser,
        dispatch,
        getSingleChapterStatus,
        historyComicList,
        viewed,
    ]);

    const handleChangeChapter = (e) => {
        navigate(e.target.value);
    };

    return getSingleChapterStatus === 'rejected' ? (
        <NotFound />
    ) : getSingleChapterStatus === 'pending' ? (
        <Loading process />
    ) : (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content chapter">
                <div className="content">
                    <div className="items">
                        <h3 className="mb-3">
                            <Link
                                to={`${routes.comic}${chapter?.Comic?.slug}-${chapter?.Comic?.id}`}
                                className="comic-link"
                            >
                                {chapter?.Comic?.name}
                            </Link>
                            <span> - Chapter {chapter?.chapterNumber}</span>
                            <span className="updated-time">[Cập nhật lúc {formatComicDate(chapter?.updatedAt)}]</span>
                        </h3>
                    </div>
                    <div className="reading-control">
                        <div className="alert alert-primary" role="alert">
                            <RiInformationFill />
                            <span className="title mx-3">
                                Sử dụng mũi tên trái ( <CgChevronLeftR /> ) hoặc phải ( <CgChevronRightR /> ) để chuyển
                                chapter
                            </span>
                        </div>
                        <div
                            ref={chapterNavRef}
                            className="chapter-nav d-flex align-items-center justify-content-center"
                        >
                            <Link to={routes.home} className="home" title="Trang chủ">
                                <AiFillHome />
                            </Link>
                            <Link
                                to={`${routes.comic}${slug}`}
                                className="comic"
                                title={`Truyện tranh ${chapter?.Comic?.name}`}
                            >
                                <FaList />
                            </Link>
                            <Link
                                to={prevChapter && prevChapter}
                                className={
                                    'select-btn prev' +
                                    (chapter?.Comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber ===
                                        chapter?.Comic.Chapters[chapter?.Comic.Chapters.length - 1]?.chapterNumber
                                        ? ' disabled'
                                        : '')
                                }
                            >
                                <GoChevronLeft />
                            </Link>
                            {chapter?.Comic?.Chapters &&
                                (chapter?.Comic?.Chapters?.length < 100 ? (
                                    <select
                                        key={chapter?.chapterNumber}
                                        className="chapter-list"
                                        defaultValue={`${routes.comic}${slug}/chap-${chapter?.chapterNumber}-${chapter?.id}`}
                                        onChange={handleChangeChapter}
                                    >
                                        {chapter?.Comic?.Chapters.map((item, index) => (
                                            <option
                                                key={item.id}
                                                value={`${routes.comic}${slug}/chap-${item.chapterNumber}-${item.id}`}
                                            >
                                                Chapter {item.chapterNumber}
                                                {item.title && `: ${item.title}`}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <>
                                        <select
                                            className="chapter-list"
                                            data-bs-toggle="modal"
                                            data-bs-target="#chapterModal"
                                            disabled
                                        >
                                            <option value="">Chapter 1</option>
                                        </select>

                                        <div
                                            className="modal modal-lg chapter-modal"
                                            id="chapterModal"
                                            tabIndex="-1"
                                            aria-labelledby="chapterModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <input
                                                            type="text"
                                                            name=""
                                                            className="form-control search-chapter"
                                                            placeholder="Nhập số chap"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        ></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="row">
                                                            {chapter?.Comic?.Chapters.map((item, index) => (
                                                                <div className="col-6 col-sm-4 col-md-3">
                                                                    <Link
                                                                        key={item.id}
                                                                        to={`${routes.comic}${slug}/chap-${item.chapterNumber}-${item.id}`}
                                                                        className={
                                                                            item.chapterNumber === chapter.chapterNumber
                                                                                ? 'active'
                                                                                : ''
                                                                        }
                                                                    >
                                                                        Chapter {item.chapterNumber}
                                                                    </Link>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary chapter-list-close"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Đóng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            <Link
                                to={nextChapter && nextChapter}
                                className={
                                    'select-btn next' +
                                    (chapter?.Comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === chapter?.Comic.Chapters[0]?.chapterNumber
                                        ? ' disabled'
                                        : '')
                                }
                            >
                                <GoChevronRight />
                            </Link>
                        </div>
                    </div>

                    <div className="chapter-images">
                        {chapter?.pictureUrls &&
                            JSON.parse(chapter.pictureUrls).map((url, index) => (
                                <div key={index} className="chapter-page">
                                    <div className="chapter-picture">
                                        <LazyLoadImage
                                            src={url}
                                            alt={`${chapter?.Comic?.name} chap ${chapter?.chapterNumber} - Trang ${
                                                index + 1
                                            }`}
                                            className="img-fluid"
                                            effect="opacity"
                                        />
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="chapter-bottom">
                        <div className="chapter-nav-bottom d-flex justify-content-center">
                            <Link
                                to={prevChapter && prevChapter}
                                className={
                                    'me-3 select-btn' +
                                    (chapter?.Comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber ===
                                        chapter?.Comic.Chapters[chapter?.Comic.Chapters.length - 1]?.chapterNumber
                                        ? ' disabled'
                                        : '')
                                }
                            >
                                <GoChevronLeft />
                                <span>Chap trước</span>
                            </Link>
                            <Link
                                to={nextChapter && nextChapter}
                                className={
                                    'me-3 select-btn' +
                                    (chapter?.Comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === chapter?.Comic.Chapters[0]?.chapterNumber
                                        ? ' disabled'
                                        : '')
                                }
                            >
                                <span>Chap sau</span>
                                <GoChevronRight />
                            </Link>
                        </div>
                    </div>
                    <Breadcrumb list={breadcrumb} />

                    {chapter?.Comic && getSingleChapterStatus === 'success' && chapter?.id && (
                        <Comment chapterId={chapter?.id} comicId={chapter?.comicId} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Chapter;

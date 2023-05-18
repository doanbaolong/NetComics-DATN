import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { RiInformationFill } from 'react-icons/ri';
import { CgChevronLeftR, CgChevronRightR } from 'react-icons/cg';
import { AiFillHome } from 'react-icons/ai';
import { FaList } from 'react-icons/fa';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import './Chapter.scss';
import Breadcrumb from '~/components/Breadcrumb';
import routes from '~/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, chapterSelector, comicSelector } from '~/store/selector';
import { useEffect } from 'react';
import { getSingleComic } from '~/store/comicSlice';
import { formatComicDate } from '~/util/formatDate';
import { getSingleChapter } from '~/store/chapterSlice';
import { apiViewChapter } from '~/services/chapter';
import { addHistoryComic } from '~/store/historySlice';
import Comment from '~/components/Comment/Comment';

function Chapter() {
    const { slug, chapterSlug } = useParams();

    const dispatch = useDispatch();
    const { comic } = useSelector(comicSelector);
    const { chapter } = useSelector(chapterSelector);
    const { currentUser } = useSelector(authSelector);

    const navigate = useNavigate();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Thể loại', to: routes.genres },
        { title: comic?.name, to: `${routes.comic}${slug}` },
        { title: `Chapter ${chapter?.chapterNumber}`, to: `${routes.comic}${slug}/${chapterSlug}` },
    ];

    const [chapterId, setChapterId] = useState(0);
    const [prevChapter, setPrevChapter] = useState('');
    const [nextChapter, setNextChapter] = useState('');
    const [viewed, setViewed] = useState(false);
    const [historyComicList, setHistoryComicList] = useState([]);

    useEffect(() => {
        const arr = chapterSlug.split('-');
        setChapterId(arr[arr.length - 1]);
    }, [chapterSlug]);

    useEffect(() => {
        dispatch(getSingleChapter(chapterId));
    }, [chapterSlug, chapterId, dispatch]);

    useEffect(() => {
        if (chapter && chapter.comicId) {
            dispatch(getSingleComic(chapter.comicId));
        }
    }, [chapter, chapter.comicId, dispatch]);

    useEffect(() => {
        if (chapter && comic?.Chapters) {
            const chapterFind = comic.Chapters.find((item) => item.id === chapter?.id);
            const index = chapterFind && comic?.Chapters.indexOf(chapterFind);
            if (index >= 0 && index < comic?.Chapters.length - 1) {
                setPrevChapter(
                    `${routes.comic}${slug}/chap-${comic?.Chapters[index + 1]?.chapterNumber}-${
                        comic.Chapters[index + 1]?.id
                    }`,
                );
            } else {
                setPrevChapter('');
            }
            if (index > 0 && index <= comic.Chapters.length - 1) {
                setNextChapter(
                    `${routes.comic}${slug}/chap-${comic?.Chapters[index - 1]?.chapterNumber}-${
                        comic.Chapters[index - 1]?.id
                    }`,
                );
            } else {
                setNextChapter('');
            }
        }
    }, [chapter, comic?.Chapters, slug]);

    useEffect(() => {
        const historyComic = JSON.parse(localStorage.getItem('histories'));
        if (historyComic) {
            setHistoryComicList(historyComic);
        }
    }, []);

    useEffect(() => {
        const handleView = async () => {
            setViewed(true);
            await apiViewChapter(chapter?.id);
        };

        const handleHistory = () => {
            if (currentUser) {
                dispatch(addHistoryComic({ userId: currentUser.id, comicId: comic?.id }));
            }
            const checkHistory = historyComicList.find((historyComic) => historyComic === comic?.id);
            if (!checkHistory) {
                const newHistoryComic = [...historyComicList, comic?.id];
                localStorage.setItem('histories', JSON.stringify(newHistoryComic));
                setHistoryComicList(newHistoryComic);
            }
        };

        const timeoutId = setTimeout(() => {
            if (!viewed) {
                handleView();
                handleHistory();
            }
        }, 10000);

        return () => clearTimeout(timeoutId);
    }, [chapter?.id, comic, currentUser, dispatch, historyComicList, viewed]);

    const handleChangeChapter = (e) => {
        navigate(e.target.value);
    };
    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content chapter">
                <div className="content">
                    <div className="items">
                        <h3 className="mb-3">
                            <Link to={`${routes.comic}${slug}`} className="comic-link">
                                {comic?.name}
                            </Link>
                            <span> - Chapter {chapter?.chapterNumber}</span>
                            <span className="updated-time">[Cập nhật lúc {formatComicDate(chapter?.updatedAt)}]</span>
                        </h3>
                    </div>
                    <div className="reading-control">
                        <div
                            className="alert alert-primary d-flex align-items-center justify-content-center"
                            role="alert"
                        >
                            <RiInformationFill />
                            <span className="title mx-3">
                                Sử dụng mũi tên trái ( <CgChevronLeftR /> ) hoặc phải ( <CgChevronRightR /> ) để chuyển
                                chapter
                            </span>
                        </div>
                        <div className="chapter-nav d-flex align-items-center justify-content-center">
                            <Link to={routes.home} title="Trang chủ">
                                <AiFillHome />
                            </Link>
                            <Link to={`${routes.comic}${slug}`} title={`Truyện tranh ${comic?.name}`}>
                                <FaList />
                            </Link>
                            <Link
                                to={prevChapter && prevChapter}
                                className={
                                    'select-btn prev' +
                                    (comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === comic.Chapters[comic.Chapters.length - 1]?.chapterNumber
                                        ? ' disabled'
                                        : '')
                                }
                            >
                                <GoChevronLeft />
                            </Link>
                            {comic?.Chapters &&
                                (comic?.Chapters?.length < 100 ? (
                                    <select
                                        key={chapter?.chapterNumber}
                                        className="chapter-list"
                                        defaultValue={`${routes.comic}${slug}/chap-${chapter?.chapterNumber}-${chapter?.id}`}
                                        onChange={handleChangeChapter}
                                    >
                                        {comic?.Chapters.map((item, index) => (
                                            <option
                                                key={item.id}
                                                value={`${routes.comic}${slug}/chap-${item.chapterNumber}-${item.id}`}
                                            >
                                                Chapter {item.chapterNumber}
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
                                                            {comic?.Chapters.map((item, index) => (
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
                                    (comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === comic.Chapters[0]?.chapterNumber
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
                                    <img src={url} alt="" className="img-fluid" />
                                </div>
                            ))}
                    </div>

                    <div className="chapter-bottom">
                        <div className="chapter-nav-bottom d-flex justify-content-center">
                            <Link
                                to={prevChapter && prevChapter}
                                className={
                                    'btn btn-secondary me-3 select-btn' +
                                    (comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === comic.Chapters[comic.Chapters.length - 1]?.chapterNumber
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
                                    'btn btn-secondary me-3 select-btn' +
                                    (comic?.Chapters?.length > 0 &&
                                    chapter?.chapterNumber === comic.Chapters[0]?.chapterNumber
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

                    <Comment chapterId={chapter?.id} comicId={chapter?.comicId} />
                </div>
            </div>
        </>
    );
}

export default Chapter;

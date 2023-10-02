import { Link } from 'react-router-dom';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, historySelector } from '~/store/selector';
import { memo, useEffect, useState } from 'react';
import { getHistoryComics, getHistoryComicsByComicIds } from '~/store/historySlice';
import routes from '~/config/routes';
import noImage from '~/assets/images/no-image.jpg';
import Spinner from '~/components/Spinner/Spinner';
import { FaCaretRight } from 'react-icons/fa';

function HistoryComic() {
    const dispatch = useDispatch();
    const { histories, getHistoryComicsStatus } = useSelector(historySelector);
    const { currentUser } = useSelector(authSelector);

    const [localHistoryList, setLocalHistoryList] = useState([]);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getHistoryComics({ query: { page: 0, type: 'less' }, id: currentUser?.id }));
        } else {
            const historyComicList = JSON.parse(localStorage.getItem('histories')) || [];
            const arr = historyComicList.map((item) => item.id);
            dispatch(getHistoryComicsByComicIds({ page: 0, type: 'less', ids: arr.join() }));
            setLocalHistoryList(historyComicList);
        }
    }, [currentUser?.id, dispatch]);

    const findComic = (id) => {
        if (localHistoryList?.length > 0) {
            const comic = localHistoryList.find((h) => h.id === id);
            return comic;
        }
    };

    return (
        <>
            <SideWrapper
                title="Lịch sử đọc truyện"
                viewAll
                viewAllUrl={currentUser ? routes.historyAccount : routes.history}
            >
                {getHistoryComicsStatus === 'pending' ? (
                    <div className="sidebar-loading">
                        <Spinner />
                    </div>
                ) : (
                    <div className="side-list">
                        {histories?.length > 0 ? (
                            histories?.map((comic, index) => (
                                <SideComicItem
                                    key={index}
                                    imageUrl={comic?.image ? process.env.REACT_APP_SERVER_URL + comic?.image : noImage}
                                    name={comic?.name}
                                    slug={comic?.slug}
                                    comicUrl={`${routes.comic}${comic?.slug}-${comic?.id}`}
                                >
                                    {currentUser && comic?.Histories?.length > 0 ? (
                                        <Link
                                            to={`${routes.comic}${comic?.slug}/chap-${comic?.Histories[0]?.Chapter?.chapterNumber}-${comic?.Histories[0]?.Chapter?.id}`}
                                            className="reading-chapter"
                                        >
                                            Đọc tiếp Chapter {comic?.Histories[0]?.Chapter?.chapterNumber}
                                            <FaCaretRight />
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`${routes.comic}${comic?.slug}/chap-${
                                                findComic(comic?.id)?.chapterNumber
                                            }-${findComic(comic?.id)?.chapterId}`}
                                            className="reading-chapter"
                                        >
                                            Đọc tiếp Chapter {findComic(comic?.id)?.chapterNumber}
                                            <FaCaretRight />
                                        </Link>
                                    )}
                                </SideComicItem>
                            ))
                        ) : (
                            <p className="no-message">Chưa có truyện nào</p>
                        )}
                    </div>
                )}
            </SideWrapper>
        </>
    );
}

export default memo(HistoryComic);

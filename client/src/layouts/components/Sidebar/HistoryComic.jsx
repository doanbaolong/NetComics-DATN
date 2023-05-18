import { Link } from 'react-router-dom';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, historySelector } from '~/store/selector';
import { useEffect } from 'react';
import { getHistoryComics, getHistoryComicsByComicIds } from '~/store/historySlice';
import routes from '~/config/routes';
import { formatChapterDate } from '~/util/formatDate';
import noImage from '~/assets/images/no-image.jpg';

function HistoryComic() {
    const dispatch = useDispatch();
    const { histories } = useSelector(historySelector);
    const { currentUser } = useSelector(authSelector);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getHistoryComics({ query: { page: 0, type: 'less' }, id: currentUser?.id }));
        } else {
            const historyComicList = JSON.parse(localStorage.getItem('histories')) || [];
            dispatch(getHistoryComicsByComicIds({ page: 0, type: 'less', ids: historyComicList.join() }));
        }
    }, [currentUser?.id, dispatch]);

    return (
        <>
            {histories?.length > 0 && (
                <SideWrapper title="Lịch sử đọc truyện" viewAll viewAllUrl={routes.follow}>
                    {histories?.map((comic, index) => (
                        <SideComicItem
                            key={index}
                            imageUrl={comic?.image ? process.env.REACT_APP_SERVER_URL + comic?.image : noImage}
                            name={comic?.name}
                            slug={comic?.slug}
                            comicUrl={`${routes.comic}${comic?.slug}`}
                        >
                            <div className="d-flex justify-content-between lastest-chapter">
                                <Link
                                    to={`${routes.comic}${comic?.slug}/chap-${comic?.Chapters[0]?.chapterNumber}-${comic?.Chapters[0]?.id}`}
                                    className="number"
                                >
                                    {comic?.Chapters[0] && 'Chapter ' + comic?.Chapters[0].chapterNumber}
                                </Link>
                                <span className="time">
                                    {comic?.Chapters[0] && formatChapterDate(comic?.Chapters[0].chapterUpdatedAt)}
                                </span>
                            </div>
                        </SideComicItem>
                    ))}
                </SideWrapper>
            )}
        </>
    );
}

export default HistoryComic;

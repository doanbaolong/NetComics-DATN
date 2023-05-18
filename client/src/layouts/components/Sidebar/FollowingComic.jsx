import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';
import routes from '~/config/routes';
import { getFollowingComics, getFollowingComicsByComicIds } from '~/store/followSlice';
import { authSelector, followSelector } from '~/store/selector';
import { formatChapterDate } from '~/util/formatDate';
import noImage from '~/assets/images/no-image.jpg';

function FollowingComic() {
    const dispatch = useDispatch();
    const { followingComics } = useSelector(followSelector);
    const { currentUser } = useSelector(authSelector);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getFollowingComics({ query: { page: 0, type: 'less' }, id: currentUser?.id }));
        } else {
            const followingComicList = JSON.parse(localStorage.getItem('following-comic')) || [];
            dispatch(getFollowingComicsByComicIds({ page: 0, type: 'less', ids: followingComicList.join() }));
        }
    }, [currentUser?.id, dispatch]);

    return (
        <>
            {followingComics?.length > 0 && (
                <SideWrapper title="Truyện đang theo dõi" viewAll viewAllUrl={routes.follow}>
                    {followingComics?.map((comic, index) => (
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

export default FollowingComic;

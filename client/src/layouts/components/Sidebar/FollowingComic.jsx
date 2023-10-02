import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideWrapper from '~/components/SideWrapper';
import SideComicItem from '~/components/SideWrapper/SideComicItem';
import routes from '~/config/routes';
import { getFollowingComics, getFollowingComicsByComicIds } from '~/store/followSlice';
import { authSelector, followSelector } from '~/store/selector';
import noImage from '~/assets/images/no-image.jpg';
import Spinner from '~/components/Spinner/Spinner';

function FollowingComic() {
    const dispatch = useDispatch();
    const { followingComics, getFollowingComicsStatus } = useSelector(followSelector);
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
            <SideWrapper
                title="Truyện đang theo dõi"
                viewAll
                viewAllUrl={currentUser ? routes.followAccount : routes.follow}
            >
                {getFollowingComicsStatus === 'pending' ? (
                    <div className="sidebar-loading">
                        <Spinner />
                    </div>
                ) : (
                    <div className="side-list">
                        {followingComics?.length > 0 ? (
                            followingComics?.map((comic, index) => (
                                <SideComicItem
                                    key={index}
                                    id={comic?.id}
                                    imageUrl={comic?.image ? process.env.REACT_APP_SERVER_URL + comic?.image : noImage}
                                    name={comic?.name}
                                    slug={comic?.slug}
                                    comicUrl={`${routes.comic}${comic?.slug}-${comic?.id}`}
                                    following
                                    histories={comic?.histories}
                                    chapter={comic?.Chapters[0]}
                                ></SideComicItem>
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

export default memo(FollowingComic);

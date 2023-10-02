import { memo, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './StarRating.scss';
import { authSelector, comicSelector } from '~/store/selector';
import { useSelector } from 'react-redux';
import Stars from './Stars';
import { DataContext } from '~/context/GlobalState';

function StarRating({ currentUserRating }) {
    const { currentUser } = useSelector(authSelector);
    const { comic } = useSelector(comicSelector);

    const state = useContext(DataContext);
    const socket = state.socket;

    const [rating, setRating] = useState(-1);
    const [hover, setHover] = useState(-1);
    const [currentRating, setCurrentRating] = useState(0);
    const [currentRatingTime, setCurrentRatingTime] = useState();
    const [currentContent, setCurrentContent] = useState('');
    const [isRated, setIsRated] = useState(false);

    const [ratingText, setRatingText] = useState('');

    useEffect(() => {
        if (currentUserRating) {
            setCurrentRating(currentUserRating?.rating);
            setCurrentContent(currentUserRating?.content);
            setCurrentRatingTime(currentUserRating?.createdAt);
        }
    }, [currentUserRating]);

    useEffect(() => {
        if (currentRating > 0) {
            setRating(currentRating);
            setHover(currentRating);
            setIsRated(true);
        }
    }, [currentRating]);

    //Real time

    const handleRating = async (rating, userId, comicId) => {
        if (rating && userId && comicId) {
            if (currentRating <= 0) {
                socket?.emit('rating:create', { rating, userId, comicId });
            }
        }
    };

    const handleChange = (e) => {
        setRatingText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRating({ rating: rating, content: ratingText }, currentUser?.id, comic?.id);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Stars
                    setRating={setRating}
                    setHover={setHover}
                    rating={rating}
                    hover={hover}
                    isRated={isRated}
                    currentRatingTime={currentRatingTime}
                />
                {isRated ? (
                    <>
                        <p className="current-rating">{currentContent || ''}</p>
                    </>
                ) : (
                    <>
                        <textarea
                            className="rating-input"
                            placeholder="Mô tả suy nghĩ của bạn (Không bắt buộc)"
                            value={ratingText}
                            onChange={handleChange}
                        ></textarea>
                        <button className="btn btn-success rating-btn">Đánh giá</button>
                    </>
                )}
            </form>

            <ToastContainer />
        </>
    );
}

export default memo(StarRating);

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { formatComicDate } from '~/util/formatDate';

function Stars({ setRating, setHover, rating, hover, isRated, currentRatingTime, isAll = false }) {
    const ratingStars = [
        { value: 1, title: 'Rất tệ' },
        { value: 2, title: 'Tệ' },
        { value: 3, title: 'Bình thường' },
        { value: 4, title: 'Hay' },
        { value: 5, title: 'Rất hay' },
    ];
    return (
        <div className={'star-rating' + (isRated ? ' disabled medium' : '') + (isAll ? ' small' : '')}>
            {ratingStars.map((ratingStar) => (
                <div
                    key={ratingStar.value}
                    className="stars"
                    onClick={() => setRating(ratingStar.value)}
                    onMouseEnter={() => setHover(ratingStar.value)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <div
                        className={
                            'star fill-star' + (ratingStar.value <= ((rating && hover) || hover) ? ' active' : '')
                        }
                        title={ratingStar.title}
                    >
                        <AiFillStar />
                    </div>
                    <div className="star outline-star">
                        <AiOutlineStar />
                    </div>
                </div>
            ))}
            {isRated && <span className="time-rating">{formatComicDate(currentRatingTime)}</span>}
        </div>
    );
}

export default Stars;

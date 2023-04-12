import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import './StarRating.scss';

function StarRating() {
    const [rating, setRating] = useState(-1);
    const [hover, setHover] = useState(-1);
    const ratingStars = ['Rất tệ', 'Tệ', 'Bình thường', 'Hay', 'Rất hay'];

    return (
        <div className="star-rating">
            {ratingStars.map((ratingStar, index) => (
                <div
                    key={index}
                    className="stars"
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <div
                        className={'star fill-star' + (index <= ((rating && hover) || hover) ? ' active' : '')}
                        title={ratingStar}
                    >
                        <AiFillStar />
                    </div>
                    <div className="star outline-star">
                        <AiOutlineStar />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StarRating;

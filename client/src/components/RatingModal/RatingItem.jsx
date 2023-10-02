import Stars from '../StarRating/Stars';
import './RatingModal.scss';
import noAvatar from '~/assets/images/no-avatar-1.png';
function RatingItem({ rating }) {
    return (
        <div className="rating-item">
            <div className="user-info">
                <div className="avatar-wrapper">
                    <img
                        src={rating?.User?.avatar ? process.env.REACT_APP_SERVER_URL + rating?.User?.avatar : noAvatar}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <span className="name">{rating?.User?.fullName}</span>
            </div>
            <div className="cur-stars">
                <Stars
                    rating={rating?.rating}
                    hover={rating?.rating}
                    isRated
                    isAll
                    currentRatingTime={rating?.createdAt}
                />
            </div>
            <p className="content">{rating?.content}</p>
        </div>
    );
}

export default RatingItem;

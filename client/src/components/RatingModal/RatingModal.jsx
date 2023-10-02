import { memo, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StarRating from '~/components/StarRating';
import routes from '~/config/routes';
import { authSelector } from '~/store/selector';
import noAvatar from '~/assets/images/no-avatar-1.png';
import './RatingModal.scss';
import { AiFillStar } from 'react-icons/ai';
import RatingItem from './RatingItem';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

function RatingModal({ ratingList = [], currentUserRating, ratingAvg, ratingCount, onDeleteRating }) {
    const { currentUser } = useSelector(authSelector);
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {
        if (currentUserRating) {
            setIsRated(true);
        } else {
            setIsRated(false);
        }
    }, [currentUserRating]);

    return (
        <>
            <button
                className="btn btn-primary see-rating"
                type="button"
                data-bs-toggle="modal"
                data-bs-target={'#ratingBackdrop'}
            >
                Xem đánh giá
            </button>

            <div
                className="modal fade"
                id={'ratingBackdrop'}
                tabIndex="-1"
                aria-labelledby={'ratingBackdropLabel'}
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fw-bold" id={'ratingBackdropLabel'}>
                                Đánh giá truyện
                            </h3>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <IoMdClose />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="starRating">
                                <div className="card card-body">
                                    <p className="body-title">Điểm xếp hạng và bài đánh giá</p>
                                    <p className="rating-avg">
                                        {ratingAvg} <AiFillStar />
                                    </p>
                                    <span className="rating-count">
                                        {ratingCount ? `${ratingCount} Bài đánh giá` : 'Chưa có bài đánh giá nào'}{' '}
                                    </span>
                                    <div className="rating-list">
                                        {ratingList?.map((rating, index) => (
                                            <RatingItem key={index} rating={rating} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rating-form">
                            {currentUser ? (
                                isRated ? (
                                    <div className="auth-rating">
                                        <span>Bài đánh giá của bạn:</span>
                                        <StarRating currentUserRating={currentUserRating} />
                                        <div className="dropdown">
                                            <button
                                                className="btn btn-secondary dropdown-toggle"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <HiOutlineDotsHorizontal />
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button
                                                        className="dropdown-item text-center"
                                                        onClick={onDeleteRating}
                                                    >
                                                        <span>Xóa</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="mb-2">Xếp hạng bộ truyện này</p>
                                        <div className="form d-flex flex-start">
                                            <div className="user-avatar">
                                                <img
                                                    src={
                                                        currentUser?.avatar
                                                            ? process.env.REACT_APP_SERVER_URL + currentUser?.avatar
                                                            : noAvatar
                                                    }
                                                    alt="avatar"
                                                />
                                            </div>

                                            <StarRating currentUserRating={currentUserRating} />
                                        </div>
                                    </>
                                )
                            ) : (
                                <div className="card card-body">
                                    <span className="mb-2">Bạn cần đăng nhập để đánh giá truyện? </span>
                                    <Link to={routes.logIn} className="log-in-btn">
                                        Đăng nhập
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(RatingModal);

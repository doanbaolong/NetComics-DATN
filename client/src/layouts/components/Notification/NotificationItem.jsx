import { memo } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';
import { GoCheck } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import noImage from '~/assets/images/no-image.jpg';
import routes from '~/config/routes';
import { formatChapterDate } from '~/util/formatDate';

function NotificationItem({ ref, notification, unreadArr, onMarkAsRead, onRemoveNotification }) {
    return (
        <div ref={ref} className="notify-item-wrapper">
            <Link
                to={`${routes.comic}${notification?.Chapter?.Comic?.slug}/chap-${notification?.Chapter?.chapterNumber}-${notification?.Chapter?.id}`}
                className={'notify-item' + (unreadArr.includes(notification?.id) ? ' unread' : '')}
                onClick={onMarkAsRead}
            >
                <div className="avatar-wrapper">
                    <LazyLoadImage
                        src={
                            notification?.Chapter?.Comic?.image
                                ? process.env.REACT_APP_SERVER_URL + notification?.Chapter?.Comic?.image
                                : noImage
                        }
                        alt="avatar"
                        className="avatar"
                        effect="opacity"
                    />
                </div>

                <div className="d-flex align-items-center">
                    <div className="notify-content">
                        <div className="content">
                            <p>
                                <span>{notification?.Chapter?.Comic?.name}</span> có chương mới{' '}
                                <span>Chapter {notification?.Chapter?.chapterNumber}</span>
                            </p>
                        </div>
                        <span className="time">{formatChapterDate(notification?.createdAt)}</span>
                    </div>
                </div>
            </Link>
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <HiOutlineDotsHorizontal />
                </button>
                <ul className="dropdown-menu notify-item-dropdown">
                    <li>
                        <button className="dropdown-item" onClick={onMarkAsRead}>
                            <GoCheck />
                            <span>
                                {unreadArr.includes(notification?.id) ? 'Đánh dấu là đã đọc' : 'Đánh dấu là chưa đọc'}
                            </span>
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={onRemoveNotification}>
                            <FaRegWindowClose />
                            <span>Gỡ thông báo này</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default memo(NotificationItem);

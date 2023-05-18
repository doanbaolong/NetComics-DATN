import { memo } from 'react';
import { FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import noImage from '~/assets/images/no-image.jpg';
import routes from '~/config/routes';
import { formatChapterDate } from '~/util/formatDate';

function NotificationItem({ notification, unreadArr, onClick }) {
    return (
        <Link
            to={`${routes.comic}${notification?.Chapter?.Comic?.slug}/chap-${notification?.Chapter?.chapterNumber}-${notification?.Chapter?.id}`}
            className="notify-item"
            onClick={onClick}
        >
            <div className="avatar-wrapper">
                <img
                    src={
                        notification?.Chapter?.Comic?.image
                            ? process.env.REACT_APP_SERVER_URL + notification?.Chapter?.Comic?.image
                            : noImage
                    }
                    alt="avatar"
                    className="avatar"
                />
            </div>

            <div className="notify-content">
                <div className="content">
                    <p>
                        <span>{notification?.Chapter?.Comic?.name}</span> có chương mới{' '}
                        <span>Chapter {notification?.Chapter?.chapterNumber}</span>
                    </p>
                </div>
                <span className="time">{formatChapterDate(notification?.createdAt)}</span>
            </div>

            {unreadArr.includes(notification?.id) && (
                <div className="unread">
                    <FaCircle />
                </div>
            )}
        </Link>
    );
}

export default memo(NotificationItem);

import { TbBellFilled, TbBellXFilled } from 'react-icons/tb';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { memo, useContext, useEffect, useState } from 'react';
import { DataContext } from '~/context/GlobalState';
import { Link } from 'react-router-dom';
import '../Header/Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, notificationSelector } from '~/store/selector';
import { getNotifications } from '~/store/notificationSlice';
import NotificationItem from './NotificationItem';

function Notification() {
    const state = useContext(DataContext);
    const socket = state.socket;
    const { notifications } = useSelector(notificationSelector);
    const { currentUser } = useSelector(authSelector);
    const [notificationList, setNotificationList] = useState([]);
    const [unreadArr, setUnreadArr] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getNotifications(currentUser.id));
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        if (notifications) {
            setNotificationList(notifications);
        }
    }, [notifications]);

    useEffect(() => {
        if (notificationList.length > 0) {
            const arr = notificationList.filter((notification) => !notification?.read);
            setUnreadArr(arr?.map((i) => i?.id));
        }
    }, [notificationList]);

    useEffect(() => {
        if (socket) {
            socket.on('getNotification', (data) => {
                setNotificationList((prev) => [data, ...prev]);
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('sendReadNotification', (id) => {
                if (id === -1) {
                    setUnreadArr([]);
                } else {
                    setUnreadArr((prev) => prev.filter((x) => x !== id));
                }
            });
        }
    }, [socket]);

    const handleRead = (id) => {
        socket?.emit('readNotification', { userId: currentUser?.id, id });
    };

    return (
        <div className="nav-item dropdown">
            <Tippy content="Thông báo">
                <Link
                    className="nav-link dropdown-toggle position-relative"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {unreadArr?.length > 0 ? (
                        <span className="position-absolute translate-middle p-2 bg-danger border border-light rounded-circle notify-bagde">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    ) : null}
                    <TbBellFilled />
                </Link>
            </Tippy>
            <div className="dropdown-menu notifications" aria-labelledby="navbarDropdown">
                <div className="title">Thông báo</div>
                {notificationList?.length > 0 ? (
                    <div className="notify-list">
                        <p>
                            <span onClick={() => handleRead(-1)}>Đánh dấu tất cả là đã đọc</span>
                        </p>
                        {notificationList.map((notification, index) => (
                            <NotificationItem
                                key={index}
                                notification={notification}
                                unreadArr={unreadArr}
                                onClick={() => handleRead(notification?.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-notify">
                        <TbBellXFilled />
                        <span>Không có thông báo</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Notification);

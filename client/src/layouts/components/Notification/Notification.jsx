import { TbBellFilled, TbBellXFilled } from 'react-icons/tb';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import { DataContext } from '~/context/GlobalState';
import { Link } from 'react-router-dom';
import '../Header/Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, notificationSelector } from '~/store/selector';
import { getNotifications } from '~/store/notificationSlice';
import NotificationItem from './NotificationItem';
import { toastInfo } from '~/util/toastify';
import { ToastContainer } from 'react-toastify';
import { GoCheck } from 'react-icons/go';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { NOTIFICATION_LIMIT } from '~/util/constants';
import routes from '~/config/routes';

function Notification() {
    const state = useContext(DataContext);
    const socket = state.socket;
    const { notifications } = useSelector(notificationSelector);
    const { currentUser } = useSelector(authSelector);
    const [notificationList, setNotificationList] = useState([]);
    const [unreadArr, setUnreadArr] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);

    const buttonRef = useRef();
    const notificationRef = useRef();
    const loadMoreRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            dispatch(getNotifications({ userId: currentUser.id, query: { page, limit: NOTIFICATION_LIMIT } }));
        }
    }, [currentUser, dispatch, page]);

    useEffect(() => {
        if (!currentUser) {
            setNotificationList([]);
            setUnreadArr([]);
        }
    }, [currentUser]);

    const onIntersection = (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);

        if (observer && loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [notificationList]);

    useEffect(() => {
        if (notifications) {
            setNotificationList((prev) => [...prev, ...notifications]);
            setHasMore(notifications?.length > 0);
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
            socket.on('notification:send-create', (data) => {
                setNotificationList((prev) => [data, ...prev]);
                toastInfo('Bạn có 1 thông báo mới', 'bottom-right');
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('notification:send-read', (id, read) => {
                if (id === -1) {
                    setUnreadArr([]);
                } else {
                    if (read) {
                        setUnreadArr((prev) => prev.filter((x) => x !== id));
                    } else {
                        setUnreadArr((prev) => [...prev, id]);
                    }
                }
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('notification:send-delete', (id) => {
                setNotificationList((prev) => prev.filter((x) => x?.id !== id));
            });
        }
    }, [socket]);

    useEffect(() => {
        document.addEventListener('click', function handleOutsideClick(e) {
            if (buttonRef.current && notificationRef.current) {
                if (!buttonRef.current.contains(e.target) && !notificationRef.current.contains(e.target)) {
                    setShowNotification(false);
                }
            }
        });
    }, []);

    const handleRead = (id, read) => {
        socket?.emit('notification:read', { userId: currentUser?.id, id, read });
    };

    const handleRemove = (id) => {
        socket?.emit('notification:delete', { userId: currentUser?.id, id });
    };

    const handleButtonClick = () => {
        setShowNotification(!showNotification);
    };

    return (
        <>
            <div className="nav-item dropdown">
                <Tippy content="Thông báo">
                    <Link
                        ref={buttonRef}
                        className="nav-link ms-4 position-relative"
                        role="button"
                        onClick={handleButtonClick}
                    >
                        {currentUser && unreadArr?.length > 0 ? (
                            // <span className="position-absolute translate-middle p-2 bg-danger border border-light rounded-circle notify-bagde">
                            //     <span className="visually-hidden">New alerts</span>
                            // </span>
                            <span className="position-absolute translate-middle badge rounded-pill bg-danger notify-bagde">
                                {unreadArr?.length <= 20 ? unreadArr?.length : '20+'}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        ) : null}
                        <TbBellFilled />
                    </Link>
                </Tippy>
                <div ref={notificationRef} className={'notifications' + (showNotification ? ' show' : '')}>
                    <div className="title">
                        <p>Thông báo</p>
                        {notificationList?.length > 0 && (
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
                                        <button className="dropdown-item" onClick={() => handleRead(-1, true)}>
                                            <GoCheck />
                                            <span>Đánh dấu tất cả là đã đọc</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        {currentUser ? (
                            notificationList?.length > 0 ? (
                                <div className="notify-list">
                                    {/* <p>
                                        <span onClick={() => handleRead(-1, true)}>Đánh dấu tất cả là đã đọc</span>
                                    </p> */}
                                    {notificationList.map((notification, index) => (
                                        <NotificationItem
                                            key={index}
                                            notification={notification}
                                            unreadArr={unreadArr}
                                            onMarkAsRead={() =>
                                                handleRead(
                                                    notification?.id,
                                                    unreadArr?.includes(notification?.id) ? true : false,
                                                )
                                            }
                                            onRemoveNotification={() => handleRemove(notification?.id)}
                                        />
                                    ))}
                                    {hasMore && (
                                        <>
                                            <div ref={loadMoreRef} className="load-more">
                                                <div className="skeleton skeleton-img"></div>
                                                <p className="skeleton skeleton-text"></p>
                                            </div>
                                            <div className="load-more">
                                                <div className="skeleton skeleton-img"></div>
                                                <p className="skeleton skeleton-text"></p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="no-notify">
                                    <TbBellXFilled />
                                    <span>Bạn không có thông báo nào</span>
                                </div>
                            )
                        ) : (
                            <div className="no-notify">
                                <span className="mb-3">Đăng nhập để nhận thông báo về các truyện đang theo dõi</span>
                                <Link to={routes.logIn}>Đăng nhập</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default memo(Notification);

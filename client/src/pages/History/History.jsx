import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import { Sidebar } from '~/layouts/components';
import routes from '~/config/routes';
import CommentNav from '~/components/CommentNav';
import { authSelector, historySelector } from '~/store/selector';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import { useEffect, useState } from 'react';
import { getHistoryComicsByComicIds } from '~/store/historySlice';
import { LIMIT } from '~/util/constants';
import noComics from '~/assets/images/no-comics.jpg';
import moment from 'moment';

function History() {
    const { histories, getHistoryComicsStatus, getHistoryComicsByComicIdsStatus } = useSelector(historySelector);
    const [searchParams] = useSearchParams();
    const { currentUser } = useSelector(authSelector);

    const { pathname } = useLocation();

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Lịch sử', to: pathname },
    ];

    const dispatch = useDispatch();

    const [localHistoryList, setLocalHistoryList] = useState([]);
    const [isByAcount, setIsByAccount] = useState(pathname === routes.historyAccount);
    const [sortLocalHistoryList, setSortLocalHistoryList] = useState([]);

    useEffect(() => {
        document.title = 'Lịch sử đọc truyện | NetComics';
    }, []);

    useEffect(() => {
        if (pathname === routes.historyAccount) {
            setIsByAccount(true);
        } else {
            setIsByAccount(false);
        }
    }, [pathname]);

    useEffect(() => {
        if (!isByAcount) {
            const historyComic = JSON.parse(localStorage.getItem('histories'));
            if (historyComic) {
                setLocalHistoryList(historyComic);
            } else {
                setLocalHistoryList([]);
            }
        }
    }, [histories, isByAcount]);

    useEffect(() => {
        if (!isByAcount && getHistoryComicsByComicIdsStatus === 'success' && histories?.length > 0) {
            const sortHistoryComics = [...localHistoryList].sort((a, b) => moment(b.updatedAt).diff(a.updatedAt));

            const list = sortHistoryComics.map((history) => histories.find((h) => h.id === history.id));
            setSortLocalHistoryList(list);
        }
    }, [getHistoryComicsByComicIdsStatus, histories, isByAcount, localHistoryList]);

    const handleRemoveLocalHistory = (id) => {
        const newHistoryComic = localHistoryList.filter((item) => item.id !== id);
        localStorage.setItem('histories', JSON.stringify(newHistoryComic));
        const arr = newHistoryComic.map((item) => item.id);
        dispatch(
            getHistoryComicsByComicIds({
                page: searchParams.get('page') ? +searchParams.get('page') - 1 : 0,
                limit: LIMIT,
                ids: arr.join(),
            }),
        );
    };

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title>Lịch sử đọc truyện</Title>
                        <CommentNav
                            active={isByAcount}
                            localLink={routes.history}
                            accountLink={routes.historyAccount}
                        />
                        {isByAcount ? (
                            currentUser ? (
                                <ListComicItem
                                    accountHistory
                                    loading={getHistoryComicsStatus === 'pending'}
                                    list={histories}
                                />
                            ) : (
                                <>
                                    <p className="text-center need-login">
                                        Bạn cần đăng nhập để xem lịch sử đọc truyện theo tài khoản
                                    </p>
                                    <div className="text-center">
                                        <Link to={routes.logIn} className="btn need-login-btn">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </>
                            )
                        ) : (
                            <ListComicItem
                                localHistory
                                localHistoryList={localHistoryList}
                                onRemoveLocalHistory={handleRemoveLocalHistory}
                                loading={getHistoryComicsByComicIdsStatus === 'pending'}
                                list={sortLocalHistoryList}
                            />
                        )}
                        {getHistoryComicsStatus !== 'pending' &&
                            getHistoryComicsByComicIdsStatus !== 'pending' &&
                            histories?.length <= 0 && (
                                <div className="no-comics">
                                    <img src={noComics} alt="no-comics" />
                                    <p>Oops! Chưa có truyện nào</p>
                                </div>
                            )}
                    </div>
                </div>
                <Sidebar following />
            </div>
        </>
    );
}

export default History;

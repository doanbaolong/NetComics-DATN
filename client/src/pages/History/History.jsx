import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TbChevronRight } from 'react-icons/tb';
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

function History() {
    const { histories } = useSelector(historySelector);
    const [searchParams] = useSearchParams();
    const { currentUser } = useSelector(authSelector);

    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Lịch sử', to: routes.history },
    ];

    const dispatch = useDispatch();

    const [historyComicList, setHistoryComicList] = useState([]);
    const [isByAcount, setIsByAccount] = useState(false);

    useEffect(() => {
        if (!isByAcount) {
            const historyComic = JSON.parse(localStorage.getItem('histories'));
            if (historyComic) {
                setHistoryComicList(historyComic);
            } else {
                setHistoryComicList([]);
            }
        }
    }, [histories, isByAcount]);

    const handleGetByAcount = (bool) => {
        setIsByAccount(bool);
    };

    const handleRemoveLocalHistory = (id) => {
        const newHistoryComic = historyComicList.filter((item) => item !== id);
        localStorage.setItem('histories', JSON.stringify(newHistoryComic));
        dispatch(
            getHistoryComicsByComicIds({
                page: searchParams.get('page') ? +searchParams.get('page') - 1 : 0,
                limit: LIMIT,
                ids: newHistoryComic.join(),
            }),
        );
    };
    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title rigthIcon={<TbChevronRight />}>Lịch sử đọc truyện</Title>
                        <CommentNav active={isByAcount} onClick={handleGetByAcount} />
                        {isByAcount ? (
                            currentUser ? (
                                <ListComicItem accountHistory list={histories} />
                            ) : (
                                <>
                                    <p className="text-center">
                                        Bạn cần đăng nhập để xem lịch sử đọc truyện theo tài khoản
                                    </p>
                                    <div className="text-center">
                                        <Link to={routes.logIn} className="btn btn-primary">
                                            Đăng nhập
                                        </Link>
                                    </div>
                                </>
                            )
                        ) : (
                            <ListComicItem
                                localHistory
                                onRemoveLocalHistory={handleRemoveLocalHistory}
                                list={histories}
                            />
                        )}
                        {histories?.length <= 0 && (
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

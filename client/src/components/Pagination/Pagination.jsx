import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { authSelector, comicSelector, followSelector, historySelector } from '~/store/selector';
import { useParams, useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import { getComicsByGenreLimit, getComicsLimit, searchComic } from '~/store/comicSlice';
import { ALL, LIMIT } from '~/util/constants';
import { getHistoryComics, getHistoryComicsByComicIds } from '~/store/historySlice';
import { getFollowingComics, getFollowingComicsByComicIds } from '~/store/followSlice';

function Pagination({
    accountHistory = false,
    accountFollow = false,
    localHistory = false,
    localFollow = false,
    comicId,
    chapterId,
    genres,
    advSearch,
    advSearchQuery,
    search,
    searchQuery,
}) {
    const { slug } = useParams();
    const dispatch = useDispatch();
    const [params, setParams] = useSearchParams();

    const { count, comics, searchCount, searchComics, limit, getComicsLimitStatus, searchComicStatus } =
        useSelector(comicSelector);
    const { historyCount, histories, historyLimit, getHistoryComicsStatus, getHistoryComicsByComicIdsStatus } =
        useSelector(historySelector);
    const { followCount, followingComics, followLimit, getFollowingComicsStatus, getFollowingComicsByIdsStatus } =
        useSelector(followSelector);
    const { currentUser } = useSelector(authSelector);
    const [currentPage, setCurrentPage] = useState(params.get('page') || 1);
    const [pageLimit, setPageLimit] = useState([]);
    const [isHidePrev, setIsHidePrev] = useState(false);
    const [isHideNext, setIsHideNext] = useState(false);

    useEffect(() => {
        let totalPages = Math.ceil(count / limit);
        if (accountHistory || localHistory) {
            totalPages = Math.ceil(historyCount / historyLimit);
        }
        if (accountFollow || localFollow) {
            totalPages = Math.ceil(followCount / followLimit);
        }
        if (search) {
            totalPages = Math.ceil(searchCount / limit);
        }
        let start = currentPage - 2 <= 0 ? 1 : currentPage - 2;
        let end = currentPage + 2 >= totalPages ? totalPages : currentPage + 2;
        let arr = [];

        for (let i = start; i <= end; i++) {
            arr.push(i);
        }
        setPageLimit(arr);
        setIsHidePrev(currentPage <= 1);
        setIsHideNext(currentPage >= totalPages);
    }, [
        accountFollow,
        accountHistory,
        count,
        currentPage,
        followCount,
        followLimit,
        historyCount,
        historyLimit,
        limit,
        localFollow,
        localHistory,
        search,
        searchCount,
    ]);

    useEffect(() => {
        if (!params.get('page')) {
            setCurrentPage(1);
        } else {
            if (accountHistory || localHistory) {
                if (params.get('page') > Math.ceil(historyCount / historyLimit)) {
                    setCurrentPage(Math.ceil(historyCount / historyLimit));
                }
            } else if (accountFollow || localFollow) {
                if (params.get('page') > Math.ceil(followCount / followLimit)) {
                    setCurrentPage(Math.ceil(followCount / followLimit));
                }
            } else if (search) {
                if (params.get('page') > Math.ceil(searchCount / limit)) {
                    setCurrentPage(Math.ceil(searchCount / limit));
                }
            } else {
                if (params.get('page') > Math.ceil(count / limit)) {
                    setCurrentPage(Math.ceil(count / limit));
                }
            }
        }
    }, [
        accountFollow,
        accountHistory,
        count,
        followCount,
        followLimit,
        historyCount,
        historyLimit,
        limit,
        localFollow,
        localHistory,
        params,
        search,
        searchCount,
    ]);

    useEffect(() => {
        if ((advSearchQuery && Object.keys(advSearchQuery).length > 0) || searchQuery) {
            setCurrentPage(1);
        }
    }, [advSearchQuery, searchQuery]);

    useEffect(() => {
        if (currentPage > 1) {
            if (advSearch && advSearchQuery) {
                setParams({ ...advSearchQuery, page: currentPage });
            } else if (search && searchQuery) {
                setParams({ keyword: searchQuery, page: currentPage });
            } else {
                setParams({ page: currentPage });
            }
        } else {
            if (advSearch && advSearchQuery) {
                setParams({ ...advSearchQuery });
            } else if (search && searchQuery) {
                setParams({ keyword: searchQuery });
            } else {
                setParams();
            }
        }
    }, [advSearch, advSearchQuery, currentPage, search, searchQuery, setParams]);

    useEffect(() => {
        let offset = currentPage <= 1 ? 0 : currentPage - 1;
        if (genres && slug) {
            if (slug !== ALL) {
                dispatch(getComicsByGenreLimit({ page: offset, limit: LIMIT, genre: slug }));
            } else {
                dispatch(getComicsLimit({ page: offset, limit: LIMIT }));
            }
        } else if (advSearch) {
            dispatch(getComicsLimit({ ...advSearchQuery, page: offset, limit: LIMIT }));
        } else if (search && searchQuery) {
            dispatch(searchComic({ keyword: searchQuery, page: offset, limit: LIMIT }));
        } else if (accountHistory || localHistory) {
            if (accountHistory) {
                dispatch(getHistoryComics({ query: { page: offset, limit: LIMIT }, id: currentUser?.id }));
            }
            if (localHistory) {
                const comicList = JSON.parse(localStorage.getItem('histories')) || [];
                const ids = comicList.map((item) => item.id);
                dispatch(getHistoryComicsByComicIds({ page: offset, limit: LIMIT, ids: ids.join() }));
            }
        } else if (accountFollow || localFollow) {
            if (accountFollow) {
                dispatch(getFollowingComics({ query: { page: offset, limit: LIMIT }, id: currentUser?.id }));
            }
            if (localFollow) {
                const ids = JSON.parse(localStorage.getItem('following-comic')) || [];
                dispatch(getFollowingComicsByComicIds({ page: offset, limit: LIMIT, ids: ids.join() }));
            }
        } else {
            dispatch(getComicsLimit({ page: offset, limit: LIMIT }));
        }
    }, [
        accountFollow,
        accountHistory,
        advSearch,
        advSearchQuery,
        chapterId,
        comicId,
        currentPage,
        currentUser?.id,
        dispatch,
        genres,
        localFollow,
        localHistory,
        search,
        searchQuery,
        slug,
    ]);

    const handleChangePagination = (pageNumber) => {
        setCurrentPage(+pageNumber);
    };

    const handleToNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handleToPrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    const handleClickLastPage = () => {
        if (accountHistory || localHistory) {
            handleChangePagination(Math.ceil(count / histories.length));
        } else if (accountFollow || localFollow) {
            handleChangePagination(Math.ceil(count / followingComics.length));
        } else if (search) {
            handleChangePagination(Math.ceil(count / searchComics.length));
        } else {
            handleChangePagination(Math.ceil(count / comics.length));
        }
    };

    return (
        <div className="pagination-container d-flex justify-content-center mt-4 mb-5">
            {getComicsLimitStatus !== 'pending' &&
                getHistoryComicsStatus !== 'pending' &&
                getHistoryComicsByComicIdsStatus !== 'pending' &&
                getFollowingComicsStatus !== 'pending' &&
                getFollowingComicsByIdsStatus !== 'pending' &&
                searchComicStatus !== 'pending' && (
                    <nav aria-label="Pagination">
                        <ul className="pagination">
                            {!isHidePrev && (
                                <>
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            title="Trang đầu"
                                            onClick={() => handleChangePagination(1)}
                                        >
                                            &laquo;
                                        </button>
                                    </li>
                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            title={`Chuyển sang trang ${currentPage - 1}`}
                                            onClick={handleToPrevPage}
                                        >
                                            &lsaquo;
                                        </button>
                                    </li>
                                </>
                            )}
                            {pageLimit.length > 1 &&
                                pageLimit.map((i) => (
                                    <li key={i} className="page-item">
                                        <button
                                            className={'page-link' + (+i === +currentPage ? ' active' : '')}
                                            onClick={() => handleChangePagination(i)}
                                            title={`Trang ${i}`}
                                        >
                                            {i}
                                        </button>
                                    </li>
                                ))}

                            {!isHideNext && (
                                <>
                                    <li className="page-item" onClick={handleToNextPage}>
                                        <button className="page-link" title={`Chuyển sang trang ${currentPage + 1}`}>
                                            &rsaquo;
                                        </button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" title="Trang cuối" onClick={handleClickLastPage}>
                                            &raquo;
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                )}
        </div>
    );
}

export default Pagination;

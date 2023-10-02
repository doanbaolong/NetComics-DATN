import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FcSearch } from 'react-icons/fc';
import Breadcrumb from '~/components/Breadcrumb';
import Title from '~/components/Title';
import routes from '~/config/routes';
import { comicSelector } from '~/store/selector';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import './SearchResult.scss';
import { useLocation, useSearchParams } from 'react-router-dom';
import noResult from '~/assets/images/no-results.png';

function SearchResult() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Tìm truyện', to: routes.searchResult },
    ];

    const { state } = useLocation();

    const [searchParams] = useSearchParams();

    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

    useEffect(() => {
        document.title = 'Kết quả tìm kiếm | NetComics';
    }, []);

    useEffect(() => {
        if (state?.keyword) {
            setKeyword(state?.keyword);
        }
    }, [state?.keyword]);

    const { searchCount, searchComics, searchComicStatus } = useSelector(comicSelector);

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <Title>Kết quả tìm kiếm</Title>
                        {searchComicStatus !== 'pending' &&
                            (searchCount > 0 ? (
                                <div className="search-result-title">
                                    <FcSearch />
                                    <p>
                                        Tìm thấy <span className="fw-bold">{searchCount}</span> truyện
                                    </p>
                                </div>
                            ) : (
                                <div className="no-result">
                                    <img src={noResult} alt="no-result" />
                                    <p>Không tìm thấy truyện</p>
                                </div>
                            ))}
                        <ListComicItem
                            search
                            searchQuery={keyword}
                            list={searchComics}
                            loading={searchComicStatus === 'pending'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchResult;

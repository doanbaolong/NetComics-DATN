import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CgChevronDoubleDownR, CgChevronDoubleUpR } from 'react-icons/cg';
import { GoCheck } from 'react-icons/go';
import { RiCloseLine } from 'react-icons/ri';

import './Search.scss';
import { comicSelector, genreSelector } from '~/store/selector';
import routes from '~/config/routes';
import Breadcrumb from '~/components/Breadcrumb';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import noResult from '~/assets/images/no-results.png';
import { useSearchParams } from 'react-router-dom';

function Search() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Tìm truyện', to: routes.searchComic },
    ];

    const options = {
        minChapter: [
            { value: 0, label: '> 0 chapter' },
            { value: 50, label: '> 50 chapter' },
            { value: 100, label: '> 100 chapter' },
            { value: 200, label: '> 200 chapter' },
        ],
        status: [
            { value: -1, label: 'Tất cả' },
            { value: 2, label: 'Hoàn thành' },
            { value: 1, label: 'Đang tiến hành' },
        ],
        sort: [
            { value: 0, label: 'Chapter mới' },
            { value: 1, label: 'Truyện mới' },
            { value: 2, label: 'Theo dõi nhiều nhất' },
            { value: 3, label: 'Số chapter nhiều nhất' },
        ],
    };

    const { genres } = useSelector(genreSelector);
    const { comics, count, getComicsLimitStatus } = useSelector(comicSelector);

    const [searchParams] = useSearchParams();

    const [tickedGenres, setTickedGenres] = useState(
        (searchParams.get('genre') &&
            searchParams
                .get('genre')
                ?.split(',')
                .map((i) => Number(i))) ||
            [],
    );
    const [crossedGenres, setCrossedGenres] = useState(
        (searchParams.get('nogenre') &&
            searchParams
                .get('nogenre')
                ?.split(',')
                .map((i) => Number(i))) ||
            [],
    );
    const [isHiddenAdvSearch, setIsHiddenAdvSearch] = useState(false);
    const [minChapter, setMinChapter] = useState(searchParams.get('minChapter') || 0);
    const [status, setStatus] = useState(searchParams.get('status') || -1);
    const [sort, setSort] = useState(searchParams.get('sort') || 0);
    const [query, setQuery] = useState({
        genre: searchParams.get('genre') || '',
        nogenre: searchParams.get('nogenre') || '',
        minchapter: searchParams.get('minchapter') ?? 0,
        status: searchParams.get('status') ?? -1,
        sort: searchParams.get('sort') ?? 0,
    });
    const [advSearchQuery, setAdvSearchQuery] = useState({});

    const handleCheckGenre = (genre) => {
        if (!tickedGenres.includes(genre) && !crossedGenres.includes(genre)) {
            setTickedGenres([...tickedGenres, genre]);
        } else {
            if (tickedGenres.includes(genre)) {
                setTickedGenres(tickedGenres.filter((tickedGenre) => tickedGenre !== genre));
                setCrossedGenres([...crossedGenres, genre]);
            } else {
                setCrossedGenres(crossedGenres.filter((crossedGenre) => crossedGenre !== genre));
            }
        }
    };

    useEffect(() => {
        document.title = 'Tìm kiếm nâng cao | NetComics';
    }, []);

    useEffect(() => {
        if (
            searchParams.get('genre') ||
            searchParams.get('nogenre') ||
            searchParams.get('minchapter') ||
            searchParams.get('status') ||
            searchParams.get('sort')
        ) {
            setAdvSearchQuery(query);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (tickedGenres.length > 0) {
            setQuery((prev) => ({ ...prev, genre: tickedGenres.join() }));
        } else {
            setQuery((prev) => ({ ...prev, genre: '' }));
        }
        if (crossedGenres.length > 0) {
            setQuery((prev) => ({ ...prev, nogenre: crossedGenres.join() }));
        } else {
            setQuery((prev) => ({ ...prev, nogenre: '' }));
        }
        if (minChapter !== 0) {
            setQuery((prev) => ({ ...prev, minchapter: minChapter }));
        } else {
            setQuery((prev) => ({ ...prev, minchapter: 0 }));
        }
        if (status !== -1) {
            setQuery((prev) => ({ ...prev, status: status }));
        } else {
            setQuery((prev) => ({ ...prev, status: -1 }));
        }
        if (sort !== -1) {
            setQuery((prev) => ({ ...prev, sort: sort }));
        } else {
            setQuery((prev) => ({ ...prev, sort: 0 }));
        }
    }, [crossedGenres, minChapter, sort, status, tickedGenres]);

    const handleHiddenAdvSearch = () => {
        setIsHiddenAdvSearch(!isHiddenAdvSearch);
    };

    const handleChangeMinChapter = (selected) => {
        setMinChapter(selected.value);
    };

    const handleChangeStatus = (selected) => {
        setStatus(selected.value);
    };

    const handleChangeSort = (selected) => {
        setSort(selected.value);
    };

    const handleSearch = () => {
        if (query) {
            setAdvSearchQuery(query);
        }
    };

    const handleReset = () => {
        setTickedGenres([]);
        setCrossedGenres([]);
        setMinChapter(0);
        setStatus(-1);
        setSort(0);
        setQuery({ genre: '', nogenre: '', minchapter: 0, status: -1, sort: -1 });
        setAdvSearchQuery({});
    };

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <h1 className="text-center search-title">Tìm truyện nâng cao</h1>
                        <div>
                            <div className="text-center my-4">
                                <button className="btn btn-show-search" onClick={handleHiddenAdvSearch}>
                                    <span
                                        className="d-flex align-items-center justify-content-center"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#advSearchBox"
                                        aria-expanded="true"
                                        aria-controls="advSearchBox"
                                    >
                                        {isHiddenAdvSearch ? (
                                            <>
                                                Hiện khung tìm kiếm <CgChevronDoubleDownR />
                                            </>
                                        ) : (
                                            <>
                                                Ẩn khung tìm kiếm <CgChevronDoubleUpR />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </div>
                            <div className="collapse show" id="advSearchBox">
                                <div className="advsearch-box mb-4">
                                    <div className="search-instruction">
                                        <div className="d-flex align-items-start instruction-item tick">
                                            <span className="me-4 d-flex align-items-center justify-content-center check tick">
                                                <GoCheck />
                                            </span>
                                            <span>Tìm trong những thể loại này</span>
                                        </div>
                                        <div className="d-flex align-items-start instruction-item cross">
                                            <span className="me-4 d-flex align-items-center justify-content-center check cross">
                                                <RiCloseLine />
                                            </span>
                                            <span>
                                                Loại trừ những thể loại này <small>(Nhấn 2 lần)</small>
                                            </span>
                                        </div>
                                        <div className="d-flex align-items-start instruction-item">
                                            <span className="me-4 d-flex align-items-center justify-content-center check none"></span>
                                            <span>Truyện có thể thuộc hoặc không thuộc thể loại này</span>
                                        </div>
                                    </div>
                                    <div className="row filter-row">
                                        <div className="col-sm-2 fw-bold px-4 mb-3">Thể loại</div>
                                        <div className="col-10">
                                            <div className="row">
                                                {genres.map((genre) => (
                                                    <div
                                                        key={genre.slug}
                                                        className="col-md-3 col-sm-4 col-6 mb-3 genre-col"
                                                    >
                                                        <div
                                                            className={
                                                                'genre-item' +
                                                                (tickedGenres.includes(genre.id)
                                                                    ? ' tick'
                                                                    : crossedGenres.includes(genre.id)
                                                                    ? ' cross'
                                                                    : '')
                                                            }
                                                            title={genre.description}
                                                            onClick={() => handleCheckGenre(genre.id)}
                                                        >
                                                            <span>{genre.name}</span>
                                                            <span className="genre-check-box">
                                                                {tickedGenres.includes(genre.id) ? (
                                                                    <GoCheck />
                                                                ) : crossedGenres.includes(genre.id) ? (
                                                                    <RiCloseLine />
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3 filter-row">
                                        <div className="col-sm-2 fw-bold px-4 mb-3">Số lượng chapter</div>
                                        <div className="col-sm-4 px-4 mb-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.minChapter}
                                                defaultValue={options.minChapter[0]}
                                                value={options.minChapter.find((option) => option.value === minChapter)}
                                                onChange={handleChangeMinChapter}
                                                isSearchable={false}
                                            />
                                        </div>
                                        <div className="col-sm-2 fw-bold px-4 mb-3">Trạng thái</div>
                                        <div className="col-sm-4 px-4 mb-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.status}
                                                defaultValue={options.status[0]}
                                                value={options.status.find((option) => option.value === status)}
                                                onChange={handleChangeStatus}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row filter-row">
                                        <div className="col-sm-2 fw-bold px-4 mb-3">Sắp xếp theo</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.sort}
                                                defaultValue={options.sort[0]}
                                                value={options.sort.find((option) => option.value === sort)}
                                                onChange={handleChangeSort}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 offset-sm-2 px-4 pb-4 mt-4">
                                            <button
                                                className="btn btn-success text-white advsearch-btn"
                                                onClick={handleSearch}
                                            >
                                                {getComicsLimitStatus === 'pending' ? (
                                                    <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                ) : (
                                                    'Tìm kiếm'
                                                )}
                                            </button>
                                            <button
                                                className="btn btn-primary text-white ms-3 advsearch-btn"
                                                onClick={handleReset}
                                            >
                                                Reset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {count <= 0 && (
                            <div className="no-result">
                                <img src={noResult} alt="no-result" />
                                <p>Không tìm thấy truyện</p>
                            </div>
                        )}
                        <ListComicItem
                            advSearch
                            advSearchQuery={advSearchQuery}
                            list={comics}
                            loading={getComicsLimitStatus === 'pending'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;

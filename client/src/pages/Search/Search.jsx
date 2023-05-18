import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgChevronDoubleDownR, CgChevronDoubleUpR } from 'react-icons/cg';
import { GoCheck } from 'react-icons/go';
import { RiCloseLine } from 'react-icons/ri';

import './Search.scss';
import { comicSelector, genreSelector } from '~/store/selector';
import routes from '~/config/routes';
import Breadcrumb from '~/components/Breadcrumb';
import ComicItem from '~/components/ComicItem';
import ListComicItem from '~/components/ListComicItem/ListComicItem';
import { getComicsLimit } from '~/store/comicSlice';

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

    const dispatch = useDispatch();

    const { genres } = useSelector(genreSelector);
    const { comics } = useSelector(comicSelector);

    const [tickedGenres, setTickedGenres] = useState([]);
    const [crossedGenres, setCrossedGenres] = useState([]);
    const [isHiddenAdvSearch, setIsHiddenAdvSearch] = useState(false);
    const [minChapter, setMinChapter] = useState(0);
    const [status, setStatus] = useState(-1);
    const [sort, setSort] = useState(0);
    const [query, setQuery] = useState({ genre: '', nogenre: '', minchapter: 0, status: -1, sort: -1 });
    const [advSearchQuery, setAdvSearchQuery] = useState();

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
            // dispatch(getComicsLimit(query));
        }
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
                                            <span>Loại trừ những thể loại này</span>
                                        </div>
                                        <div className="d-flex align-items-start instruction-item">
                                            <span className="me-4 d-flex align-items-center justify-content-center check none"></span>
                                            <span>Truyện có thể thuộc hoặc không thuộc thể loại này</span>
                                        </div>
                                    </div>
                                    <div className="row filter-row">
                                        <div className="col-sm-2 fw-bold px-4">Thể loại</div>
                                        <div className="col-10">
                                            <div className="row">
                                                {genres.map((genre) => (
                                                    <div
                                                        key={genre.slug}
                                                        className="col-md-3 col-sm-4 col-xs-6 mb-3 genre-col"
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
                                        <div className="col-sm-2 fw-bold px-4">Số lượng chapter</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.minChapter}
                                                defaultValue={options.minChapter[0]}
                                                onChange={handleChangeMinChapter}
                                                isSearchable={false}
                                            />
                                        </div>
                                        <div className="col-sm-2 fw-bold px-4">Trạng thái</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.status}
                                                defaultValue={options.status[0]}
                                                onChange={handleChangeStatus}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4 filter-row">
                                        <div className="col-sm-2 fw-bold px-4">Sắp xếp theo</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.sort}
                                                defaultValue={options.sort[0]}
                                                onChange={handleChangeSort}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 offset-sm-2 px-4 pb-4 mt-4">
                                            <button className="btn btn-success text-white" onClick={handleSearch}>
                                                Tìm kiếm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ListComicItem advSearch advSearchQuery={advSearchQuery} list={comics} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;

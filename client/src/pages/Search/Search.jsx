import Select from 'react-select';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CgChevronDoubleDownR, CgChevronDoubleUpR } from 'react-icons/cg';
import { GoCheck } from 'react-icons/go';
import { RiCloseLine } from 'react-icons/ri';

import './Search.scss';
import { genreSelector } from '~/store/selector';
import routes from '~/config/routes';
import Breadcrumb from '~/components/Breadcrumb';
import ComicItem from '~/components/ComicItem';

function Search() {
    const breadcrumb = [
        { title: 'Trang chủ', to: routes.home },
        { title: 'Tìm truyện', to: routes.searchComic },
    ];

    const options = {
        chapterCount: [
            { value: 0, label: '> 0 chapter' },
            { value: 50, label: '> 50 chapter' },
            { value: 100, label: '> 100 chapter' },
            { value: 200, label: '> 200 chapter' },
        ],
        status: [
            { value: 'all', label: 'Tất cả' },
            { value: 'Hoàn thành', label: 'Hoàn thành' },
            { value: 'Đang tiến hành', label: 'Đang tiến hành' },
        ],
        sort: [
            { value: 'new chapters', label: 'Chapter mới' },
            { value: 'new comics', label: 'Truyện mới' },
            { value: 'most viewed', label: 'Xem nhiều nhất' },
            { value: 'most viewed month', label: 'Xem nhiều nhất tháng' },
            { value: 'most viewed week', label: 'Xem nhiều nhất tuần' },
            { value: 'most viewed day', label: 'Xem nhiều nhất hôm nay' },
            { value: 'most followed', label: 'Theo dõi nhiều nhất' },
            { value: 'most commented', label: 'Bình luận nhiều nhất' },
            { value: 'most chapter count', label: 'Số chapter nhiều nhất' },
        ],
    };

    const { genres } = useSelector(genreSelector);

    const [tickedGenres, setTickedGenres] = useState([]);
    const [crossedGenres, setCrossedGenres] = useState([]);
    const [isHiddenAdvSearch, setIsHiddenAdvSearch] = useState(false);

    const list = [];
    for (let i = 0; i < 36; i++) {
        list.push(i);
    }

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

    const handleHiddenAdvSearch = () => {
        setIsHiddenAdvSearch(!isHiddenAdvSearch);
    };

    return (
        <>
            <Breadcrumb list={breadcrumb} />
            <div className="main-content">
                <div className="content">
                    <div className="items">
                        <h1 className="text-center">Tìm truyện nâng cao</h1>
                        <div>
                            <div className="text-center my-4">
                                <button className="btn btn-primary btn-show-search" onClick={handleHiddenAdvSearch}>
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
                                    <div className="row">
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
                                                                (tickedGenres.includes(genre.name)
                                                                    ? ' tick'
                                                                    : crossedGenres.includes(genre.name)
                                                                    ? ' cross'
                                                                    : '')
                                                            }
                                                            title={genre.description}
                                                            onClick={() => handleCheckGenre(genre.name)}
                                                        >
                                                            <span>{genre.name}</span>
                                                            <span className="genre-check-box">
                                                                {tickedGenres.includes(genre.name) ? (
                                                                    <GoCheck />
                                                                ) : crossedGenres.includes(genre.name) ? (
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
                                    <div className="row mt-3">
                                        <div className="col-sm-2 fw-bold px-4">Số lượng chapter</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.chapterCount}
                                                defaultValue={options.chapterCount[0]}
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
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-sm-2 fw-bold px-4">Sắp xếp theo</div>
                                        <div className="col-sm-4 px-4">
                                            <Select
                                                className="advsearch-select-container"
                                                classNamePrefix="advsearch-select"
                                                options={options.sort}
                                                defaultValue={options.sort[0]}
                                                isSearchable={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4 offset-sm-2 px-4 pb-4 mt-4">
                                            <button className="btn btn-success text-white">Tìm kiếm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row comic-list">
                            {list.map((i) => (
                                <ComicItem key={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;

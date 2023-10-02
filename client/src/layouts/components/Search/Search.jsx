import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';
import { apiSearchComic } from '~/services/comic';
import { RiLoader4Line } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import './Search.scss';
import SearchComicItem from '~/components/SearchComicItem';
import HeaderButton from '~/components/Button/CircleButton';
import { useDebounce, useWindowSize } from '~/hooks';
import removeAscent from '~/util/removeAscent';
import routes from '~/config/routes';

function Search() {
    const [searchResult, setSearchResult] = useState([1]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const formRef = useRef();
    const inputRef = useRef();

    const navigate = useNavigate();

    const windowSize = useWindowSize();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await apiSearchComic({ keyword: removeAscent(debouncedValue), type: 'less' });

            setSearchResult(result?.data?.response?.rows);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    useEffect(() => {
        if (windowSize.innerWidth > 768) {
            formRef.current.style.display = 'flex';
        } else {
            formRef.current.style.display = 'none';
        }
    }, [windowSize.innerWidth]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(routes.searchResult, {
                state: { keyword: searchValue },
            });
            setSearchValue('');
            setSearchResult([]);
        }
    };

    const handleShowMobileSearch = () => {
        if (windowSize.innerWidth <= 768) {
            if (formRef.current.style.display === 'none') {
                formRef.current.style.display = 'flex';
            } else {
                formRef.current.style.display = 'none';
            }
        }
    };

    return (
        <div className="search-wrapper">
            <div>
                <Tippy
                    interactive
                    visible={showResult && searchResult.length > 0}
                    render={(attrs) => (
                        <div className="search-result" tabIndex="-1" {...attrs}>
                            <div className="search-input-wrapper">
                                <h4 className="search-title">Truyện tranh</h4>
                                {searchResult.map((result, index) => (
                                    <SearchComicItem key={index} data={result} />
                                ))}
                            </div>
                        </div>
                    )}
                    onClickOutside={handleHideResult}
                >
                    <form ref={formRef} onSubmit={handleSearch} className="search-form">
                        <input
                            ref={inputRef}
                            value={searchValue}
                            onChange={handleChange}
                            onFocus={() => setShowResult(true)}
                            placeholder="Tìm truyện..."
                            className="search-input"
                        />
                        {!!searchValue && !loading && (
                            <span className="clear-btn" onClick={handleClear}>
                                <IoIosCloseCircle />
                            </span>
                        )}

                        {loading && (
                            <span className="search-loading">
                                <RiLoader4Line />
                            </span>
                        )}
                        <button className="btn-search">
                            <AiOutlineSearch />
                        </button>
                    </form>
                </Tippy>
            </div>
            <HeaderButton mobile icon={<AiOutlineSearch />} tooltipTitle="Tìm kiếm" onClick={handleShowMobileSearch} />
        </div>
    );
}

export default Search;

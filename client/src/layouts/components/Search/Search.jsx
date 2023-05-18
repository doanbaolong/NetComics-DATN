import { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';
import { apiSearchComic } from '~/services/comic';
import { RiLoader4Line } from 'react-icons/ri';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import './Search.scss';
import SearchComicItem from '~/components/SearchComicItem';
import { useDebounce } from '~/hooks';
import removeAscent from '~/util/removeAscent';
import routes from '~/config/routes';

function Search() {
    const [searchResult, setSearchResult] = useState([1]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    const inputRef = useRef();
    const navigate = useNavigate();

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
        navigate(routes.searchResult, {
            state: { keyword: debouncedValue },
        });
        setSearchValue('');
        setSearchResult([]);
    };

    return (
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
                <form onSubmit={handleSearch} className="search-form">
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
                        <span className="loading">
                            <RiLoader4Line />
                        </span>
                    )}
                    <button className="btn-search">
                        <AiOutlineSearch />
                    </button>
                </form>
            </Tippy>
        </div>
    );
}

export default Search;

import { AiOutlineSearch } from 'react-icons/ai';
import HeaderButton from '~/components/Button/CircleButton';
import './Search.scss';

function Search() {
    return (
        <div className="search-form">
            <input type="search" placeholder="Tìm truyện..." className="search-input" />
            <HeaderButton icon={<AiOutlineSearch />} />
        </div>
    );
}

export default Search;

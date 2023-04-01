import { TbChevronRight } from 'react-icons/tb';
import './Title.scss';
function Title({ children }) {
    return (
        <h2 className="page-title">
            {children} <TbChevronRight />
        </h2>
    );
}

export default Title;

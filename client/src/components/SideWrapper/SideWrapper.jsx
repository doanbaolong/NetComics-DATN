import { Link } from 'react-router-dom';
import './SideWrapper.scss';

function SideWrapper({ noTop = false, title, viewAll = false, children }) {
    return (
        <div className="right-side">
            {!noTop && (
                <div className="side-top d-flex align-items-center justify-content-between">
                    <h2 className="title">{title}</h2>
                    {viewAll && <Link className="view-all">Xem tất cả</Link>}
                </div>
            )}
            {children}
        </div>
    );
}

export default SideWrapper;

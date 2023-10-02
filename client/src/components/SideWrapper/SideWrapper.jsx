import { Link } from 'react-router-dom';
import './SideWrapper.scss';

function SideWrapper({ noTop = false, title, viewAll = false, viewAllUrl, hide = false, children }) {
    return (
        <div className={'right-side' + (hide ? ' hide-mobile' : '')}>
            {!noTop && (
                <div className="side-top d-flex align-items-center justify-content-between">
                    <h2 className="title">{title}</h2>
                    {viewAll && (
                        <Link to={viewAllUrl} className="view-all">
                            Xem tất cả
                        </Link>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}

export default SideWrapper;

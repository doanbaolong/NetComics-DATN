import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumb.scss';

function Breadcrumb({ list }) {
    const { pathname } = useLocation();
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {list.map((item, index) =>
                    pathname === item.to ? (
                        <li key={index} className="breadcrumb-item active" aria-current="page">
                            {item.title}
                        </li>
                    ) : (
                        <li key={index} className="breadcrumb-item">
                            <NavLink to={item.to} className="text-primary">
                                {item.title}
                            </NavLink>
                        </li>
                    ),
                )}
            </ol>
        </nav>
    );
}

export default Breadcrumb;

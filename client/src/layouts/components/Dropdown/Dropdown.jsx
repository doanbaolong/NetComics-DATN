import { Link } from 'react-router-dom';
import './Dropdown.scss';
import routes from '~/config/routes';
import { ALL } from '~/util/constants';

function Dropdown({ name, subMenus, showMobileNavbar }) {
    let subLength = subMenus.length;
    const colNumber = 8;
    return (
        <>
            {showMobileNavbar ? (
                <div className={`navbar-dropdown-show ${name} row`}>
                    {name === 'genres' && (
                        <div className="col-6">
                            <Link to={routes.genres + ALL} className="navbar-dropdown-item-link">
                                Tất cả
                            </Link>
                        </div>
                    )}
                    {subMenus.map((subMenu) => (
                        <div className="col-6" key={subMenu.slug || subMenu.title}>
                            <Link
                                to={
                                    (subMenu.slug && routes.genres + subMenu.slug) ||
                                    (subMenu.to && routes.genres + subMenu.to)
                                }
                                className="navbar-dropdown-item-link"
                            >
                                {subMenu.LeftIcon && <subMenu.LeftIcon />}
                                {subMenu.name || subMenu.title}
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={`navbar-dropdown width-${Math.ceil((subLength + 1) / colNumber)} ${name}`}>
                    {name === 'genres' && (
                        <div className="navbar-dropdown-item">
                            <Link to={routes.genres + ALL} className="navbar-dropdown-item-link">
                                Tất cả
                            </Link>
                        </div>
                    )}
                    {subMenus.map((subMenu) => (
                        <div className="navbar-dropdown-item" key={subMenu.slug || subMenu.title}>
                            <Link
                                to={
                                    (subMenu.slug && routes.genres + subMenu.slug) ||
                                    (subMenu.to && routes.genres + subMenu.to)
                                }
                                className="navbar-dropdown-item-link"
                            >
                                {subMenu.LeftIcon && <subMenu.LeftIcon />}
                                {subMenu.name || subMenu.title}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Dropdown;

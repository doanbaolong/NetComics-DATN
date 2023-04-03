import { Link } from 'react-router-dom';
import './Dropdown.scss';

function Dropdown({ name, subMenus }) {
    let subLength = subMenus.length;
    const colNumber = 8;
    return (
        <div className={`navbar-dropdown width-${Math.ceil((subLength + 1) / colNumber)} ${name}`}>
            {name === 'genres' && (
                <div className="navbar-dropdown-item">
                    <Link to="" className="navbar-dropdown-item-link">
                        Tất cả
                    </Link>
                </div>
            )}
            {subMenus.map((subMenu) => (
                <div className="navbar-dropdown-item" key={subMenu.slug || subMenu.title}>
                    <Link to={subMenu.slug || subMenu.to} className="navbar-dropdown-item-link">
                        {subMenu.LeftIcon && <subMenu.LeftIcon />}
                        {subMenu.name || subMenu.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Dropdown;

import { NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown';
import './NavItems.scss';

function NavItems({ title, name, to, MainIcon, RightIcon, subMenu }) {
    return (
        <li key={name} className="nav-item">
            {subMenu ? (
                <>
                    <NavLink
                        to={to}
                        className={({ isActive, isPending }) => name + ' nav-link ' + (isActive ? 'active' : '')}
                    >
                        {MainIcon ? <MainIcon /> : title}
                        {RightIcon && (
                            <span className="right-icon">
                                <RightIcon />
                            </span>
                        )}
                    </NavLink>
                    <Dropdown name={name} subMenus={subMenu} />
                </>
            ) : (
                <NavLink
                    to={to}
                    className={({ isActive, isPending }) => name + ' nav-link ' + (isActive ? 'active' : '')}
                >
                    {MainIcon ? <MainIcon /> : title}
                    {RightIcon && (
                        <span className="right-icon">
                            <RightIcon />
                        </span>
                    )}
                </NavLink>
            )}
        </li>
    );
}

export default NavItems;

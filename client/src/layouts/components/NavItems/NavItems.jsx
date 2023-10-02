import { Link, NavLink } from 'react-router-dom';
import Dropdown from '../Dropdown';
import './NavItems.scss';

function NavItems({ title, name, to, MainIcon, RightIcon, subMenu, showMobileNavbar }) {
    return (
        <li key={name} className="nav-item">
            {subMenu ? (
                to ? (
                    showMobileNavbar ? (
                        <>
                            <Link
                                className={name + ' nav-link '}
                                data-bs-toggle="collapse"
                                to={'#collapse' + name}
                                role="button"
                                aria-expanded="false"
                                aria-controls={'collapse' + name}
                            >
                                {MainIcon ? <MainIcon /> : title}
                                {RightIcon && (
                                    <span className="right-icon">
                                        <RightIcon />
                                    </span>
                                )}
                            </Link>

                            <div className="collapse" id={'collapse' + name}>
                                <Dropdown name={name} subMenus={subMenu} showMobileNavbar={showMobileNavbar} />
                            </div>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to={to}
                                className={({ isActive, isPending }) =>
                                    name + ' nav-link ' + (isActive ? 'active' : '')
                                }
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
                    )
                ) : showMobileNavbar ? (
                    <>
                        <Link
                            className={name + ' nav-link '}
                            data-bs-toggle="collapse"
                            to={'#collapse' + name}
                            role="button"
                            aria-expanded="false"
                            aria-controls={'collapse' + name}
                        >
                            {MainIcon ? <MainIcon /> : title}
                            {RightIcon && (
                                <span className="right-icon">
                                    <RightIcon />
                                </span>
                            )}
                        </Link>

                        <div className="collapse" id={'collapse' + name}>
                            <Dropdown name={name} subMenus={subMenu} showMobileNavbar={showMobileNavbar} />
                        </div>
                    </>
                ) : (
                    <>
                        <span className={name + ' nav-link '}>
                            {MainIcon ? <MainIcon /> : title}
                            {RightIcon && (
                                <span className="right-icon">
                                    <RightIcon />
                                </span>
                            )}
                        </span>
                        <Dropdown name={name} subMenus={subMenu} />
                    </>
                )
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

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { BsMoonStars } from 'react-icons/bs';
import { useEffect } from 'react';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Search from '../Search';
import HeaderButton from '~/components/Button/CircleButton';
import { authSelector } from '~/store/selector';
import { authSlide } from '~/store/authSlice';
import './Header.scss';
import logo from '~/assets/images/logo-2.png';
import favicon from '~/assets/images/logo-icon-2.png';
import config from '~/config';
import noAvatar from '~/assets/images/no-avatar-5.png';
import Navbar from '../Navbar';
import Notification from '../Notification';

function Header() {
    const dispatch = useDispatch();

    const { isLoggedIn, currentUser } = useSelector(authSelector);

    const [isShowMobileNavbar, setShowMobileNavbar] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('dark-theme') ? 'dark' : 'light');

    useEffect(() => {
        if (isShowMobileNavbar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isShowMobileNavbar]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const handleToggleNavbar = () => {
        setShowMobileNavbar(!isShowMobileNavbar);
    };

    const handleToggleTheme = () => {
        if (theme === 'dark') {
            localStorage.removeItem('dark-theme');
            setTheme('light');
        } else {
            localStorage.setItem('dark-theme', 1);
            setTheme('dark');
        }
    };

    return (
        <>
            <header className="header">
                <nav className="p-0 navbar navbar-expand">
                    <div className="d-flex align-items-center container">
                        <Link to="/" className="d-flex align-items-center me-auto navbar-brand">
                            <img src={favicon} alt="NetComics" className="img-fluid img-logo" />
                            <img src={logo} alt="NetComics" className="img-fluid img-logo" />
                        </Link>

                        <Search />

                        <div className="d-flex align-items-center gap-4 ms-auto navbar-nav">
                            <button className="toggle-nav" onClick={handleToggleNavbar}>
                                <HiMenu />
                            </button>

                            <HeaderButton
                                icon={theme === 'dark' ? <FiSun /> : <BsMoonStars />}
                                tooltipTitle="Đổi theme"
                                onClick={handleToggleTheme}
                            />

                            <Notification />

                            <div className="nav-item dropdown">
                                <Tippy content="Tài khoản">
                                    <Link
                                        className="nav-link dropdown-toggle"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {!isLoggedIn ? (
                                            <FaUser />
                                        ) : (
                                            <img
                                                src={
                                                    currentUser?.avatar
                                                        ? process.env.REACT_APP_SERVER_URL + currentUser.avatar
                                                        : noAvatar
                                                }
                                                alt="avatar"
                                                className="header-avatar"
                                            />
                                        )}
                                    </Link>
                                </Tippy>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {!isLoggedIn ? (
                                        <>
                                            <Link className="dropdown-item" to={config.routes.logIn}>
                                                Đăng nhập
                                            </Link>
                                            <Link className="dropdown-item" to={config.routes.signUp}>
                                                Đăng ký
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link className="dropdown-item" to={config.routes.profile}>
                                                Trang cá nhân
                                            </Link>
                                            <Link
                                                className="dropdown-item"
                                                onClick={() => dispatch(authSlide.actions.logOut())}
                                            >
                                                Đăng xuất
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Navbar showMobileNavbar={isShowMobileNavbar} />
        </>
    );
}

export default Header;

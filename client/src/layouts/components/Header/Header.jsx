import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { TbBellFilled } from 'react-icons/tb';

import Search from '../Search';
import HeaderButton from '~/components/Button/CircleButton';
import { authSelector } from '~/store/selector';
import { authSlide } from '~/store/authSlice';
import './Header.scss';
import logo from '~/assets/images/logo-2.png';
import favicon from '~/assets/images/logo-icon-2.png';
import config from '~/config';

function Header() {
    const { isLoggedIn } = useSelector(authSelector);
    const dispatch = useDispatch();

    return (
        <>
            <header className="header">
                <nav className="p-0 navbar navbar-expand bg-primary">
                    <div className="d-flex align-items-center container">
                        <Link to="/" className="d-flex align-items-center me-auto navbar-brand">
                            <img src={favicon} alt="NetComics" className="img-fluid img-logo" />
                            <img src={logo} alt="NetComics" className="img-fluid img-logo" />
                        </Link>

                        <Search />

                        <div className="d-flex align-items-center gap-5 ms-auto navbar-nav">
                            {/* <button
                                class="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarToggleExternalContent"
                                aria-controls="navbarToggleExternalContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <FaBars />
                            </button> */}

                            <HeaderButton icon={<FiSun />} hover />
                            <HeaderButton icon={<TbBellFilled />} hover />

                            <div className="nav-item dropdown">
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
                                            src="https://luv.vn/wp-content/uploads/2021/10/gai-xinh-12.jpg"
                                            alt="avatar"
                                            className="rounded-circle header-avatar"
                                        />
                                    )}
                                </Link>
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
                                            <Link className="dropdown-item" to="">
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
        </>
    );
}

export default Header;

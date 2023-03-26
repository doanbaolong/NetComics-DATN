import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiSun } from 'react-icons/fi';
import { TbBellFilled } from 'react-icons/tb';

import { authSelector } from '~/store/selector';
import { authSlide } from '~/store/authSlice';
import './Header.scss';
import logo from '~/assets/images/logo-2.png';
import favicon from '~/assets/images/logo-icon-2.png';
import { path } from '~/util/constants';

function Header() {
    const { isLoggedIn } = useSelector(authSelector);
    const dispatch = useDispatch();

    return (
        <nav className="header-branch p-0 navbar navbar-expand navbar-dark bg-primary">
            <div className="d-flex align-items-center container">
                <Link to="/" className="d-flex align-items-center me-auto navbar-brand">
                    <img src={favicon} alt="NetComics" className="img-fluid img-logo" />
                    <img src={logo} alt="NetComics" className="img-fluid img-logo" />
                </Link>

                <div className="search-form">
                    <input type="search" placeholder="Tìm truyện..." className="search-input" />
                    <button className="search-btn">
                        <AiOutlineSearch />
                    </button>
                </div>

                <div className="d-flex align-items-center gap-5 ms-auto navbar-nav">
                    <button>
                        <FiSun />
                    </button>
                    <button>
                        <TbBellFilled />
                    </button>
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
                                    <Link className="dropdown-item" to={path.LOGIN}>
                                        Đăng nhập
                                    </Link>
                                    <Link className="dropdown-item" to={path.SIGNUP}>
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
    );
}

export default Header;

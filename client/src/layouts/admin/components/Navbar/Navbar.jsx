import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '~/store/selector';
import noAvatar from '~/assets/images/no-avatar-2.jpg';
import routes from '~/config/routes';
import { authSlide } from '~/store/authSlice';
import { TbMenu2 } from 'react-icons/tb';

function Navbar({ isOpen, onCloseSidebar }) {
    const dispatch = useDispatch();
    const { currentAdmin } = useSelector(authSelector);

    return (
        <div className="adm-nav">
            <nav className="nav">
                <div className="container-fluid">
                    <ul className="nav-bar d-flex align-items-center justify-content-between">
                        <li className="nav-item nav-title">
                            <button className={'sidebar-toggler' + (isOpen ? ' open' : '')} onClick={onCloseSidebar}>
                                <TbMenu2 />
                            </button>
                            <span>NetComics</span>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {currentAdmin ? (
                                    <img
                                        src={
                                            currentAdmin?.avatar
                                                ? process.env.REACT_APP_SERVER_URL + currentAdmin?.avatar
                                                : noAvatar
                                        }
                                        alt="avatar"
                                        className="adm-avatar"
                                    />
                                ) : (
                                    <FaUser />
                                )}
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item">Tài khoản</Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        to={routes.adminLogin}
                                        onClick={() => {
                                            dispatch(authSlide.actions.logOut());
                                        }}
                                    >
                                        Đăng xuất
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

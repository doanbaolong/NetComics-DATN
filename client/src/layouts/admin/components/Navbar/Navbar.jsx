import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import './Navbar.scss';

function Navbar() {
    return (
        <div className="adm-nav">
            <nav className="nav">
                <div className="container-fluid">
                    <ul className="nav-bar d-flex align-items-center justify-content-between">
                        <li className="nav-item nav-title">
                            <span>Trang chủ</span>
                        </li>
                        <li className="nav-item dropdown">
                            <Link
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <FaUser />
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link className="dropdown-item">Tài khoản</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item">Đăng xuất</Link>
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

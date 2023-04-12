import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logo.png';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row footer-content">
                    <div className="col-sm-6 footer-logo">
                        <Link to="/">
                            <img src={logo} alt="NetComics" />
                        </Link>

                        <div className="row mt-4 footer-link">
                            <div className="col-6">
                                <Link to="">Về NetComics</Link>
                            </div>
                            <div className="col-6">
                                <Link to="">Chính sách bảo mật</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 keywords">
                        <Link to="/">NetComics</Link>
                        <Link to="/">Truyện tranh</Link>
                        <Link to="/">Truyện tranh online</Link>
                        <Link to="/">Đọc truyện tranh</Link>
                        <Link to="/">Truyện tranh hot</Link>
                        <Link to="/">Truyện tranh hay</Link>
                        <Link to="/">Truyện tranh</Link>
                        <Link to="/">Truyện tranh</Link>
                    </div>
                </div>
            </div>
            <div className="copyright text-center py-2">
                <span>&copy; </span>
                {new Date().getFullYear()} Doan Bao Long
            </div>
        </footer>
    );
}

export default Footer;

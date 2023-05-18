import { Link } from 'react-router-dom';
import './NotFound.scss';
import notFound from '~/assets/images/404.jpg';
import routes from '~/config/routes';

function NotFound() {
    return (
        <div className="not-found-wrappper">
            <div className="row m-0">
                <div className="col-md-6 col-12 content">
                    <h1 className="error-title">404</h1>
                    <h2>Oops! Không tìm thấy trang</h2>
                    <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa</p>
                    <Link to={routes.home}>Trở về trang chủ</Link>
                </div>
                <div className="col-md-6 col-12 image-wrapper">
                    <img src={notFound} alt="404-Not found" className="not-found-img" />
                </div>
            </div>
        </div>
    );
}

export default NotFound;

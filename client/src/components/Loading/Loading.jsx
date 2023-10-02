import './Loading.scss';
import logo from '~/assets/images/logo-icon.png';

function Loading({ process }) {
    return !process ? (
        <div className="loading">
            <img src={logo} alt="" />
        </div>
    ) : (
        <div className="processing">
            <div className="processing-item">
                <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <span>Đang xử lí...</span>
            </div>
        </div>
    );
}

export default Loading;

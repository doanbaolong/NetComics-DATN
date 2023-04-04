import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';
import { FaCommentAlt, FaHeart } from 'react-icons/fa';
import './ComicItem.scss';

function ComicItem() {
    return (
        <div className="col-4 col-md-3 comic-item">
            <div className="image">
                <Link to="">
                    <img
                        src="https://st.nettruyenvt.com/data/comics/188/dai-quan-gia-la-ma-hoang.jpg"
                        alt="Truyện tranh Đại Quản Gia Là Ma Hoàng"
                    />
                </Link>
                <div className="interaction">
                    <div className="interaction-item view">
                        <AiFillEye />
                        <span>153M</span>
                    </div>
                    <div className="interaction-item comment">
                        <FaCommentAlt />
                        <span>97K</span>
                    </div>
                    <div className="interaction-item follow">
                        <FaHeart />
                        <span>412K</span>
                    </div>
                </div>
            </div>
            <div className="title">
                <Link>Đại Quản Gia Là Ma Hoàng</Link>
            </div>
            <ul className="chapter-list list-unstyled">
                <li className="chapter-item">
                    <Link>Chapter 379</Link>
                    <i className="time">2 ngày trước</i>
                </li>
                <li className="chapter-item">
                    <Link>Chapter 379</Link>
                    <i className="time">2 ngày trước</i>
                </li>
                <li className="chapter-item">
                    <Link>Chapter 379</Link>
                    <i className="time">2 ngày trước</i>
                </li>
            </ul>
        </div>
    );
}

export default ComicItem;

import { Link } from 'react-router-dom';
import './CommentNav.scss';

function CommentNav({ active, localLink, accountLink }) {
    return (
        <div className="comment-nav">
            <div className="visited-tab">
                <ul className="list-unstyled text-center">
                    <li>
                        <Link to={localLink} className={!active ? 'active' : ''}>
                            Từ thiết bị
                        </Link>
                    </li>
                    <li>
                        <Link to={accountLink} className={active ? 'active' : ''}>
                            Theo tài khoản
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CommentNav;

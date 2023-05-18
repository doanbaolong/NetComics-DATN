import './CommentNav.scss';

function CommentNav({ active, onClick }) {
    return (
        <div className="comment-nav">
            <div className="visited-tab">
                <ul className="list-unstyled text-center">
                    <li className={!active ? 'active' : ''} onClick={() => onClick(false)}>
                        Từ thiết bị
                    </li>
                    <li className={active ? 'active' : ''} onClick={() => onClick(true)}>
                        Theo tài khoản
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default CommentNav;

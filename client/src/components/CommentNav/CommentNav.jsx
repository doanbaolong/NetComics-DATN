import './CommentNav.scss';

function CommentNav() {
    return (
        <div className="comment-nav">
            <div className="visited-tab">
                <ul className="list-unstyled text-center">
                    <li className="active">Từ thiết bị</li>
                    <li>Theo tài khoản</li>
                </ul>
            </div>
        </div>
    );
}

export default CommentNav;

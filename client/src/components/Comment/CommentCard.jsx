import { memo } from 'react';
import noAvatar from '~/assets/images/no-avatar-1.png';

function CommentCard({ all, inChapter, avatar, fullName, content, replyName, children }) {
    return (
        <div className="comment-item">
            <div className="d-flex">
                <div className="avatar-wrapper">
                    <img
                        src={avatar ? process.env.REACT_APP_SERVER_URL + avatar : noAvatar}
                        alt="avatar"
                        className="avatar"
                    />
                </div>
                <div className="info">
                    <div className="content">
                        <p className="name">
                            {fullName}
                            {all && !isNaN(inChapter) && <span className="in-chapter ms-4">Chapter {inChapter}</span>}
                        </p>
                        <p className="comment">
                            {/* {replyName && <span className="reply-name">{replyName}</span>} */}
                            {content}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default memo(CommentCard);

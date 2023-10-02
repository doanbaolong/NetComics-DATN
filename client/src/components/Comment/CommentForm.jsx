import { useRef, useState } from 'react';
import './Comment.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/selector';

function CommentForm({ socket, chapterId, comicId, commentId, setReply, send, inChapterId }) {
    const { currentUser } = useSelector(authSelector);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');

    const contentRef = useRef();

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            setError('Vui lòng nhập nội dung');
            return;
        }
        if (comment.trim().length < 5) {
            setError('Bình luận quá ngắn. Vui lòng nhập trên 5 kí tự');
            return;
        }
        setError('');

        socket.emit('comment:create', {
            userId: currentUser?.id,
            comicId,
            chapterId: chapterId || null,
            content: comment.trim(),
            commentId,
            send,
            inChapterId: inChapterId || null,
        });

        setComment('');
        if (setReply) {
            setReply(false);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                ref={contentRef}
                className="comment-input"
                placeholder="Viết bình luận..."
                value={comment}
                onChange={handleChange}
            ></textarea>
            {error && <span className="error">{error}</span>}
            <button className={'btn btn-primary' + (!currentUser ? ' disabled' : '')}>Gửi</button>
        </form>
    );
}

export default CommentForm;

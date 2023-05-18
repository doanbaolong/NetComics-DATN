import { useSelector } from 'react-redux';
import { authSelector, commentSelector } from '~/store/selector';
import { DataContext } from '~/context/GlobalState';
import { useContext, useEffect, useRef, useState } from 'react';
import './Comment.scss';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import Pagination from '../Pagination/Pagination';

function Comment({ chapterId, comicId }) {
    const commentRef = useRef();

    const { currentUser } = useSelector(authSelector);
    const { comments } = useSelector(commentSelector);
    const [commentList, setCommentList] = useState([]);

    const state = useContext(DataContext);
    const socket = state.socket;

    useEffect(() => {
        if (comments) {
            setCommentList(comments);
        }
    }, [comments]);

    // Realtime
    useEffect(() => {
        if (socket) {
            socket.emit('joinRoom', comicId);
        }
    }, [comicId, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('sendCommentToClient', (msg) => {
                setCommentList([msg, ...commentList]);
            });
        }

        return () => socket?.off('sendCommentToClient');
    }, [commentList, socket]);

    return (
        <div ref={commentRef} className="comment-wrapper">
            <div className="comment-banner">
                <span>Bình luận</span>
            </div>
            {!currentUser && (
                <div className="need-login">
                    <span>Bạn cần đăng nhập để bình luận</span>
                    <Link to={routes.logIn}>Đăng nhập</Link>
                </div>
            )}
            <CommentForm socket={socket} chapterId={chapterId} comicId={comicId} />

            <div className="comment-list">
                {commentList.map((comment) => (
                    <CommentItem
                        key={comment?.id}
                        isChapter
                        chapterId={chapterId}
                        comicId={comicId}
                        id={comment?.id}
                        userId={comment?.User?.id || comment?.userId}
                        avatar={comment?.User?.avatar || comment?.user?.avatar}
                        fullName={comment?.User?.fullName || comment?.user?.fullName}
                        content={comment?.content}
                        parentId={comment?.parentId}
                        createdAt={comment?.createdAt}
                        replies={comment?.Replies}
                        socket={socket}
                    />
                ))}
            </div>

            <Pagination commentChapter chapterId={chapterId} />
        </div>
    );
}

export default Comment;

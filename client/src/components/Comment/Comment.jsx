import { useDispatch, useSelector } from 'react-redux';
import { authSelector, commentSelector } from '~/store/selector';
import { DataContext } from '~/context/GlobalState';
import { memo, useContext, useEffect, useRef, useState } from 'react';
import './Comment.scss';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';
import routes from '~/config/routes';
import { COMMENT_LIMIT } from '~/util/constants';
import { getCommentsByChapter, getCommentsByComic } from '~/store/commentSlice';

function Comment({ chapterId, comicId, all }) {
    const commentRef = useRef();

    const { currentUser } = useSelector(authSelector);
    const { comments, getCommentsByComicStatus, getCommentsByChapterStatus } = useSelector(commentSelector);
    const [commentList, setCommentList] = useState([]);
    const [commentPage, setCommentPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const state = useContext(DataContext);
    const socket = state.socket;

    const dispatch = useDispatch();

    useEffect(() => {
        if (all) {
            dispatch(getCommentsByComic({ query: { page: commentPage, limit: COMMENT_LIMIT }, comicId }));
        } else {
            dispatch(getCommentsByChapter({ query: { page: commentPage, limit: COMMENT_LIMIT }, chapterId }));
        }
    }, [all, chapterId, comicId, commentPage, dispatch]);

    useEffect(() => {
        if (getCommentsByComicStatus === 'success' || getCommentsByChapterStatus === 'success') {
            if (comments) {
                setCommentList((prev) => [...prev, ...comments]);
                setHasMore(comments?.length >= COMMENT_LIMIT);
            }
        }
    }, [comments, getCommentsByChapterStatus, getCommentsByComicStatus]);

    //Real time
    useEffect(() => {
        if (socket) {
            socket.on('comment:send-create', (payload) => {
                setCommentList([payload, ...commentList]);
            });
        }

        return () => socket?.off('comment:send-create');
    }, [commentList, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('reply:send-create', (payload) => {
                const index = commentList.findIndex((cm) => cm.id === payload.commentId);

                if (index !== -1) {
                    const list = [...commentList];
                    const comment = list[index];
                    if (comment?.Replies) {
                        list.splice(index, 1, { ...comment, Replies: [payload, ...comment?.Replies] });
                    } else {
                        list.splice(index, 1, { ...comment, Replies: [payload] });
                    }
                    setCommentList(list);
                }
            });
            return () => socket.off('reply:send-create');
        }
    }, [commentList, socket]);

    useEffect(() => {
        if (socket) {
            socket.on('comment:send-delete', (commentId) => {
                setCommentList((prev) => prev.filter((comment) => comment.id !== commentId));
            });
        }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.on('reply:send-delete', ({ commentId, replyId }) => {
                const index = commentList.findIndex((cm) => cm.id === commentId);

                if (index !== -1) {
                    const list = [...commentList];
                    const comment = list[index];
                    const replyFind = comment?.Replies?.find((rep) => rep.id === replyId);

                    if (replyFind) {
                        const newReplies = comment?.Replies?.filter((rep) => rep.id !== replyId);
                        list.splice(index, 1, { ...comment, Replies: [...newReplies] });
                        setCommentList(list);
                    }
                }
            });
        }
    }, [commentList, socket]);

    const handleCommentMore = () => {
        setCommentPage((prev) => prev + 1);
    };

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
                        all={all}
                        chapterId={chapterId}
                        comicId={comicId}
                        id={comment?.id}
                        inChapter={comment?.Chapter?.chapterNumber || comment?.chapter?.chapterNumber}
                        inChapterId={comment?.Chapter?.id || comment?.chapter?.id}
                        userId={comment?.User?.id || comment?.userId}
                        avatar={comment?.User?.avatar || comment?.user?.avatar}
                        fullName={comment?.User?.fullName || comment?.user?.fullName}
                        content={comment?.content}
                        createdAt={comment?.createdAt}
                        replies={comment?.Replies}
                        socket={socket}
                    />
                ))}
                {hasMore && (
                    <div className="text-center mb-4 more-btn">
                        <button onClick={handleCommentMore}>
                            {getCommentsByComicStatus === 'pending' || getCommentsByChapterStatus === 'pending' ? (
                                <div className="d-flex align-items-center">
                                    <div className="spinner-grow me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <span>Đang tải...</span>
                                </div>
                            ) : (
                                <span>Xem thêm</span>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(Comment);

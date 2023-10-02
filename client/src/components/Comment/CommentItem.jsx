import { memo, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import './Comment.scss';
import { formatChapterDate } from '~/util/formatDate';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import { useSelector } from 'react-redux';
import { authSelector } from '~/store/selector';
import { IoMdClose } from 'react-icons/io';

function CommentItem({
    inChapterId,
    inChapter,
    all,
    id,
    userId,
    avatar,
    fullName,
    content,
    createdAt,
    comicId,
    chapterId,
    replies = [],
    socket,
}) {
    const { currentUser } = useSelector(authSelector);

    const [reply, setReply] = useState(false);

    const handleReply = () => {
        setReply(!reply);
    };

    const handleRemoveComment = (commentId) => {
        if (socket) {
            socket.emit('comment:delete', { comicId, chapterId: all ? inChapterId : chapterId, commentId });
        }
    };

    const handleRemoveReply = (commentId, replyId) => {
        if (socket) {
            socket.emit('reply:delete', { comicId, chapterId: all ? inChapterId : chapterId, commentId, replyId });
        }
    };

    return (
        <>
            <CommentCard all={all} inChapter={inChapter} avatar={avatar} fullName={fullName} content={content}>
                <div className="comment-footer">
                    <span className="reply" onClick={handleReply}>
                        Trả lời
                    </span>

                    <span className="time">{formatChapterDate(createdAt)}</span>

                    {currentUser && currentUser.id === userId && (
                        <>
                            <span
                                className="comment-dropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <HiOutlineDotsHorizontal />
                            </span>
                            <ul className="dropdown-menu">
                                <li>
                                    <button
                                        className="dropdown-item text-center"
                                        data-bs-toggle="modal"
                                        data-bs-target={`#commentModal${id}`}
                                    >
                                        <span>Xóa</span>
                                    </button>
                                </li>
                            </ul>

                            <div
                                className="modal fade"
                                id={`commentModal${id}`}
                                tabIndex="-1"
                                aria-labelledby={`commentModal${id}Label`}
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id={`commentModal${id}Label`}>
                                                NetComics
                                            </h1>
                                            <button
                                                type="button"
                                                className="close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <IoMdClose />
                                            </button>
                                        </div>
                                        <div className="modal-body">Bạn chắc chắn muốn xóa bình luận này?</div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                data-bs-dismiss="modal"
                                                onClick={() => handleRemoveComment(id)}
                                            >
                                                Xóa
                                            </button>
                                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">
                                                Hủy
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                {reply && (
                    <CommentForm
                        socket={socket}
                        commentId={id}
                        comicId={comicId}
                        chapterId={chapterId}
                        setReply={setReply}
                        replierId={userId}
                        send="sendReply"
                        inChapterId={inChapterId}
                    />
                )}
            </CommentCard>
            <div className="reply-comment">
                {replies?.length > 0 &&
                    replies.map((reply) => (
                        <CommentCard
                            key={reply?.id}
                            all={all}
                            inChapterId={reply?.Chapter?.id || reply?.chapter?.id}
                            inChapter={reply?.Chapter?.chapterNumber || reply?.chapter?.chapterNumber}
                            avatar={reply?.User?.avatar || reply?.user?.avatar}
                            fullName={reply?.User?.fullName || reply?.user?.fullName}
                            content={reply?.User?.content || reply?.content}
                            commentId={reply?.id}
                            replyName={fullName}
                        >
                            <div className="comment-footer">
                                <span className="time">{formatChapterDate(reply?.createdAt)}</span>

                                {currentUser &&
                                    (reply?.User?.id
                                        ? reply?.User?.id === currentUser.id
                                        : reply?.user?.id === currentUser.id) && (
                                        <>
                                            <span
                                                className="comment-dropdown"
                                                type="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                <HiOutlineDotsHorizontal />
                                            </span>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button
                                                        className="dropdown-item text-center"
                                                        data-bs-toggle="modal"
                                                        data-bs-target={`#replyModal${id}`}
                                                    >
                                                        <span>Xóa</span>
                                                    </button>
                                                </li>
                                            </ul>
                                            <div
                                                className="modal fade"
                                                id={`replyModal${id}`}
                                                tabIndex="-1"
                                                aria-labelledby={`replyModal${id}Label`}
                                                aria-hidden="true"
                                            >
                                                <div className="modal-dialog modal-dialog-centered">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1
                                                                className="modal-title fs-5"
                                                                id={`replyModal${id}Label`}
                                                            >
                                                                NetComics
                                                            </h1>
                                                            <button
                                                                type="button"
                                                                className="close"
                                                                data-bs-dismiss="modal"
                                                                aria-label="Close"
                                                            >
                                                                <IoMdClose />
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            Bạn chắc chắn muốn xóa bình luận này?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                data-bs-dismiss="modal"
                                                                onClick={() => handleRemoveReply(id, reply?.id)}
                                                            >
                                                                Xóa
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-info"
                                                                data-bs-dismiss="modal"
                                                            >
                                                                Hủy
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </CommentCard>
                    ))}
            </div>
        </>
    );
}

export default memo(CommentItem);

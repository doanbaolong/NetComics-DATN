import { memo, useEffect, useState } from 'react';
import './Comment.scss';
import { formatChapterDate } from '~/util/formatDate';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

function CommentItem({
    inChapter = false,
    id,
    userId,
    avatar,
    fullName,
    content,
    createdAt,
    comicId,
    chapterId,
    replies,
    socket,
}) {
    const [reply, setReply] = useState(false);
    const [commentReplies, setCommentReplies] = useState(replies || []);

    const handleReply = () => {
        setReply(true);
    };

    useEffect(() => {
        if (socket) {
            socket.on('sendReplyCommentToClient', (msg) => {
                const newArr = [...commentReplies];
                newArr.unshift(msg);

                setCommentReplies(newArr);
            });
            return () => socket.off('sendReplyCommentToClient');
        }
    }, [commentReplies, socket]);

    return (
        <>
            <CommentCard inChapter={inChapter} avatar={avatar} fullName={fullName} content={content}>
                <div className="comment-footer">
                    <span className="reply" onClick={handleReply}>
                        Trả lời
                    </span>

                    <span className="time">{formatChapterDate(createdAt)}</span>
                </div>
                {reply && (
                    <CommentForm
                        socket={socket}
                        commentId={id}
                        comicId={comicId}
                        chapterId={chapterId}
                        setReply={setReply}
                        replyId={userId}
                        send="sendReply"
                    />
                )}
            </CommentCard>
            <div className="reply-comment">
                {commentReplies?.length > 0 &&
                    commentReplies.map((reply) => (
                        <CommentCard
                            key={reply?.id}
                            inChapter={inChapter}
                            avatar={reply?.User?.avatar || reply?.user?.avatar}
                            fullName={reply?.User?.fullName || reply?.user?.fullName}
                            content={reply?.User?.content || reply?.content}
                            commentId={reply?.id}
                            replyName={fullName}
                        >
                            <div className="comment-footer">
                                <span className="time">{formatChapterDate(reply?.createdAt)}</span>
                            </div>
                        </CommentCard>
                    ))}
            </div>
        </>
    );
}

export default memo(CommentItem);

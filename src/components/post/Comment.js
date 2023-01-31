import { useState } from 'react';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';

export default function Comment({docId, comments: postComments, commentInput}) {
    const TRIM_COMMENTS_AFTER = 3;

    const [comments, setComments] = useState(postComments);
    const [commentsSlice, setCommentsSlice] = useState(1);

    const showNextComments = () => {
        setCommentsSlice(commentsSlice + 1);
    };

    if (!postComments || postComments.length === 0) {
        return null;
    }

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {postComments.map((item) => (
                    <p key={`${item.comment}-${item.author?.username}`} className="mb-1">
                        <Link to={`/p/${item.author?.username}`}>
                            <span className="mr-1 font-bold">{item.author?.username}: </span>
                        </Link>
                        <span>{item.comment}</span>
                    </p>
                ))}
                {comments.length >= 1 && commentsSlice < comments.length && (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        onClick={showNextComments}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                showNextComments();
                            }
                        }}
                    >
                        View all {postComments.length} comments.
                    </button>
                )}
            </div>
            <AddComment
                docId={docId}
                comments={postComments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    );
}

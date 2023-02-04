import {useState} from 'react';

export default function AddComment({newCommentHandler, commentInputRef}) {
    const [comment, setComment] = useState('');

    const handleSubmitComment = async (event) => {
        event.preventDefault();
        if(comment.length > 1) {
            await newCommentHandler(comment);
            setComment('');
        }
    };

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={event => handleSubmitComment(event)}
            >
                <input
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    ref={commentInputRef}
                    aria-label="Add a comment"
                    autoComplete="off"
                    type="text"
                    name="new-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                />
                <button
                    className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

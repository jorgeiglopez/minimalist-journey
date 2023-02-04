import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './AddComment';
import {appendComment} from "../../services/FirebaseServcie";
import {abbreviateDate} from "../../helpers/HelperFunctions";

export default function Comment({post, activeUser, commentInputRef}) {
    const [allComments, setAllComments] = useState(post?.comments || []);

    if (!post?.comments || post?.comments.length === 0) {
        return null;
    }

    const saveNewComment = async (newComment) => {
        const commentObj = {
            author: {
                firstName: activeUser.firstName,
                lastName: activeUser.lastName,
                username: activeUser.username
            },
            comment: newComment,
            createdOn: new Date().getTime()
        };

        setAllComments([...allComments, commentObj]);
        await appendComment(post.docId, commentObj);
    };

    return (
        <>
            <div className="p-4 pt-1 pb-4">
                {allComments.map((item) => (
                    <p key={`${item.comment}-${item.author?.username}`} className="mb-1">
                        <Link to={`/p/${item.author?.username}`}>
                            <span className="mr-1 font-bold">{item.author?.username}: </span>
                        </Link>
                        <span>{item.comment} - </span>
                        <span className="text-gray-base normal-case text-sm mt-2 mb-4">
                            {abbreviateDate(item?.createdOn)}
                        </span>
                    </p>
                ))}
                {allComments.length >= 3 && (
                    <button
                        className="text-sm text-gray-base mb-1 cursor-pointer focus:outline-none"
                        type="button"
                        // onClick={showNextComments}
                        // onKeyDown={(event) => {
                        //     if (event.key === 'Enter') {
                        //         showNextComments();
                        //     }
                        // }}
                    >
                        View all {allComments.length} comments.
                    </button>
                )}
            </div>
            <AddComment newCommentHandler={saveNewComment} commentInputRef={commentInputRef} />
        </>
    );
}

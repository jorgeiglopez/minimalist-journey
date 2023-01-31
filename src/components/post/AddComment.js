import {useContext, useState} from 'react';
import FirebaseContext from '../../context/FirebaseContext';
import {UserContext} from "../../context/UserContext";
import {COLLEC_POSTS} from "../../constants/FirebaseCollections";

export default function AddComment({docId, comments, setComments, commentInput}) {
    const {firebase, FieldValue} = useContext(FirebaseContext);
    const [activeUser] = useContext(UserContext);
    const [comment, setComment] = useState('');

    const handleSubmitComment = (event) => {
        const displayName = `${activeUser.firstName} ${activeUser.lastName}`;
        event.preventDefault();

        setComments([...comments, {displayName, comment}]);
        setComment('');

        return firebase
            .firestore()
            .collection(COLLEC_POSTS)
            .doc(docId)
            .update({
                comments: FieldValue.arrayUnion({displayName, comment})
            });
    };

    return (
        <div className="border-t border-gray-primary">
            <form
                className="flex justify-between pl-0 pr-5"
                method="POST"
                onSubmit={(event) =>
                    comment.length >= 1 ? handleSubmitComment(event) : event.preventDefault()
                }
            >
                <input
                    aria-label="Add a comment"
                    autoComplete="off"
                    className="text-sm text-gray-base w-full mr-3 py-5 px-4"
                    type="text"
                    name="add-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={({target}) => setComment(target.value)}
                    ref={commentInput}
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

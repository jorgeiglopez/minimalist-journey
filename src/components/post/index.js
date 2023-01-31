import { useRef } from 'react';
import Header from './Header';
import Image from './Image';
import Action from './Action';
import Footer from './Footer';
import Comments from './Comment';

export default function Post({ post }) {
    const commentInput = useRef(null);

    const handleFocus = () => {
        commentInput.current.focus()
    };

    console.log('---------Incoming post: ', post);
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={post.username} author={post.author} />
            <Image src={post.imageUrl} caption={post.caption} />
            <Action
                docId={post.docId}
                totalLikes={post.likes.length}
                likedPhoto={false}
                handleFocus={handleFocus}
            />
            <Footer caption={post.caption} username={post.username} createdOn={post.createdOn}/>
            <Comments docId={post.docId} comments={post.comments} commentInput={commentInput}/>
        </div>
    );
}

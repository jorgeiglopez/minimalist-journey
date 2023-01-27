import { useRef } from 'react';
import Header from './Header';
import Image from './Image';
import Action from './Action';
import Footer from './Footer';
import Comments from './Comment';

export default function Post({ content }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    // components
    // -> header, image, actions (like & comment icons), footer, comments
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Action
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
            <Footer caption={content.caption} username={content.username} />
            <Comments
                docId={content.docId}
                comments={content.comments}
                posted={content.dateCreated}
                commentInput={commentInput}
            />
        </div>
    );
}

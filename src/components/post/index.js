import { useRef } from 'react';
import Header from './Header';
import Image from './Image';
import Action from './Action';
import Caption from './Caption';
import Comments from './Comment';

export default function Post({ post, activeUser }) {
    const commentInputRef = useRef(null);

    const commentInputFocusHandler = () => {
        commentInputRef.current.focus()
    };

    // console.log('---------Incoming post: ', post);
    return (
        <div className="rounded col-span-4 border bg-white border-gray-primary mb-12">
            <Header post={post} />
            <Image post={post} />
            <Action post={post} activeUser={activeUser} handleFocus={commentInputFocusHandler}/>
            <Caption post={post} />
            <Comments post={post} activeUser={activeUser} commentInputRef={commentInputRef}/>
        </div>
    );
}

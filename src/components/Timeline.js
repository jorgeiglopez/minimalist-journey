import Skeleton from "react-loading-skeleton";
import Post from "./post";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import useTimeline from "../hooks/UseTimeline";

const Timeline = () => {
    const [activeUser] = useContext(UserContext);
    const followingPosts = useTimeline(activeUser);

    return (
        <div className="container col-span-2">
            {!activeUser || !followingPosts ?
                <Skeleton count={2} width={640} height={500} className="mb-5"/>
                :
                activeUser?.following?.length === 0 ?
                    <p className="flex justify-center font-bold">Follow others to see photos.</p>
                    :
                    followingPosts && followingPosts.length > 0 ?
                        followingPosts.map(post => <Post key={post.docId} post={post} activeUser={activeUser}/>)
                        :
                        <p className="flex justify-center font-bold">There are no pictures to show...</p>
            }
        </div>
    );
};

export default Timeline;

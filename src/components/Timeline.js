import {useContext} from "react";
import UserContext from "../context/UserContext";
import usePhotos from "../hooks/UsePhotos";
import Skeleton from "react-loading-skeleton";
import Post from "./post";

const Timeline = () => {
    const user = useContext(UserContext);
    // console.log("***** Timeline  user:", user);
    const photos = usePhotos(user.userId);
    // console.log("The user PHOTOS in the timeline:", photos);

    return (
        <div className="container col-span-2">
            {!user || !user.following ?(
                <Skeleton count={2} width={640} height={500} className="mb-5" />
            ) : user.following.length === 0 ?(
                <p className="flex justify-center font-bold">Follow other people to see Photos</p>
            ) : photos? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : null}
        </div>
    );
};

export default Timeline;

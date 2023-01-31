import usePhotos from "../hooks/UsePhotos";
import Skeleton from "react-loading-skeleton";
import Post from "./post";
import {useContext} from "react";
import {UserContext} from "../context/UserContext";

const Timeline = () => {
    const activeUser = useContext(UserContext);
    const photos = usePhotos(activeUser);

    return (
        <div className="container col-span-2">
            {!activeUser || !activeUser?.following ?(
                <Skeleton count={2} width={640} height={500} className="mb-5" />
            ) : activeUser?.following?.length === 0 ?(
                <p className="flex justify-center font-bold">Follow other people to see Photos</p>
            ) : photos && photos.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content} />)
            ) : <p className="flex justify-center font-bold">You need to upload some pictures...</p>}
        </div>
    );
};

export default Timeline;

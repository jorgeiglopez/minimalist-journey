import {useEffect, useState} from "react";
import {getFollowingPosts} from "../services/FirebaseServcie";
import {mapFirestoreResponse} from "../helpers/HelperFunctions";

const useTimeline = user => {
    console.log('user: ', user);
    const [posts, setPosts] = useState();

    useEffect(() => {
        if(!user) return posts;

        const fetchFollowingPosts = async () => {
            const response = await getFollowingPosts(user);
            console.log('fetchFollowingPosts', response);
            if(response && response.docs?.length > 0) {
                const array = mapFirestoreResponse(response, 'docId');
                setPosts(array);
            } else {
                setPosts([]);
            }
        }

        if (!user?.following || user?.following?.length === 0) {
            setPosts([]);
        } else {
            fetchFollowingPosts();
        }

    }, [user]);

    return posts;
};

export default useTimeline;

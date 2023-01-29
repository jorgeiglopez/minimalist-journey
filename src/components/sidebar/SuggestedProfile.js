import {useState} from 'react';
import {Link} from 'react-router-dom';
import {updateFollowedUserFollowers, updateLoggedInUserFollowing,} from '../../services/FirebaseServcie';
import {DEFAULT_AVATAR_IMAGE_PATH} from "../../constants/DevConstants";

export default function SuggestedProfile({user: {username, docId, uid, firstName, lastName, avatarUrl}}) {
    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(docId, uid, false);
        await updateFollowedUserFollowers(docId, uid, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={avatarUrl || DEFAULT_AVATAR_IMAGE_PATH}
                    alt={'Avatar for' + username}
                    onError={(e) => {
                        e.target.src = DEFAULT_AVATAR_IMAGE_PATH;
                    }}
                />
                <div className="col-span-3">
                    <Link to={`/p/${username}`}><p className="font-bold text-sm">{username}</p></Link>
                    <p className="text-xs">{`${firstName} ${lastName}`}</p>
                </div>
            </div>
            <button
                className="text-xs font-bold text-blue-medium"
                type="button"
                onClick={handleFollowUser}
            >
                Follow
            </button>
        </div>
    ) : null;
}

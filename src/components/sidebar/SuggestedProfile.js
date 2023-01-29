import {useState} from 'react';
import {Link} from 'react-router-dom';
import {updateFollowedUserFollowers, updateLoggedInUserFollowing,} from '../../services/FirebaseServcie';

export default function SuggestedProfile({username, uid, docId, avatarUrl}) {
    const [followed, setFollowed] = useState(false);

    console.log(avatarUrl);

    async function handleFollowUser() {
        console.log('-------Calling handleFollowUser----');
        setFollowed(true);
        await updateLoggedInUserFollowing(docId, uid, false);
        await updateFollowedUserFollowers(docId, uid, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={avatarUrl || '/images/avatars/default.png'}
                    alt={'Avatar for' + username}
                    onError={(e) => {
                        e.target.src = `/images/avatars/default.png`;
                    }}
                />
                <Link to={`/p/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
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

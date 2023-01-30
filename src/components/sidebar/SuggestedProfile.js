import {useState} from "react";
import {Link} from 'react-router-dom';
import {updateFollowersByUID, updateFollowingByUID,} from '../../services/FirebaseServcie';
import {DEFAULT_AVATAR_IMAGE_PATH} from "../../constants/DevConstants";

export default function SuggestedProfile({activeUser, profile: {uid, avatarUrl, username, firstName, lastName}, exclude, setExclude}) {

    const [processing, setProcessing] = useState(false);

    async function handleFollowUser() {
        setProcessing(true);
        await updateFollowingByUID(activeUser.uid, uid);
        await updateFollowersByUID(uid, activeUser.uid);
        setExclude([...exclude, uid]);
    }

    return (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={avatarUrl || DEFAULT_AVATAR_IMAGE_PATH}
                    alt={`Avatar for ${username}`}
                />
                <div className="col-span-3">
                    <Link to={`/p/${username}`}>
                        <p className="font-bold text-sm">{username}</p>
                    </Link>
                    <p className="text-xs">{`${firstName} ${lastName}`}</p>
                </div>
            </div>
            <button type="button"
                    className={"text-xs font-bold " + (processing ? "text-grey-medium cursor-not-allowed opacity-40" : "text-blue-medium")}
                    onClick={handleFollowUser}
                    disabled={processing}>
                {processing ? 'Following...' : 'Follow'}
            </button>
        </div>
    );
}

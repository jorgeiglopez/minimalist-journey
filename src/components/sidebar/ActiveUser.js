import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {DEFAULT_AVATAR_IMAGE_PATH} from '../../constants/DevConstants';
import useAuth from "../../hooks/UseAuth";

export default function ActiveUser() {
    const [activeUser] = useAuth();

    return !activeUser ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${activeUser?.username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={activeUser.avatarUrl || DEFAULT_AVATAR_IMAGE_PATH} // TODO: replace with Gravatar
                    alt={`Avatar for: ${activeUser?.username}`}
                    onError={(e) => {
                        e.target.src = DEFAULT_AVATAR_IMAGE_PATH;
                    }}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{activeUser?.username}</p>
                <p className="text-sm">{`${activeUser.firstName} ${activeUser.lastName}`}</p>
            </div>
        </Link>
    );
}

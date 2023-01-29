import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { DEFAULT_IMAGE_PATH } from '../../constants/DevConstants';

export default function LoggedUser({user}) {
    return !user ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${user?.username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={`/images/avatars/${user?.username}.jpg`} // TODO: replace with Gravatar
                    alt=""
                    onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                    }}
                />
            </div>
            <div className="col-span-3">
                <p className="font-bold text-sm">{user?.username}</p>
                <p className="text-sm">{`${user.firstName} ${user.lastName}`}</p>
            </div>
        </Link>
    );
}

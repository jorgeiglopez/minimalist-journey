import { Link } from 'react-router-dom';
import {DEFAULT_AVATAR_IMAGE_PATH} from "../../constants/DevConstants";
import {abbreviateDate} from "../../helpers/HelperFunctions";

export default function Header({post: {username, author, createdOn}}) {
    return (
        <div className="flex border-b border-gray-primary h-4 p-4 py-8">
            <div className="flex items-center">
                <Link to={`/p/${username}`} className="flex items-center">
                    <img
                        className="rounded-full h-8 w-8 flex mr-3"
                        src={author?.avatarUrl || DEFAULT_AVATAR_IMAGE_PATH}
                        alt={`${username} profile picture`}
                    />
                    <p className="font-bold">{username}</p>
                    <span className="text-gray-base normal-case text-sm ml-2 mt-0.5">
                        • {abbreviateDate(createdOn)}...
                    </span>
                </Link>
            </div>
        </div>
    );
}

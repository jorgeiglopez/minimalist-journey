import {formatDistance} from "date-fns";

export default function Footer({ caption, username, createdOn }) {
    return (
        <div className="p-4 pt-2 pb-1">
            <span className="mr-1 font-bold">{username}: </span>
            <span className="italic">{caption}</span>
            <p className="text-gray-base normal-case text-sm mt-2 mb-4">
                {formatDistance(createdOn || new Date(), new Date())} ago...
            </p>
        </div>
    );
}

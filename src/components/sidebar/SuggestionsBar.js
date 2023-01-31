import {useContext, useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './SuggestedProfile';
import useSuggestion from "../../hooks/useSuggestion";
import {UserContext} from "../../context/UserContext";
import {updateFollowersByUID, updateFollowingByUID} from "../../services/FirebaseServcie";

export default function SuggestionsBar() {
    const [activeUser, setActiveUser] = useContext(UserContext);
    const [exclude, setExclude] = useState([]);
    const [suggestions] = useSuggestion(exclude);

    useEffect(() => {
        if (activeUser) {
            console.log("The exclude: ", [activeUser?.uid, ...activeUser?.following]);
            setExclude([activeUser?.uid, ...activeUser?.following])
        }
    }, [JSON.stringify(activeUser)]);

    async function handleFollowUser(profileId) {
        // setProcessing(true);
        setActiveUser({...activeUser, following: [...activeUser.following, profileId]})
        console.log("Wanting to follow: ", profileId);
        await updateFollowingByUID(activeUser.uid, profileId);
        await updateFollowersByUID(profileId, activeUser.uid);
        setExclude([...exclude, profileId]);
    }

    const MappedSuggestions = activeUser && suggestions && suggestions?.length > 0 ?
        suggestions?.map(suggest =>
            <SuggestedProfile
                key={suggest?.uid}
                activeUser={activeUser}
                profile={suggest}
                exclude={exclude}
                setExclude={setExclude}
                handleFollowUser={handleFollowUser}
            />
        ) : null;

    return !suggestions ?
        (
            <Skeleton count={5} height={40} className="mt-5"/>
        ) : (
            <div className="rounded flex flex-col">
                <div className="text-sm flex items-center align-items justify-between mb-2">
                    <p className="font-bold text-gray-base">
                        {activeUser && suggestions && suggestions?.length > 0 ?
                            (
                                'SuggestionsBar for you:'
                            ) : (
                                'There are no suggestions for you.'
                            )}
                    </p>
                </div>
                <div className="mt-4 grid gap-5">
                    {MappedSuggestions}
                </div>
            </div>
        );
}

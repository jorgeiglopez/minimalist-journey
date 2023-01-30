import {useContext, useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import SuggestedProfile from './SuggestedProfile';
import UserContext from "../../context/UserContext";
import useSuggestion from "../../hooks/useSuggestion";

export default function SuggestionsBar() {

    const activeUser = useContext(UserContext);
    const [exclude, setExclude] = useState([]);
    const [suggestions] = useSuggestion(exclude);

    useEffect(() => {
        if (activeUser) {
            setExclude([activeUser.uid, ...activeUser.following])
        }
    }, [JSON.stringify(activeUser)]);

    const MappedSuggestions = activeUser && suggestions && suggestions?.length > 0 ?
        suggestions?.map(suggest =>
            <SuggestedProfile
                key={suggest?.uid}
                activeUser={activeUser}
                profile={suggest}
                exclude={exclude}
                setExclude={setExclude}
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

import {useContext, useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../services/FirebaseServcie';
import SuggestedProfile from './SuggestedProfile';
import UserContext from "../../context/UserContext";

export default function SuggestionsBar() {

    const activeUser = useContext(UserContext);

    const [suggestions, setSuggestions] = useState(null);

    useEffect(() => { // TODO: move to a hook 'useSuggestions'
        async function getInitialSuggestion() {
            return await getSuggestedProfiles(activeUser?.uid, activeUser?.following || []);
        }

        if (activeUser && !suggestions) {
            getInitialSuggestion().then(response => {
                setSuggestions(response)
            });
        }
    }, [JSON.stringify(activeUser)]);

    const SuggestionsTitle =
        <div className="text-sm flex items-center align-items justify-between mb-2">
            <p className="font-bold text-gray-base">
                {activeUser && suggestions && suggestions?.length > 0 ? 'SuggestionsBar for you:' : 'There are no suggestions for you.'}
            </p>
        </div>;

    const MappedProfiles = activeUser && suggestions && suggestions?.length > 0 ?
        suggestions?.map((profile) => <SuggestedProfile key={profile?.docId} activeUser={activeUser} profile={profile}/>) : null;

    return !suggestions ? (
        <Skeleton count={5} height={40} className="mt-5"/>
    ) : <div className="rounded flex flex-col">
        {SuggestionsTitle}
        <div className="mt-4 grid gap-5">
            {MappedProfiles}
        </div>
    </div>;
}

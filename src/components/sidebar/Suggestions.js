import {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import {getSuggestedProfiles} from '../../services/FirebaseServcie';
import SuggestedProfile from './SuggestedProfile';

export default function Suggestions({user}) {
    const [suggestions, setSuggestions] = useState(null);

    useEffect(() => {
        async function getInitialSuggestion() {
            return await getSuggestedProfiles(user?.uid, user?.following || []);
        }

        if (user && !suggestions) {
            getInitialSuggestion().then(response => {
                console.log('---- setting suggestion',response);
                setSuggestions(response)

            });
        }
    }, [JSON.stringify(user)]);

    const MappedProfiles = user && suggestions && suggestions?.length > 0 ?
        suggestions?.map((profile) => (
            <SuggestedProfile
                key={profile?.docId}
                username={profile?.username}
                avatarUrl={profile?.avatarUrl}
                uid={user?.uid}
                docId={user?.docId}
            />)) : null;

    const SuggestionsTitle = <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">
            {user && suggestions && suggestions?.length > 0 ? 'Suggestions for you:' : 'There are no suggestions for you.'}
        </p>
    </div>;

    return !suggestions ? (
        <Skeleton count={5} height={40} className="mt-5"/>
    ) : <div className="rounded flex flex-col">
        {SuggestionsTitle}
        <div className="mt-4 grid gap-5">
            {MappedProfiles}
        </div>
    </div>;
}

import {useEffect, useState} from "react";
import {getSuggestedProfiles} from "../services/FirebaseServcie";

const DEFAULT_NUMBER_OF_SUGGESTED_PROFILES = 15;

const useSuggestion = (exclude) => {

    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function updateSuggestions() {
            const result = await getSuggestedProfiles(exclude, DEFAULT_NUMBER_OF_SUGGESTED_PROFILES);
            setSuggestions(result);

        }
        if(exclude && exclude.length > 0) {
            updateSuggestions();
        }

    }, [exclude]);

    return [suggestions, setSuggestions];
};

export default useSuggestion;

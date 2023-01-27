import {useEffect, useState} from "react";
import {getUsersPhotos} from "../services/FirebaseServcie";


const usePhotos = (user) => {
    const [photos, setPhotos] = useState();

    useEffect(() => {
        const fetchPictures = async () => {
            const response = await getUsersPhotos(user);
            if(response && response.docs?.length > 0) {
                const array = [];
                response.docs.map(doc => {
                    array.push(doc.data());
                })
                setPhotos(array);
            } else {
                setPhotos([]);
            }
        }
        fetchPictures();

    }, [JSON.stringify(user)]);

    return photos;
};

export default usePhotos;

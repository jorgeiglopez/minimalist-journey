import {useContext} from "react";
import FirebaseContext from "../context/FirebaseContext";
import {COLLEC_USERS} from "../constants/FirebaseCollections";

const DEFAULT_PWD = 'password';

const GOT_DUMMY_USERS = [
    {
        "uid": 1,
        "username": "tyrion",
        "firstName": "Tyrion",
        "lastName": "Lannister",
        "dob": "1978-11-01",
        "createdOn": "2022-01-15",
        "email": "tyrion@westeros.com",
        "avatarUrl": "https://media.comicbook.com/2016/04/the-children-tyrion-with-bow-s4-180353.png",
        "following": [],
        "followers": []
    },
    {
        "uid": 2,
        "username": "cersei",
        "firstName": "Cersei",
        "lastName": "Lannister",
        "dob": "1976-11-01",
        "createdOn": "2022-01-15",
        "email": "cersei@westeros.com",
        "avatarUrl": "https://static1.personality-database.com/profile_images/9361cc9d544d49d58aab209ca5b9b791.png",
        "following": [],
        "followers": []
    },
    {
        "uid": 3,
        "username": "jaime",
        "firstName": "Jaime",
        "lastName": "Lannister",
        "dob": "1973-11-01",
        "createdOn": "2022-01-15",
        "email": "jaime@westeros.com",
        "avatarUrl": "https://pbs.twimg.com/profile_images/644230819222028288/BSUEbJ1S_400x400.png",
        "following": [],
        "followers": []
    },
    {
        "uid": 4,
        "username": "sansa",
        "firstName": "Sansa",
        "lastName": "Stark",
        "dob": "1996-11-01",
        "createdOn": "2022-01-15",
        "email": "sansa@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/252/thumb-252477.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 5,
        "username": "robb",
        "firstName": "Robb",
        "lastName": "Stark",
        "dob": "1994-11-01",
        "createdOn": "2022-01-15",
        "email": "robb@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/117/thumb-117532.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 6,
        "username": "joffrey",
        "firstName": "Joffrey",
        "lastName": "Baratheon",
        "dob": "1989-11-01",
        "createdOn": "2022-01-15",
        "email": "joffrey@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/235/thumb-235903.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 7,
        "username": "theon",
        "firstName": "Theon",
        "lastName": "Greyjoy",
        "dob": "1988-11-01",
        "createdOn": "2022-01-15",
        "email": "theon@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/450/thumb-45052.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 8,
        "username": "samwell",
        "firstName": "Samwell",
        "lastName": "Tarly",
        "dob": "1985-11-01",
        "createdOn": "2022-01-15",
        "email": "samwell@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/183/thumb-183453.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 9,
        "username": "arya",
        "firstName": "Arya",
        "lastName": "Stark",
        "dob": "1996-11-11",
        "createdOn": "2011-06-01",
        "email": "arya@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/114/thumb-114547.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 10,
        "username": "raven",
        "firstName": "Bran",
        "lastName": "Stark",
        "dob": "1999-06-09",
        "createdOn": "2011-06-01",
        "email": "bran@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/189/thumb-189650.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 12,
        "username": "jonsnow",
        "firstName": "Jon",
        "lastName": "Snow",
        "dob": "1986-08-07",
        "createdOn": "2021-05-12",
        "email": "jonsnow@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/241/241307.jpg",
        "following": [],
        "followers": []
    },
    {
        "uid": 13,
        "username": "daenerys",
        "firstName": "Daenerys",
        "lastName": "Targaryen",
        "dob": "1986-11-24",
        "createdOn": "2022-01-28",
        "email": "daenerys@westeros.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/236/236674.jpg",
        "following": [],
        "followers": []
    }
]

export function loadBulkUsers(firebase) {

    console.log("START LOADING USERS");
    // const {firebase} = useContext(FirebaseContext);

    const registerCharacter = async character => {
        try {
            const createUserResult = await firebase?.auth().createUserWithEmailAndPassword(character.email, DEFAULT_PWD);
            console.log('createUserResult: ', createUserResult);
            await createUserResult.user.updateProfile({displayName: character.username.toLowerCase()});
            console.log('Updated the displayName');
            await firebase.firestore().collection(COLLEC_USERS).add({
                uid: createUserResult.user.uid, // The UID is coming from the Auth service. It's the link between the 2 entities.
                username: character.username.toLowerCase(),
                firstName: character.firstName,
                lastName: character.lastName,
                dob: character.dob,
                createdOn: character.createdOn,
                email: character.email.toLowerCase(),
                avatarUrl: character.avatarUrl,
                following: [],
                followers: [],
            })
            console.log('Added to collection', createUserResult.user.uid);
            return createUserResult.user.uid;
        } catch (error) {
            console.log("ERROR CREATING CHARACTER: ", character.email, error.message);
        }

    }


    // if (firebase.auth()) {
        console.log('There is firebase!!');
        GOT_DUMMY_USERS.map(async character => {
            await registerCharacter(character).then(resp => console.log("Successfully registered: ", character.email, " - ", resp));
        })
    // }

}

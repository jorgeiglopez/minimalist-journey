import {createUserWithUniqueUsername, savePost} from "../services/FirebaseServcie";
import {randomUnixTimestamp} from "./HelperFunctions";

const DEFAULT_PWD = 'password';

const GOT_DUMMY_USERS = [
    {
        "id": 1,
        "username": "tyrion",
        "firstName": "Tyrion",
        "lastName": "Lannister",
        "dob": "1978-11-01",
        "createdOn": "2022-01-15",
        "email": "tyrion@got.com",
        "avatarUrl": "https://media.comicbook.com/2016/04/the-children-tyrion-with-bow-s4-180353.png",
        "following": [],
        "followers": []
    },
    {
        "id": 2,
        "username": "cersei",
        "firstName": "Cersei",
        "lastName": "Lannister",
        "dob": "1976-11-01",
        "createdOn": "2022-01-15",
        "email": "cersei@got.com",
        "avatarUrl": "https://static1.personality-database.com/profile_images/9361cc9d544d49d58aab209ca5b9b791.png",
        "following": [],
        "followers": []
    },
    {
        "id": 3,
        "username": "jaime",
        "firstName": "Jaime",
        "lastName": "Lannister",
        "dob": "1973-11-01",
        "createdOn": "2022-01-15",
        "email": "jaime@got.com",
        "avatarUrl": "https://pbs.twimg.com/profile_images/644230819222028288/BSUEbJ1S_400x400.png",
        "following": [],
        "followers": []
    },
    {
        "id": 4,
        "username": "sansa",
        "firstName": "Sansa",
        "lastName": "Stark",
        "dob": "1996-11-01",
        "createdOn": "2022-01-15",
        "email": "sansa@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/252/thumb-252477.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 5,
        "username": "robb",
        "firstName": "Robb",
        "lastName": "Stark",
        "dob": "1994-11-01",
        "createdOn": "2022-01-15",
        "email": "robb@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/117/thumb-117532.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 6,
        "username": "joffrey",
        "firstName": "Joffrey",
        "lastName": "Baratheon",
        "dob": "1989-11-01",
        "createdOn": "2022-01-15",
        "email": "joffrey@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/235/thumb-235903.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 7,
        "username": "theon",
        "firstName": "Theon",
        "lastName": "Greyjoy",
        "dob": "1988-11-01",
        "createdOn": "2022-01-15",
        "email": "theon@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/450/thumb-45052.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 8,
        "username": "samwell",
        "firstName": "Samwell",
        "lastName": "Tarly",
        "dob": "1985-11-01",
        "createdOn": "2022-01-15",
        "email": "samwell@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/183/thumb-183453.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 9,
        "username": "arya",
        "firstName": "Arya",
        "lastName": "Stark",
        "dob": "1996-11-11",
        "createdOn": "2011-06-01",
        "email": "arya@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/114/thumb-114547.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 10,
        "username": "raven",
        "firstName": "Bran",
        "lastName": "Stark",
        "dob": "1999-06-09",
        "createdOn": "2011-06-01",
        "email": "raven@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/189/thumb-189650.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 11,
        "username": "jonsnow",
        "firstName": "Jon",
        "lastName": "Snow",
        "dob": "1986-08-07",
        "createdOn": "2021-05-12",
        "email": "jonsnow@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/241/241307.jpg",
        "following": [],
        "followers": []
    },
    {
        "id": 12,
        "username": "daenerys",
        "firstName": "Daenerys",
        "lastName": "Targaryen",
        "dob": "1986-11-24",
        "createdOn": "2022-01-28",
        "email": "daenerys@got.com",
        "avatarUrl": "https://avatarfiles.alphacoders.com/236/236674.jpg",
        "following": [],
        "followers": []
    }
]

export function loadBulkUsers() {
    console.log("START LOADING USERS");
    const registerCharacter = async character => {
        try {
            await createUserWithUniqueUsername({...character, password: DEFAULT_PWD})
        } catch (error) {
            console.log("ERROR CREATING CHARACTER: ", character.email, error.message);
        }

    }

    let waitTime = 0;
    GOT_DUMMY_USERS.map(async character => {
        waitTime += 2000;
        setTimeout(() => {
            console.log("Trying to create: ", character.email);
            registerCharacter(character);
        }, waitTime);
    })

}

export function loadPostFromActiveUser(user) {
    const posts = {
            username: user.username,
            uid: user.uid,
            author: {
                firstName: user.firstName,
                lastName: user.lastName,
                avatarUrl: user.avatarUrl
            },
            imageUrl: 'https://media.vanityfair.com/photos/5631ad02535004464745624c/master/w_2560%2Cc_limit/sansa-stark-season-6.jpg',
            caption: 'Costume party in the Red Kept',
            createdOn: randomUnixTimestamp(2019, 2021),
            likes: [],
            comments: [
                {
                    comment: 'I am proud of you, Sansa. You are becoming a true leader.',
                    createdOn: randomUnixTimestamp(2021, 2022),
                    author: {
                        username: 'arya',
                        firstName: 'Arya',
                        lastName: 'Stark'
                    }
                },
                {
                    comment: 'You are my sister, and I will always support you.',
                    createdOn: randomUnixTimestamp(2021, 2022),
                    author: {
                        username: 'raven',
                        firstName: 'Bran',
                        lastName: 'Stark'
                    }
                }
            ]
        }
    console.log("ADDING TO POSTS: ", posts);
    savePost(posts).then(resp => console.log('The post was added, docId', resp));
}

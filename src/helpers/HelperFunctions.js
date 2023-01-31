export function isEmpty(str) {
    return !str.trim().length;
}

export function validateEmail(email) {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const mapFirestoreResponse = (response, fieldName) => {
    if (!response || !response.docs) {
        return null;
    }
    if (response.docs.length === 0) {
        return [];
    }

    return response.docs.map(doc => ({
        ...doc.data(),
        [fieldName]: doc.id
    }));
}

export function randomUnixTimestamp(startYear, endYear) {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31, 23, 59, 59).getTime();
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

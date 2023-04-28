export const trimString = (obj) => {
    const objTrim = {};
    for (const key in obj) {
        if (typeof obj[key] === 'string') {
            objTrim[key] = obj[key].trim();
        } else {
            objTrim[key] = obj[key];
        }
    }
    return objTrim;
};

export const trimString = (obj) => {
    const objTrim = {};
    for (const key in obj) {
        objTrim[key] = obj[key].trim();
    }
    return objTrim;
};

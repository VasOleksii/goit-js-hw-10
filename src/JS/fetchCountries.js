
const ENDPOINT = 'https://restcountries.com/v3.1/';
const SEARCH_BY = `name/`;
const PARAMS = `?fields=name,capital,population,flags,languages`;

export function fetchCountries(searchedName) {
    return fetch(`${ENDPOINT}${SEARCH_BY}${searchedName}${PARAMS}`).then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
export default class CountryApiService {

    constructor() {
        this.serchQuery = '';
    }

    fetchCountries() {
        
       
        const url = `https://restcountries.com/v3.1/name/${this.serchQuery}?fields=name,capital,population,flags,languages`
        
        return fetch(url)
            .then(r => r.json())
            .then(data => { return data})
    }
    set query(newQuery) {
        this.serchQuery = newQuery;    
    }
}
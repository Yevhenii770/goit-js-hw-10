export default class CountryApiService {

    constructor() {
        this.serchQuery = '';
    }

    fetchCountries() {
        console.log(this.serchQuery)
       
        const url = `https://restcountries.com/v3.1/name/${this.serchQuery}?fields=name.official,capital,population,flags.svg,languages`
        
        fetch(url)
        .then(r => r.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
   
    get query() {
        return this.serchQuery;
    }
    set query(newQuery) {
        this.serchQuery = newQuery;    
    }
}
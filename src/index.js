import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountryApiService from './api/fetchCountries'
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box')
}


const countryApiService = new CountryApiService()



refs.input.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    
    countryApiService.query = e.target.value
    countryApiService.fetchCountries()
}
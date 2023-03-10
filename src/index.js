import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import CountryApiService from './api/fetchCountries'

const debounce = require('lodash.debounce');

import countryTpl from './templates/country-tpl.hbs'
import countryListTpl from './templates/country-list-tpl.hbs'

const DEBOUNCE_DELAY = 300;


const refs = {
  input: document.querySelector('#search-box'),
  ul: document.querySelector('.country-list'), 
  div: document.querySelector('.country-info'),
}

const countryApiService = new CountryApiService();

refs.input.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));


function onSearch(e) {
    clearContainer()

    if (!e.target.value.trim()) {
    return;
  }
      countryApiService.query = e.target.value.trim();
  
      countryApiService.fetchCountries().then(countries => {
      if (countries.length > 10) {Notify.info('⚠️Too many matches found. Please enter a more specific name.');
        return;
      }
      appendMarkup(countries);
    })
    .catch(() => {
      Notify.failure('❌Oops, there is no country with that name');
    });
}


function appendMarkup(countries) {
  
  if (countries.length >= 2) {
      
    for (const country of countries) {
      refs.ul.insertAdjacentHTML('afterbegin', countryListTpl(country));
    }
  }
  
  if (countries.length === 1) {

    for (const country of countries) {

      if (country.name.common === "Russia") {
        Notify.warning('Страна террорист.');
      }
      refs.ul.insertAdjacentHTML('afterbegin', countryListTpl(country));
      refs.div.innerHTML = countryTpl(country);
    }

  }
}

function clearContainer() {
  refs.div.innerHTML = '';
  refs.ul.innerHTML = '';
}
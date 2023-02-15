import '../css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const refs = {
    searchForm: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };

  refs.searchForm.addEventListener('input', debounce(inputNameCountry, DEBOUNCE_DELAY));

  function inputNameCountry(event) {
    const countries = event.target.value.trim();
    if (!countries) {
        updateDocument();
      return;
    }
  
    fetchCountries(countries).then(queryResult).catch(reject);
  };

  function queryResult(arrCountries) {
    if (arrCountries.length > 10) {
      updateDocument();
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (arrCountries.length >= 2 && arrCountries.length <= 10) {
      const markup = renderCountriesList(arrCountries);
      updateDocument('', markup);
    } else {
      const markup = renderCountryCard(arrCountries);
      updateDocument(markup, '');
    }
  }
  
  function renderCountriesList(countries = []) {
    return countries
      .map(country => {
        return `<li>
        <div class="box"><img src="${country.flags.svg}" alt="flag ${country.name.common}" /><h2>${country.name.common}</h2></div>
      </li>`;
      })
      .join('');
  }
  
  function renderCountryCard(countries = []) {
    return countries
      .map(country => {
        return `<div class="box"><img class="flag" src="${country.flags.svg}" alt="flag ${
          country.name.common
        }"></img>
                <h2>${country.name.official}</h2></div>
                <p><span>Capital</span>: ${country.capital}</p>
                <p><span>Population</span>: ${country.population}</p>
                <p><span>Languages</span>: ${Object.values(country.languages).join(', ')}</p>`;
      })
      .join('');
    };

    function updateDocument(countryInfo = '', countryList = '') {
      refs.countryInfo.innerHTML = countryInfo;
      refs.countryList.innerHTML = countryList;
    }

    function reject() {
        updateDocument()
        Notify.failure('Oops, there is no country with that name');
      }
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/style.css';
import {fetchCountries} from './fetchCountries';
import { getRefs } from './getRefs';

const refs = getRefs();

const DEBOUNCE_DELAY = 300;

refs.countryInfo.innerHTML = '';
refs.countryList.innerHTML = '';

Notify.init({
  width: '280px',
  position: 'center-top',
  timeout: 2000,
  plainText: true,
  borderRadius: '10px',
  cssAnimationStyle: 'zoom'
});

refs.searchField.addEventListener('input', debounce(searchFieldInput, DEBOUNCE_DELAY));

function searchFieldInput(e) {
  fetchCountries(e.target.value.trim()).then(data => {
        if (data.length > 10) {
          Notify.info("Too many matches found. Please enter a more specific name.");
          refs.countryList.innerHTML = '';
          refs.countryInfo.innerHTML = '';


      } if (data.length >= 2 && data.length <= 10) {
        createCountriesList(data);
      } if (data.length === 1) {
        createTargetCountry(data);
    };

  }).catch(error => {
    Notify.failure("Oops, there is no country with that name");
    refs.countryList.innerHTML = '';
  });
};

function createCountriesList(e) {
  
  const makeCountryList = e.map(({ flags, name }) => {
    
    return `<li>
      <img src="${flags.svg}" width = 100 alt = "flag of ${name}">
      <p><b>Country: </b>${name}</p>
      </li>`;
  }).join('');
  refs.countryList.innerHTML = makeCountryList;
  refs.countryInfo.innerHTML = '';
};

function createTargetCountry(e) {
  const makeCountryList = e.map(({ flags, name }) => {
    
    return `<li>
      <img src="${flags.svg}" width = 100 alt = "flag of ${name}">
      <p><b>Country: </b>${name}</p>
      </li>`;
  }).join('');
  const makeTargetCounrty = e.map(({ capital, population, languages }) => {
    const langCountry = languages.map(lang => lang.name);

    return `
              <p><b>Population: </b>${population}</p>
              <p><b>Capital: </b>${capital}</p>
              <p><b>languages: </b>${langCountry}</p>
          `;
  }).join('');

  refs.countryInfo.innerHTML = makeTargetCounrty;
  refs.countryList.innerHTML = makeCountryList;
}












        
 












































// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages


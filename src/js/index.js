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
      createTargetCounrty(data);
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

function createTargetCounrty(e) {
  const makeTargetCounrty = e.map(({ flags, name, capital, population, languages }) => {
    const langCountry = languages.map(lang => lang.name);
    return `
          <li>
          <img src="${flags.svg}" width = 100 alt = "flag of ${name}">
            <p><b>Country: </b>${name}</p>
            <p><b>Population: </b>${population}</p>
            <p><b>Capital: </b>${capital}</p>
           <p><b>languages: </b>${langCountry}</p>
          </li>
          `;
  }).join('');
  refs.countryInfo.innerHTML = makeTargetCounrty;
  refs.countryList.innerHTML = '';
}

// function searchFieldInput(e) {
  
//   fetchCountries(e.target.value.trim()).then(data => {
//     if (data.length > 10) {
//           Notify.info("Too many matches found. Please enter a more specific name.")
//         }
//     const markup = data
//       .map(({ flags, name, capital, population, languages }) => {
//         const langCountry = languages.map((lang => lang.name))
        
//         if (data.length > 2 && data.length < 10) {
//           return `
//           <img src="${flags.svg}" width = 100 alt = "flag of ${name}">
//             <p><b>Country: </b>${name}</p>
//           `;

//         } if (data.length === 1) {
//            return `
//           <li>
//           <img src="${flags.svg}" width = 100 alt = "flag of ${name}">
//             <p><b>Country: </b>${name}</p>
//             <p><b>Population: </b>${population}</p>
//             <p><b>Capital: </b>${capital}</p>
//             <p><b>languages: </b>${langCountry}</p>
//           </li>
//           `;

//         } 
       
//       }).join("");
  
//     refs.countryList.innerHTML = markup;
    
//   }).catch(error => {
//     Notify.failure("Oops, there is no country with that name");
//     refs.countryList.innerHTML = '';
//   });

// }











        
 











































// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages


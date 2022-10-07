export function createCountriesList(e) {
  
  const makeCountryList = e.map(({ flags, name }) => {
    
    return `<li class = 'country-list__item'>
      <img src="${flags.svg}" width = 50 alt = "flag of ${name.official}">
      <p class ='country-list__name'>${name.official}</p>
      </li>`;
  }).join('');
  refs.countryList.innerHTML = makeCountryList;
  refs.countryInfo.innerHTML = '';
};
// ===
export function createTargetCountry(e) {
  const makeCountryList = e.map(({ flags, name }) => {
    
    return `<li class = 'country-list__item'>
      <div class='img-wrap'>
      <img src="${flags.svg}" width = 100 alt = "flag of ${name.official}">
      </div>
      <p class ='country-list__name country-list__name--big'>${name.official}</p>
      </li>`;
  }).join('');

  const makeTargetCounrty = e.map(({ capital, population, languages }) => {

    const langCountry = Object.values(languages).join(', ');

    return `
              <p><b>Population: </b><span class ='country-info__item'>${population}</span></p>
              <p><b>Capital: </b><span class ='country-info__item'>${capital}</span></p>
              <p><b>Languages: </b><span class ='country-info__item'>${langCountry}</span></p>
          `;
  }).join('');

  refs.countryInfo.innerHTML = makeTargetCounrty;
  refs.countryList.innerHTML = makeCountryList;
}
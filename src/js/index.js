import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/style.css';
import API from './fetchCountries';
import getRefs from './getRefs';


const refs = getRefs();
const DEBOUNCE_DELAY = 300;


// нстройки Notify
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
  console.log(e.target.value);
  API.fetchCountries(e.target.value).then(data => {
    data.map(d => {
      d.languages.map(lang => {
        console.log(lang.name)
      });
    });
    
  });
}



































// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages


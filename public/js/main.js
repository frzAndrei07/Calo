//Import render functions
import { render } from './render.js';

const app = {
    'view': 'ingredients',
    'date': ''
} 

const menuToggleButton = document.getElementById('menuToggleButton');
const menuSection = document.getElementById('menuSection');
const main = document.querySelector('main');
const body = document.querySelector('body');

menuToggleButton._openMenu = (e) => {
    e.stopPropagation();
    menuSection.style.display = 'block';

    menuToggleButton.classList.remove('fa-bars');
    menuToggleButton.classList.add('fa-arrow-left');
    menuToggleButton.style.color = 'rgb(255, 255, 255)';

    menuToggleButton.removeEventListener('click', menuToggleButton._openMenu);
    menuToggleButton.addEventListener('click', menuToggleButton._closeMenu);

    document._closeMenu = (e) => {
        if (menuSection.contains(e.target)) {
            return;
        }
        closeMenu();
    };

    document.addEventListener('click', document._closeMenu);
};

menuToggleButton._closeMenu = (e) => {
    e.stopPropagation(); 
    closeMenu();
};

function closeMenu() {
    menuSection.style.display = 'none';
    menuToggleButton.classList.remove('fa-arrow-left');
    menuToggleButton.classList.add('fa-bars');
    menuToggleButton.style.color = 'hsl(18, 5%, 43%)';

    menuToggleButton.removeEventListener('click', menuToggleButton._closeMenu);
    menuToggleButton.addEventListener('click', menuToggleButton._openMenu);
    
    document.removeEventListener('click', document._closeMenu);
}

menuToggleButton.addEventListener('click', menuToggleButton._openMenu);

//View selector
const viewList = document.getElementById('viewList');
viewList.addEventListener('click', (e) => {
    const view = e.target.id.replace('ViewBtn', '');
    app.view = view;
    render(app.view, app.date);
})

//Date filter
const dateFilter = document.getElementById('dateFilter');
const dateInput = document.getElementById('dateInput');
// dateInput.readOnly = true;

//Set today´s date
dateInput.value = new Date().toISOString().split('T')[0];
render(app.view, {'date': dateInput.value});

const dateActions = {
    'prevDayBtn': -1,
    'postDayBtn': 1
};

//Date changer daily
dateFilter.addEventListener('click', (e) => {
    const id = e.target.id;
    const daysToAdd = dateActions[id];
    
    if (daysToAdd === undefined) return;

    let currentDate = new Date(dateInput.value);
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    currentDate = currentDate.toISOString().split('T')[0];
    app.date = currentDate;
    dateInput.value = app.date;
    dateInput.dispatchEvent(new Event('change'));
});

//Disable manual date input
dateInput.addEventListener('keydown', (e) => {
    e.preventDefault();
});

//Show date picker on clic
dateInput.addEventListener('click', () => {
    dateInput.showPicker();
});

//Set listener to reload the page on input change
dateInput.addEventListener('change', (e) => {
    render(app.view, {'date': dateInput.value});
});


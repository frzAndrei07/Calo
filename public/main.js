const menuToggleButton = document.getElementById('menuToggleButton');
const menuSection = document.getElementById('menuSection');
const main = document.querySelector('main');
const body = document.querySelector('body');


menuToggleButton._abrirMenu = (e) => {
    e.stopPropagation();
    menuSection.style.display = 'block';

    menuToggleButton.classList.remove('fa-bars');
    menuToggleButton.classList.add('fa-arrow-left');
    menuToggleButton.style.color = 'rgb(255, 255, 255)';

    menuToggleButton.removeEventListener('click', menuToggleButton._abrirMenu);
    menuToggleButton.addEventListener('click', menuToggleButton._cerrarMenu);

    document._closeMenu = (e) => {
        if (menuSection.contains(e.target)) {
            return;
        }
        cerrarMenu();
    };

    document.addEventListener('click', document._closeMenu);
};

menuToggleButton._cerrarMenu = (e) => {
    e.stopPropagation(); 
    cerrarMenu();
};

function cerrarMenu() {
    menuSection.style.display = 'none';
    menuToggleButton.classList.remove('fa-arrow-left');
    menuToggleButton.classList.add('fa-bars');
    menuToggleButton.style.color = 'hsl(18, 5%, 43%)';
    
    menuToggleButton.removeEventListener('click', menuToggleButton._cerrarMenu);
    menuToggleButton.addEventListener('click', menuToggleButton._abrirMenu);
    
    document.removeEventListener('click', document._closeMenu);
}

menuToggleButton.addEventListener('click', menuToggleButton._abrirMenu);
const siSection = document.getElementById('siSection');
const suSection = document.getElementById('suSection');

// Inicializar con clase active
siSection.classList.add('active');

const showsuSection = document.getElementById('showsuSection');
const showsiSection = document.getElementById('showsiSection');

function switchSection(sectionToHide, sectionToShow) {
    sectionToHide.classList.remove('active');
    
    setTimeout(() => {
        sectionToHide.style.display = 'none';
        
        sectionToShow.style.display = 'flex';

        setTimeout(() => {
            sectionToShow.classList.add('active');
        }, 10);
    }, 100);
}

showsuSection.addEventListener('click', (e) => {
    e.preventDefault();
    if (!suSection.classList.contains('active')) {
        switchSection(siSection, suSection);
    }
});

showsiSection.addEventListener('click', (e) => {
    e.preventDefault();
    if (!siSection.classList.contains('active')) {
        switchSection(suSection, siSection);
    }
});
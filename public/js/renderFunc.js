export const activateSection = (section) => {
    [...document.querySelectorAll('.active')].forEach(section => section.classList.remove('active'));
    const newSection = document.getElementById(section).cloneNode(true);
    document.getElementById(section).replaceWith(newSection);
    newSection.classList.add('active');
}
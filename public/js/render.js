//Import utils
import * as f from './renderFunc.js';

//General render function, managing all the rendering
export const render = (view, args) => {
    switch (view) {
        case 'meals':
            renderMeals(args.date);
            break;
        
        case 'dishes':
            renderDishes();
            break;

        case 'ingredients':
            renderIngredients();
            break;

        default: 
            console.error('View not found')
    }
}

const renderMeals = async (date) => {
    console.log('Rendering meals')
    f.activateSection('mealsSection');
}

const renderDishes = async () => {
    console.log('Rendering dishes')
}

const renderIngredients = async () => {
    console.log('Rendering ingredients');

    //Shows ingredients section
    f.activateSection('ingredientsSection');
    
    //Import all the user´s ingredients
    const res = await fetch(`/api/getIngredients`);

    if (res.status != 200) {
        alert('Error getting ingredients');
        return;
    }

    const resData = await res.json();

    //Button to add ingredients
    const addIngredientBtn = document.getElementById('addIngredientBtn');
    addIngredientBtn.addEventListener('click', (e) => {
        console.log('Adding ingredient');
    })
}
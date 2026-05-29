//Import utils
import * as f from './renderFunc.js';
import { renderIngredients } from './views/ingredients.js';

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
            renderIngredients(f);
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
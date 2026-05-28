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
}

const renderDishes = async () => {
    console.log('Rendering dishes')
}

const renderIngredients = async () => {
    console.log('Rendering ingredients')
}
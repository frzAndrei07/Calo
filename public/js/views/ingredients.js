export const renderIngredients = async (f) => {
    console.log('Rendering ingredients');

    //Shows ingredients section
    f.activateSection('ingredientsSection');
    
    //Import all the user´s ingredients
    const res = await fetch(`/api/ingredients`);

    if (res.status != 200) {
        alert('Error getting ingredients');
        return;
    }

    const resData = await res.json();

    const ingrList = document.getElementById('ingrList');
    ingrList.innerHTML = '';

    //Print all the ingredients
    resData.ingredients.forEach(ingr => {
        ingrList.insertAdjacentHTML('beforeend', `
            <div id="ingredientCard">
                <div id="ingredientName">
                    <h3>${ingr.name}</h3> <h4>${ingr.state}</h4>
                </div>
                <div id="ingredientMacros">
                    <h4>Cal: <span>${ingr.calories}</span> P: <span>${ingr.protein}g</span> C: <span>${ingr.carbs}g</span> F: <span>${ingr.fats}g</span></h4>
                </div>  
            </div>
        `);
    });

    //Open modal for adding ingredients
    const addIngrBtn = document.getElementById('addIngrBtn');
    addIngrBtn.addEventListener('click', addIngrModal);

    function addIngrModal() {
        const modal = `
            <div id = 'addIngrModal'>
                <div id = 'addIngrForm'>
                    <label for = 'ingrNameInput'>
                        Name: 
                        <input type = 'text' id = 'ingrNameInput' maxlength = 50>
                    </label>
                    <div>
                        <label for = 'ingrCalsInput'>
                            Cals: 
                            <input type = 'text' id = 'ingrCalsInput' maxlength = 4 inputmode="numeric" value = 0>
                        </label>

                        <label for = 'ingrStateInput'>
                            State:
                            <select id = 'ingrStateInput'>
                                <option value = 'raw'>Raw</option>
                                <option value = 'rooked'>Cooked</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label for = 'ingrProtInput'>
                            Protein: 
                            <input type = 'text' id = 'ingrProtInput' maxlength = 2 inputmode="numeric" value = 0>
                        </label>

                        <label for = 'ingrCarbInput'>
                            Carbs: 
                            <input type = 'text' id = 'ingrCarbInput' maxlength = 2 inputmode="numeric" value = 0>
                        </label>

                        <label for = 'ingrFatsInput'>
                            Fats: 
                            <input type = 'text' id = 'ingrFatsInput' maxlength = 2 inputmode="numeric" value = 0>
                        </label>
                    </div>
                </div>
                <div id='addIngrModalBtns'>
                    <button type = 'button' class = 'btn btnGray' id = 'closeAddIngrModal'>Close</button>
                    <button type = 'button' class = 'btn' id = 'submitAddIngrModal'>Add</button>
                </div>
            </div>
        `;
        
        const overlay = document.getElementById('overlay');
        
        const body = document.querySelector('body');
        
        body.insertAdjacentHTML('beforeend', modal);

        //Delete any non numeric character
        const addIngrForm = document.getElementById('addIngrForm');
        addIngrForm.addEventListener('input', (e) => { 
            if (e.target.id == 'ingrNameInput' || e.target.id == 'ingrStateInput') return;
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        const modalElement = document.getElementById('addIngrModal');

        overlay.style.display = 'block';

        const addIngrModalBtns = document.getElementById('addIngrModalBtns');
        addIngrModalBtns.addEventListener('click', (e) => {
            switch (e.target.id) {
                case 'closeAddIngrModal':
                    closeAddIngrModal();
                break;

                case 'submitAddIngrModal':
                    submitAddIngrModal();
                break
            }
        });
        
        const closeAddIngrModal = () => {
            overlay.style.display = 'none';
            modalElement.remove();
        }

        const submitAddIngrModal = async () => {
            const inputs = addIngrForm.querySelectorAll('input');

            const emptyInputs = [...inputs].filter(input => !input.value.trim());

            if (emptyInputs.length > 0) {
                alert('Fill out all the data');
                return;
            }

            const res = await fetch('/api/ingredients', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: document.getElementById('ingrNameInput').value,
                    state: document.getElementById('ingrStateInput').value,
                    cals: document.getElementById('ingrCalsInput').value,
                    protein: document.getElementById('ingrProtInput').value,
                    carbs: document.getElementById('ingrCarbInput').value,
                    fats: document.getElementById('ingrFatsInput').value
                })
            });
            
            closeAddIngrModal();
            renderIngredients(f);
        }

        overlay.addEventListener('click', closeAddIngrModal);
    }
}
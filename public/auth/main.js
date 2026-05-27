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

//Toggle the password input between text and password
const suEye = document.getElementById('suEye');
suEye.addEventListener('click', () => {
    const suPwdInput = document.getElementById('suPwdInput');
    suEye.textContent = '';
    if (suPwdInput.type == 'text') {
        suPwdInput.type = 'password';
        suEye.innerHTML = `<i class="fa-solid fa-eye" style="color: hsl(18, 5%, 43%);"></i>`;
    } else {
        suPwdInput.type = 'text';
        suEye.innerHTML = `<i class="fa-solid fa-eye-slash" style="color: hsl(18, 5%, 43%);"></i>`; 
    }
})

const siEye = document.getElementById('siEye');
siEye.addEventListener('click', () => {
    const siPwdInput = document.getElementById('siPwdInput');
    siEye.textContent = '';
    if (siPwdInput.type == 'text') {
        siPwdInput.type = 'password';
        siEye.innerHTML = `<i class="fa-solid fa-eye" style="color: hsl(18, 5%, 43%);"></i>`;
    } else {
        siPwdInput.type = 'text';
        siEye.innerHTML = `<i class="fa-solid fa-eye-slash" style="color: hsl(18, 5%, 43%);"></i>`; 
    }
})


const suSubmitBtn = document.getElementById('suSubmitBtn');
suSubmitBtn.addEventListener('click', async () => {
    const suUsernameInput = document.getElementById('suUsernameInput');
    const suPwdInput = document.getElementById('suPwdInput');

    let valid = true;

    if(suUsernameInput.value == '') {
        valid = false;
        setTimeout(() => {
            suUsernameInput.style.outline = '';
        }, 1000);

        suUsernameInput.style.outline = 'solid 1px red';
    }

    if(suPwdInput.value == '') {
        valid = false;
        setTimeout(() => {
            suPwdInput.style.outline = '';
        }, 1000);
        
        suPwdInput.style.outline = 'solid 1px red';
    }

    if (valid) {
        const res = await fetch('/api/auth/su', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({username: suUsernameInput.value, pwd: suPwdInput.value})
        });
    
        // const resData = await res.json();
        if (res.status == 400) {
            alert('Username taken');
            return;
        } else if (res.status == 201) {
            const res = await fetch('/api/auth/si', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({username: suUsernameInput.value, pwd: suPwdInput.value})
            });
            if (res.status == (200)) {
                window.location.href = '/';
            } else {
                alert('Error during sign in')
            }
        } else {
            alert('Server error');
        }
    }
})

const siSubmitBtn = document.getElementById('siSubmitBtn');
siSubmitBtn.addEventListener('click', async () => {
    const siUsernameInput = document.getElementById('siUsernameInput');
    const siPwdInput = document.getElementById('siPwdInput');

    let valid = true;

    if(siUsernameInput.value == '') {
        valid = false;
        setTimeout(() => {
            siUsernameInput.style.outline = '';
        }, 1000);

        siUsernameInput.style.outline = 'solid 1px red';
    }

    if(siPwdInput.value == '') {
        valid = false;
        setTimeout(() => {
            siPwdInput.style.outline = '';
        }, 1000);
        
        siPwdInput.style.outline = 'solid 1px red';
    }

    if (valid) {
        const res = await fetch('/api/auth/si', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({username: siUsernameInput.value, pwd: siPwdInput.value})
        });

        if (res.status == 404) {
            alert('User not found');
        } else if (res.status == 401) {
            alert('Wrong password');
        } else if (res.status == 200) {
            window.location.href = '/';
        } else {
            alert('Server error');
        }
        
    }

})
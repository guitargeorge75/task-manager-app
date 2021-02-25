const loginForm = document.querySelector('form');
const userName = document.querySelector('#email');
const userPassword = document.querySelector('#password');
const loginStatus = document.querySelector('#login-status')


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        email: userName.value,
        password: userPassword.value
    }
    fetch(`/users/login`,{
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                loginStatus.textContent = `Error: ${data.error}`;
            } else {
                sessionStorage.setItem('User', JSON.stringify(data.user));
            }
        })
    })
})
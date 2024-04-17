const userName = document.querySelector('#name');
const password = document.querySelector('#password');
const button = document.querySelector('#button');

button.addEventListener('click', async e => {
    e.preventDefault();

    let response;

    await fetch('http://localhost:3001/api/user/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": userName.value, "password": password.value })
    })
    .then(response => {
        return response.json()
    })
    .then(content => {
        response = content;
    })
    .catch(error => alert(error));

    if(response.auth){
        console.log(response);
        localStorage.setItem('token', response.token);
        window.location.href = 'http://localhost:3001';
    }
});
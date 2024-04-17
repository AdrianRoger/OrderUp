function adminPage(){
    const section = document.createElement('section');
    const buttonContainer = document.createElement('div');

    const h1 = document.createElement('h1');
    h1.textContent = 'ADMIN';

    const button1 = document.createElement('button');
    button1.textContent = 'Botão 1';
    button1.className = 'button';

    button1.addEventListener('click', function() {
        alert('Botão 1 clicado!');
    });

    const button2 = document.createElement('button');
    button2.textContent = 'Botão 2';
    button2.className = 'button';

    button2.addEventListener('click', function() {
        alert('Botão 2 clicado!');
    });

    buttonContainer.appendChild(button1);
    buttonContainer.appendChild(button2);

    section.appendChild(h1);
    section.appendChild(buttonContainer);

    return section;
}

export default adminPage;
const formResult = JSON.parse(localStorage.getItem('form'));

const $dataType = document.querySelectorAll('[data-type]');
const $button   = document.querySelector('.result__button');
const $result   = document.querySelector('.result');

$dataType.forEach(item => {
    item.textContent = formResult[`${item.getAttribute('data-type')}`];
});

$button.addEventListener('click', event =>{
    event.preventDefault();
    $result.classList.add('jump');
    setTimeout(() => {
        window.location.pathname = 'index.html';
    }, 1000);
});


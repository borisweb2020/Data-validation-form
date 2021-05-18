const $form  = document.getElementById('form');
const $date  = document.querySelector('input[type=date]');
const $label = document.querySelector('.form label');
const $inputArray = $form.querySelectorAll('.form__input');
const $button     = $form.querySelector('.form__button');


// to display specified date in the input[date] field
$date.addEventListener('change', ()=>{
    const specifiedDate = $date.value;

    let birthDay = specifiedDate.slice(8);
    let birthMonth = specifiedDate.slice(5, 7);
    let birthYear = specifiedDate.slice(0, 4);


    $label.textContent = `${birthDay}.${birthMonth}.${birthYear}`;
});



// utility functions
function createElement(tag, className, text){
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
}

function chooseObject(value, wrapper){
    const $input = $form.querySelector(`input[name=${value}]`);
    if(wrapper){
        const $formWrapper = $input.closest('.form__wrapper');
        return $formWrapper;
    }
    return $input;
}

function updateWrapper(value){
    const $error = $form.querySelector(`input[name=${value}] + .form__error`);
    if($error){
        $error.remove();
    }
}


// storage objects
const formValidate = {};
const formRequired = [];


// methods to provide the formValidate object
formValidate.checkName = function(){
    updateWrapper('name');

    const pattern = /[^A-я]/g;

    if(this.name.length > 10 && pattern.test(this.name)){
        chooseObject('name', 'wrap').appendChild(createElement('div', 'form__error', 'Много букв и есть недопустимый символ'));
        chooseObject('name').required = true;
    } else if(this.name.length > 10){
        chooseObject('name', 'wrap').appendChild(createElement('div', 'form__error', 'Не бывает имен более 10 букв'));
        chooseObject('name').required = true;
    } else if(pattern.test(this.name)){
        chooseObject('name', 'wrap').appendChild(createElement('div', 'form__error', 'В имени не может быть подобного символа'));
        chooseObject('name').required = true;
    } else if(this.name === ''){
        chooseObject('name', 'wrap').appendChild(createElement('div', 'form__error', 'Поле должно быть заполнено'));
        chooseObject('name').required = true;
    } else {
        chooseObject('name').required = false;
    }
}

formValidate.checkSurname = function(){
    updateWrapper('surname');

    const pattern = /[^A-я]/g;

    if(this.surname.length > 15 && pattern.test(this.surname)){
        chooseObject('surname', 'wrap').appendChild(createElement('div', 'form__error', 'Много букв и есть недопустимый символ'));
        chooseObject('surname').required = true;
    } else if(this.surname.length > 15){
        chooseObject('surname', 'wrap').appendChild(createElement('div', 'form__error', 'Не бывает фамилий более 15 букв'));
        chooseObject('surname').required = true;
    } else if(pattern.test(this.surname)){
        chooseObject('surname', 'wrap').appendChild(createElement('div', 'form__error', 'В фамилии не может быть подобного символа'));
        chooseObject('surname').required = true;
    } else if(this.surname === ''){
        chooseObject('surname', 'wrap').appendChild(createElement('div', 'form__error', 'Поле должно быть заполнено'));
        chooseObject('surname').required = true;
    } else {
        chooseObject('surname').required = false;
    }
}

formValidate.checkEmail = function(){
    updateWrapper('email')

    const pattern = /([^A-Z])+@([^A-Z])+\.[a-z]{2}/g;

    if(!pattern.test(this.email)){
        chooseObject('email', 'wrap').appendChild(createElement('div', 'form__error', 'Некорректный email'));
        chooseObject('email').required = true;
    } else if (this.email === ''){
        chooseObject('email', 'wrap').appendChild(createElement('div', 'form__error', 'Поле должно быть заполнено'));
        chooseObject('email').required = true;
    } else {
        chooseObject('email').required = false;
    }
}

formValidate.checkPassword = function(){
    updateWrapper('password');

    const pattern = /(?=.*[0-9])(?=.*[!@$])(?=.*[a-z])(?=.*[A-Z])/g;

    if(this.password.length < 8){
        chooseObject('password', 'wrap').appendChild(createElement('div', 'form__error', 'Пароль должен содержать более 8 символов'));
        chooseObject('password').required = true;
    } else if(!pattern.test(this.password)){
        chooseObject('password', 'wrap').appendChild(createElement('div', 'form__error', 'Пароль должен содержать a-z A-Z 0-9 !@$'));
        chooseObject('password').required = true;
    } else if(this.password === ''){
        chooseObject('password', 'wrap').appendChild(createElement('div', 'form__error', 'Поле должно быть заполнено'));
        chooseObject('password').required = true;
    } else {
        chooseObject('password').required = false;
    }
}

formValidate.checkConfirmedPassword = function(){
    updateWrapper('confirmedPassword');

    if(this.password !== this.confirmedPassword){
        chooseObject('confirmedPassword', 'wrap').appendChild(createElement('div', 'form__error', 'Неверный пароль'));
        chooseObject('confirmedPassword').required = true;
    } else if(this.confirmedPassword === ''){
        chooseObject('confirmedPassword', 'wrap').appendChild(createElement('div', 'form__error', 'Поле должно быть заполнено'));
        chooseObject('confirmedPassword').required = true;
    } else {
        chooseObject('confirmedPassword').required = false;
    }
}

formValidate.checkAge = function(){
    updateWrapper('date');

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthYear   = this.date.slice(0, 4);

    let diff = currentYear - birthYear;

    if(diff < 18){
        chooseObject('date', 'wrap').insertBefore(createElement('div', 'form__error', 'Не старше 18 лет'), $label);
        chooseObject('date').required = true;
    } else if(this.date === ''){
        chooseObject('date', 'wrap').insertBefore(createElement('div', 'form__error', 'Поле должно быть заполнено'), $label);
        chooseObject('date').required = true;
    } else {
        chooseObject('date').required = false;
    }

}



function checking(item){
    switch(item.name){
        case 'name':
            formValidate.checkName();
            break;
        case 'surname':
            formValidate.checkSurname();
            break;
        case 'email':
            formValidate.checkEmail();
            break;
        case 'password':
            formValidate.checkPassword();
            break;
        case 'confirmedPassword':
            formValidate.checkConfirmedPassword();
            break;
        case 'date':
            formValidate.checkAge();
            break;
    }
}

// running the form validation

function init(){
    localStorage.removeItem('form');

    for(let i = 0; i < $form.length; i++){
        const item = $form[i];

        item.addEventListener('change', ()=>{
            formValidate[item.name] = item.value;
            checking(item);
            formRequired.length = 0;

            $inputArray.forEach(item => {
                if(!item.required){
                    formRequired.push(item);
                }
            });

            if(formRequired.length === $inputArray.length){
                $button.disabled = false;
            } else {
                $button.disabled = true;
            }
        });
    }

    $button.addEventListener('click', event =>{
        event.preventDefault();

        localStorage.setItem('form', JSON.stringify(formValidate));
        $form.classList.add('jump');

        setTimeout(() => {
            window.location.pathname = 'result.html';
        }, 1000);
    });
}

init();





























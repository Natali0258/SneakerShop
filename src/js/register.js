import { changeUser, getUserFromLocalStorage,user } from "./user.js";

const chooseActiveEntry=()=>{
    let userEntryBtn=document.querySelector('.header__right-entry');
    userEntryBtn.classList.add('header__right-entry_active');
}
chooseActiveEntry()

getUserFromLocalStorage()

let formRegister=document.querySelector('.register__form');

formRegister.addEventListener('submit',(e)=>{
    e.preventDefault()

    const userData={
        login: e.target[0].value,
        email: e.target[1].value,
        password: e.target[2].value
    }

    fetch('http://localhost:8080/users', {
        method:'POST',
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    }).then(response=>response.json())
    .then(response=>{
        changeUser({
            ...response.user,
            token: response.accessToken
        })
        alert('Пользователь зарегистрирован');
        location.href='http://127.0.0.1:5500/index.html'
    })
    .catch(()=>alert('Аккаунт не создан'))
})
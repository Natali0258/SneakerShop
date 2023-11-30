import { changeUser, getUserFromLocalStorage } from "./user.js";

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
        alert('Пользователь зарегистрирован')
        changeUser({
            ...response.user,
            token: response.accessToken
        })
    })
    .catch(()=>alert('Аккаунт не создан'))
})